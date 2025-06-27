import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Venue from "@/models/Venue"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)

    // Extract search parameters
    const occasion = searchParams.get("occasion")
    const location = searchParams.get("location")
    const date = searchParams.get("date")
    const guests = searchParams.get("guests")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const minGuests = searchParams.get("minGuests")
    const maxGuests = searchParams.get("maxGuests")
    const venueType = searchParams.get("venueType")
    const amenities = searchParams.get("amenities")
    const cuisine = searchParams.get("cuisine")
    const serviceType = searchParams.get("serviceType")
    const sortBy = searchParams.get("sortBy") || "recommended"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    // Build query object
    const query: any = {}

    // Location filter
    if (location) {
      query.$or = [
        { "location.city": { $regex: location, $options: "i" } },
        { "location.area": { $regex: location, $options: "i" } },
        { "location.address": { $regex: location, $options: "i" } },
      ]
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.pricing = {}
      if (minPrice) query.pricing.$gte = Number.parseInt(minPrice)
      if (maxPrice) query.pricing.$lte = Number.parseInt(maxPrice)
    }

    // Guest capacity filter
    if (minGuests || maxGuests || guests) {
      const guestCount = guests ? Number.parseInt(guests) : null
      query.$and = query.$and || []

      if (guestCount) {
        query.$and.push({
          $or: [
            { "capacity.min": { $lte: guestCount }, "capacity.max": { $gte: guestCount } },
            { "capacity.flexible": true },
          ],
        })
      } else {
        if (minGuests) {
          query.$and.push({ "capacity.max": { $gte: Number.parseInt(minGuests) } })
        }
        if (maxGuests) {
          query.$and.push({ "capacity.min": { $lte: Number.parseInt(maxGuests) } })
        }
      }
    }

    // Venue type filter
    if (venueType) {
      const types = venueType.split(",").map((t) => t.trim())
      query.type = { $in: types.map((t) => new RegExp(t, "i")) }
    }

    // Amenities filter
    if (amenities) {
      const amenityList = amenities.split(",").map((a) => a.trim())
      query.amenities = { $all: amenityList }
    }

    // Cuisine filter (for venues with catering)
    if (cuisine) {
      const cuisineList = cuisine.split(",").map((c) => c.trim())
      query["catering.cuisines"] = { $in: cuisineList }
    }

    // Service type filter
    if (serviceType) {
      const services = serviceType.split(",").map((s) => s.trim().toLowerCase())
      if (services.includes("venues")) {
        // Include venues in results
      }
      // Add other service type filters as needed
    }

    // Date availability filter
    if (date) {
      const eventDate = new Date(date)
      query.$and = query.$and || []
      query.$and.push({
        $or: [
          { "availability.blackoutDates": { $not: { $elemMatch: { $eq: eventDate } } } },
          { "availability.blackoutDates": { $exists: false } },
        ],
      })
    }

    // Build sort object
    let sortObject: any = {}
    switch (sortBy) {
      case "price-low":
        sortObject = { "pricing.base": 1 }
        break
      case "price-high":
        sortObject = { "pricing.base": -1 }
        break
      case "rating":
        sortObject = { "rating.average": -1 }
        break
      case "newest":
        sortObject = { createdAt: -1 }
        break
      case "popular":
        sortObject = { "stats.bookings": -1 }
        break
      default:
        // Recommended: combination of rating and popularity
        sortObject = { "rating.average": -1, "stats.bookings": -1 }
    }

    // Execute query with pagination
    const skip = (page - 1) * limit

    const [venues, totalCount] = await Promise.all([
      Venue.find(query)
        .sort(sortObject)
        .skip(skip)
        .limit(limit)
        .populate("reviews", "rating comment user createdAt", undefined, { limit: 3, sort: { createdAt: -1 } })
        .lean(),
      Venue.countDocuments(query),
    ])

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    // Transform venues data for frontend
    const transformedVenues = venues.map((venue) => ({
      id: (venue._id as { toString(): string }).toString(),
      name: venue.name,
      location: `${venue.location.area}, ${venue.location.city}`,
      rating: venue.rating?.average || 4.0,
      reviewCount: venue.rating?.count || 0,
      price: venue.pricing?.base || 0,
      priceUnit: venue.pricing?.unit || "event",
      capacity: `${venue.capacity?.min || 50}-${venue.capacity?.max || 500} guests`,
      image: venue.images?.[0] || "/placeholder.svg?height=300&width=400",
      amenities: venue.amenities || [],
      type: venue.type || "venue",
      description: venue.description,
      features: venue.features || [],
      availability: venue.availability,
    }))

    return NextResponse.json({
      success: true,
      venues: transformedVenues,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit,
      },
      filters: {
        appliedFilters: {
          occasion,
          location,
          date,
          guests,
          priceRange: { min: minPrice, max: maxPrice },
          guestRange: { min: minGuests, max: maxGuests },
          venueType: venueType?.split(",") || [],
          amenities: amenities?.split(",") || [],
          cuisine: cuisine?.split(",") || [],
          serviceType: serviceType?.split(",") || [],
        },
      },
    })
  } catch (error) {
    console.error("Search venues error:", error)
    return NextResponse.json({ success: false, error: "Failed to search venues" }, { status: 500 })
  }
}
