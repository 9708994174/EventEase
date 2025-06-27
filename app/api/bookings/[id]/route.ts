import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Booking from "@/models/Booking"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

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

    const booking = await Booking.findById(params.id)
      .populate("userId", "name email phone")
      .populate("venueId", "name location images contact")
      .lean()

    if (!booking || Array.isArray(booking)) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Check if user owns this booking or is admin
    if (
      booking.userId &&
      booking.userId._id &&
      booking.userId._id.toString() !== decoded.userId &&
      decoded.userType !== "admin"
    ) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const transformedBooking = {
      id: booking._id,
      bookingId: booking.bookingId,
      status: booking.status,
      eventDetails: booking.eventDetails,
      pricing: booking.pricing,
      payment: booking.payment,
      services: booking.services,
      timeline: booking.timeline,
      user: {
        name: booking.userId.name,
        email: booking.userId.email,
        phone: booking.userId.phone,
      },
      venue: booking.venueId
        ? {
            id: booking.venueId._id,
            name: booking.venueId.name,
            location: booking.venueId.location,
            images: booking.venueId.images,
            contact: booking.venueId.contact,
          }
        : null,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    }

    return NextResponse.json(
      {
        booking: transformedBooking,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get booking error:", error)
    return NextResponse.json({ error: "Failed to fetch booking details" }, { status: 500 })
  }
}
