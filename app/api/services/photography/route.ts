import { type NextRequest, NextResponse } from "next/server"

const mockPhotographyServices = [
  {
    id: "photo_001",
    name: "Premium Wedding Photography",
    description: "Complete wedding photography with pre-wedding, ceremony, and reception coverage",
    price: 45000,
    image: "/placeholder.svg?height=200&width=300",
    category: "wedding",
    duration: "Full day",
    includes: ["2 Photographers", "500+ Edited Photos", "Online Gallery", "USB Drive", "Photo Album"],
  },
  {
    id: "photo_002",
    name: "Event Photography Basic",
    description: "Professional event photography for birthdays, anniversaries, and small celebrations",
    price: 15000,
    image: "/placeholder.svg?height=200&width=300",
    category: "event",
    duration: "4 hours",
    includes: ["1 Photographer", "200+ Edited Photos", "Online Gallery", "USB Drive"],
  },
  {
    id: "photo_003",
    name: "Candid Photography",
    description: "Natural and candid moments captured throughout your celebration",
    price: 25000,
    image: "/placeholder.svg?height=200&width=300",
    category: "candid",
    duration: "6 hours",
    includes: ["1 Candid Photographer", "300+ Photos", "Same Day Preview", "Online Gallery"],
  },
  {
    id: "photo_004",
    name: "Videography Package",
    description: "Professional videography with highlight reel and full ceremony coverage",
    price: 35000,
    image: "/placeholder.svg?height=200&width=300",
    category: "video",
    duration: "Full day",
    includes: ["2 Videographers", "Highlight Reel", "Full Ceremony Video", "Drone Shots", "Edited Videos"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let services = mockPhotographyServices

    if (category && category !== "all") {
      services = services.filter((service) => service.category === category)
    }

    return NextResponse.json(
      {
        services,
        total: services.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get photography services error:", error)
    return NextResponse.json({ error: "Failed to fetch photography services" }, { status: 500 })
  }
}
