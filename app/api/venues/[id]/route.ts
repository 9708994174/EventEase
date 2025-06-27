import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Venue from "@/models/Venue"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    // (removed duplicate declaration of 'venue')

    // The actual 'venue' variable is declared below with the correct type annotation.
    // The following check will be performed after that declaration.

    // Transform data for frontend
    interface VenueLocation {
      address: string
      city: string
      state: string
      pincode: string
    }

    interface VenueCapacity {
      min: number
      max: number
    }

    interface VenuePricing {
      basePrice: number
      priceUnit: string
    }

    interface VenueRating {
      average: number
      count: number
    }

    interface VenuePolicies {
      [key: string]: any
    }

    interface VenuePartner {
      _id: string
      name: string
      phone?: string
      email?: string
    }

    interface VenueAvailability {
      [key: string]: any
    }

    interface VenueType {
      _id: string
      name: string
      description: string
      location: VenueLocation
      category: string
      capacity: VenueCapacity
      pricing: VenuePricing
      rating: VenueRating
      images: string[]
      amenities: string[]
      policies: VenuePolicies
      partnerId?: VenuePartner
      isActive: boolean
      isVerified: boolean
      availability: VenueAvailability
    }

    interface TransformedVenue {
      id: string
      name: string
      description: string
      location: string
      fullAddress: string
      city: string
      category: string
      capacity: string
      price: number
      priceUnit: string
      rating: number
      reviewCount: number
      images: string[]
      amenities: string[]
      features: string[]
      policies: VenuePolicies
      contact: {
        phone: string
        email: string
        website: string
      }
      partner?: VenuePartner
      availability: VenueAvailability
    }

    const rawVenue = await Venue.findById(params.id).populate("partnerId", "name phone email").lean();
    if (!rawVenue || Array.isArray(rawVenue)) {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 })
    }
    const venue = rawVenue as any as VenueType;
    if (!venue.isActive || !venue.isVerified) {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 })
    }

    const transformedVenue: TransformedVenue = {
      id: venue._id,
      name: venue.name,
      description: venue.description,
      location: `${venue.location.address}, ${venue.location.city}`,
      fullAddress: `${venue.location.address}, ${venue.location.city}, ${venue.location.state} - ${venue.location.pincode}`,
      city: venue.location.city,
      category: venue.category,
      capacity: `${venue.capacity.min}-${venue.capacity.max} guests`,
      price: venue.pricing.basePrice,
      priceUnit: venue.pricing.priceUnit,
      rating: venue.rating.average,
      reviewCount: venue.rating.count,
      images: venue.images,
      amenities: venue.amenities,
      features: [
        `Capacity: ${venue.capacity.min}-${venue.capacity.max} guests`,
        `Category: ${venue.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}`,
        `Pricing: ₹${venue.pricing.basePrice.toLocaleString("en-IN")} ${venue.pricing.priceUnit}`,
        ...venue.amenities.slice(0, 3).map((amenity) => `${amenity} Available`),
      ],
      policies: venue.policies,
      contact: {
        phone: venue.partnerId?.phone || "+91 98765 43210",
        email: venue.partnerId?.email || "contact@venue.com",
        website: "www.venue.com",
      },
      partner: venue.partnerId,
      availability: venue.availability,
    }

    return NextResponse.json(
      {
        venue: transformedVenue,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get venue error:", error)
    return NextResponse.json({ error: "Failed to fetch venue details" }, { status: 500 })
  }
}
