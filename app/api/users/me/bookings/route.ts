import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Booking from "@/models/Booking"

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Build query
    const query: any = { userId: decoded.userId }
    if (status && status !== "all") {
      query.status = status
    }

    // Execute query with pagination
    const skip = (page - 1) * limit
    const bookings = await Booking.find(query)
      .populate("venueId", "name location images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const totalCount = await Booking.countDocuments(query)

    const transformedBookings = bookings.map((booking) => ({
      id: booking._id,
      bookingId: booking.bookingId,
      status: booking.status,
      eventDetails: booking.eventDetails,
      pricing: booking.pricing,
      payment: booking.payment,
      venue: booking.venueId
        ? {
            id: booking.venueId._id,
            name: booking.venueId.name,
            location: booking.venueId.location,
            image: booking.venueId.images?.[0],
          }
        : null,
      services: booking.services,
      createdAt: booking.createdAt,
    }))

    return NextResponse.json(
      {
        bookings: transformedBookings,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
          hasNext: page < Math.ceil(totalCount / limit),
          hasPrev: page > 1,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get user bookings error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
