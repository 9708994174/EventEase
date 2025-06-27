import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

const mockDecorationServices = [
  {
    id: "dec_001",
    name: "Elegant Floral Theme",
    description: "Beautiful floral arrangements with roses, lilies, and seasonal flowers",
    price: 15000,
    image: "/placeholder.svg?height=200&width=300",
    category: "floral",
    includes: ["Stage Decoration", "Table Centerpieces", "Entrance Arch", "Backdrop"],
  },
  {
    id: "dec_002",
    name: "Royal Gold Theme",
    description: "Luxurious gold and cream theme with elegant draping and lighting",
    price: 25000,
    image: "/placeholder.svg?height=200&width=300",
    category: "luxury",
    includes: ["Gold Draping", "Crystal Chandeliers", "Royal Seating", "Stage Setup"],
  },
  {
    id: "dec_003",
    name: "Bollywood Glam",
    description: "Vibrant and colorful Bollywood-inspired decoration with lights and colors",
    price: 18000,
    image: "/placeholder.svg?height=200&width=300",
    category: "themed",
    includes: ["Colorful Draping", "LED Lights", "Photo Booth", "Dance Floor Setup"],
  },
  {
    id: "dec_004",
    name: "Minimalist Modern",
    description: "Clean and contemporary decoration with geometric patterns and subtle colors",
    price: 12000,
    image: "/placeholder.svg?height=200&width=300",
    category: "modern",
    includes: ["Geometric Backdrop", "Modern Furniture", "Ambient Lighting", "Clean Lines"],
  },
  {
    id: "dec_005",
    name: "Traditional Indian",
    description: "Classic Indian decoration with marigolds, diyas, and traditional elements",
    price: 20000,
    image: "/placeholder.svg?height=200&width=300",
    category: "traditional",
    includes: ["Marigold Garlands", "Diyas & Candles", "Traditional Rangoli", "Mandap Setup"],
  },
]

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let services = mockDecorationServices

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
    console.error("Get decoration services error:", error)
    return NextResponse.json({ error: "Failed to fetch decoration services" }, { status: 500 })
  }
}
