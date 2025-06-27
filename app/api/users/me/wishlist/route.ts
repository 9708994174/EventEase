import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

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

    const user = await User.findById(decoded.userId).populate({
      path: "wishlist",
      model: "Venue",
      select: "name location images pricing rating",
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const wishlist = user.wishlist.map((venue: any) => ({
      id: venue._id,
      name: venue.name,
      location: `${venue.location.address}, ${venue.location.city}`,
      image: venue.images?.[0],
      price: venue.pricing.basePrice,
      rating: venue.rating.average,
      type: "venue",
    }))

    return NextResponse.json(
      {
        wishlist,
        total: wishlist.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get wishlist error:", error)
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const { entityId, entityType } = await request.json()

    if (!entityId || !entityType) {
      return NextResponse.json({ error: "Entity ID and type are required" }, { status: 400 })
    }

    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if already in wishlist
    const isInWishlist = user.wishlist.includes(entityId)

    if (isInWishlist) {
      // Remove from wishlist
      user.wishlist = user.wishlist.filter((id: string | { toString(): string }) => id.toString() !== entityId)
      await user.save()

      return NextResponse.json(
        {
          message: "Removed from wishlist",
          action: "removed",
        },
        { status: 200 },
      )
    } else {
      // Add to wishlist
      user.wishlist.push(entityId)
      await user.save()

      return NextResponse.json(
        {
          message: "Added to wishlist",
          action: "added",
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("Update wishlist error:", error)
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 })
  }
}
