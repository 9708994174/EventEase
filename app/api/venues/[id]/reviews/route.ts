import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Review from "@/models/Review"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const reviews = await Review.find({ entityId: params.id, entityType: "venue" })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 })
      .lean()

    const transformedReviews = reviews.map((review) => ({
      id: review._id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      helpfulCount: review.helpfulCount || 0,
      user: {
        name: review.userId?.name,
        avatar: review.userId?.avatar,
      },
    }))

    return NextResponse.json(
      {
        reviews: transformedReviews,
        total: reviews.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get reviews error:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { rating, comment } = await request.json()

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    if (!comment || comment.trim().length < 10) {
      return NextResponse.json({ error: "Comment must be at least 10 characters long" }, { status: 400 })
    }

    // Check if user already reviewed this venue
    const existingReview = await Review.findOne({
      userId: decoded.userId,
      entityId: params.id,
      entityType: "venue",
    })

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this venue" }, { status: 409 })
    }

    // Create review
    const review = new Review({
      userId: decoded.userId,
      entityId: params.id,
      entityType: "venue",
      rating,
      comment: comment.trim(),
      helpfulCount: 0,
      createdAt: new Date(),
    })

    await review.save()

    return NextResponse.json(
      {
        message: "Review submitted successfully",
        review: {
          id: review._id,
          rating: review.rating,
          comment: review.comment,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create review error:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
