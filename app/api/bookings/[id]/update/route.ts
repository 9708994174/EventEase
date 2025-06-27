import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Booking from "@/models/Booking"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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

    const updateData = await request.json()

    const booking = await Booking.findById(params.id)
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== decoded.userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Update allowed fields
    if (updateData.customerDetails) {
      booking.customerDetails = updateData.customerDetails
    }

    if (updateData.promoDiscount) {
      booking.pricing.discount = updateData.promoDiscount
      booking.pricing.total =
        booking.pricing.subtotal + booking.pricing.taxes + booking.pricing.serviceCharges - updateData.promoDiscount
    }

    if (updateData.paymentMethod) {
      booking.payment.method = updateData.paymentMethod
    }

    // Add timeline entry
    booking.timeline.push({
      action: "Booking updated",
      timestamp: new Date(),
      note: "Customer details and payment information updated",
    })

    await booking.save()

    return NextResponse.json(
      {
        message: "Booking updated successfully",
        booking: {
          id: booking._id,
          status: booking.status,
          pricing: booking.pricing,
          payment: booking.payment,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Update booking error:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}
