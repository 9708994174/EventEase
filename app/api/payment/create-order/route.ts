import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Booking from "@/models/Booking"

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

    const { bookingId, amount, paymentMethod } = await request.json()

    // Validate booking exists and belongs to user
    const booking = await Booking.findById(bookingId)
    if (!booking || booking.userId.toString() !== decoded.userId) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Generate order ID for payment gateway
    const orderId = `CC_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // In production, you would integrate with actual payment gateways like:
    // - Razorpay: const order = await razorpay.orders.create({ amount: amount * 100, currency: 'INR' })
    // - Stripe: const paymentIntent = await stripe.paymentIntents.create({ amount: amount * 100, currency: 'inr' })

    // Update booking with payment details
    booking.payment.method = paymentMethod
    booking.payment.dueAmount = amount
    booking.timeline.push({
      action: "Payment initiated",
      timestamp: new Date(),
      note: `Payment of ₹${amount} initiated via ${paymentMethod}`,
    })
    await booking.save()

    // Simulate payment gateway response
    const paymentOrder = {
      orderId,
      amount,
      currency: "INR",
      bookingId,
      paymentMethod,
      status: "created",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        message: "Payment order created successfully",
        order: paymentOrder,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create payment order error:", error)
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 })
  }
}
