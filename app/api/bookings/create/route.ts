import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Booking from "@/models/Booking"
import Venue from "@/models/Venue"

// Define VenueAvailability type if not imported from elsewhere
type VenueAvailability = {
  date: Date;
  isAvailable: boolean;
  // add other fields if necessary
};

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Get user from JWT token
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    let decoded: any

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { venueId, services, eventDetails, pricing } = await request.json()

    // Validation
    if (!services || services.length === 0) {
      return NextResponse.json({ error: "At least one service is required" }, { status: 400 })
    }

    if (!eventDetails || !eventDetails.occasion || !eventDetails.eventDate || !eventDetails.guestCount) {
      return NextResponse.json({ error: "Event details are required" }, { status: 400 })
    }

    // Verify venue exists and is available
    if (venueId) {
      const venue = await Venue.findById(venueId)
      if (!venue || !venue.isActive || !venue.isVerified) {
        return NextResponse.json({ error: "Venue not available" }, { status: 400 })
      }

      // Check capacity
      if (eventDetails.guestCount < venue.capacity.min || eventDetails.guestCount > venue.capacity.max) {
        return NextResponse.json({ error: "Guest count exceeds venue capacity" }, { status: 400 })
      }

      // Check date availability
      const eventDate = new Date(eventDetails.eventDate)
      const availability: VenueAvailability | undefined = venue.availability.find(
        (avail: VenueAvailability) => avail.date.toDateString() === eventDate.toDateString()
      )

      if (!availability || !availability.isAvailable) {
        return NextResponse.json({ error: "Venue not available on selected date" }, { status: 400 })
      }
    }

    // Calculate pricing server-side for security
    let calculatedSubtotal = 0
    const validatedServices = []

    for (const service of services) {
      // Here you would validate each service exists and calculate actual pricing
      // For now, we'll trust the frontend calculation but in production,
      // you should re-fetch service prices from database
      calculatedSubtotal += service.quantity * service.unitPrice
      validatedServices.push(service)
    }

    const taxes = Math.round(calculatedSubtotal * 0.18) // 18% GST
    const serviceCharges = Math.round(calculatedSubtotal * 0.05) // 5% service charge
    const total = calculatedSubtotal + taxes + serviceCharges - (pricing.discount || 0)

    // Create booking
    const booking = new Booking({
      userId: decoded.userId,
      venueId: venueId || null,
      services: validatedServices,
      eventDetails: {
        ...eventDetails,
        eventDate: new Date(eventDetails.eventDate),
      },
      pricing: {
        subtotal: calculatedSubtotal,
        taxes,
        serviceCharges,
        discount: pricing.discount || 0,
        total,
      },
      payment: {
        status: "pending",
        paidAmount: 0,
        dueAmount: total,
      },
      status: "pending_confirmation",
      timeline: [
        {
          action: "Booking created",
          timestamp: new Date(),
          note: "Booking created and pending confirmation",
        },
      ],
    })

    await booking.save()

    // Populate booking with user and venue details
    await booking.populate("userId", "name email phone")
    if (venueId) {
      await booking.populate("venueId", "name location")
    }

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking: {
          id: booking._id,
          bookingId: booking.bookingId,
          status: booking.status,
          eventDetails: booking.eventDetails,
          pricing: booking.pricing,
          payment: booking.payment,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create booking error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
