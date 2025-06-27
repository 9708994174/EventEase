import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Booking from "@/models/Booking"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { orderId, paymentId, signature, bookingId } = await request.json()

    // In production, verify payment signature with payment gateway
    // For Razorpay: const isValidSignature = validatePaymentSignature(orderId, paymentId, signature)
    // For now, we'll simulate successful verification

    const booking = await Booking.findById(bookingId)
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Update booking status to confirmed
    booking.status = "confirmed"
    booking.payment.status = "completed"
    booking.payment.transactionId = paymentId
    booking.payment.paidAmount = booking.payment.dueAmount
    booking.payment.dueAmount = 0
    booking.payment.paymentDate = new Date()

    booking.timeline.push({
      action: "Payment completed",
      timestamp: new Date(),
      note: `Payment of ₹${booking.payment.paidAmount} completed successfully`,
    })

    await booking.save()

    // Here you would typically:
    // 1. Send confirmation emails to customer and vendors
    // 2. Send real-time notifications via Socket.IO
    // 3. Update vendor availability
    // 4. Generate invoice

    return NextResponse.json(
      {
        message: "Payment verified successfully",
        booking: {
          id: booking._id,
          bookingId: booking.bookingId,
          status: booking.status,
          paymentStatus: booking.payment.status,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Verify payment error:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
