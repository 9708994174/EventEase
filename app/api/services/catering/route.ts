import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

// Mock catering services - replace with actual database queries
const mockCateringServices = [
  {
    id: "cat_001",
    name: "North Indian Deluxe",
    description: "Authentic North Indian cuisine with dal, sabzi, roti, rice, and dessert",
    price: 450,
    image: "/placeholder.svg?height=200&width=300",
    category: "vegetarian",
    serves: "per person",
    items: ["Dal Makhani", "Paneer Butter Masala", "Roti", "Rice", "Gulab Jamun"],
  },
  {
    id: "cat_002",
    name: "South Indian Special",
    description: "Traditional South Indian meals with sambar, rasam, variety rice, and payasam",
    price: 380,
    image: "/placeholder.svg?height=200&width=300",
    category: "vegetarian",
    serves: "per person",
    items: ["Sambar", "Rasam", "Curd Rice", "Variety Rice", "Payasam"],
  },
  {
    id: "cat_003",
    name: "Continental Buffet",
    description: "International cuisine with pasta, salads, grilled items, and desserts",
    price: 650,
    image: "/placeholder.svg?height=200&width=300",
    category: "non-vegetarian",
    serves: "per person",
    items: ["Pasta", "Grilled Chicken", "Caesar Salad", "Garlic Bread", "Tiramisu"],
  },
  {
    id: "cat_004",
    name: "Chinese Combo",
    description: "Popular Chinese dishes with fried rice, noodles, manchurian, and soup",
    price: 420,
    image: "/placeholder.svg?height=200&width=300",
    category: "vegetarian",
    serves: "per person",
    items: ["Fried Rice", "Hakka Noodles", "Veg Manchurian", "Hot & Sour Soup"],
  },
  {
    id: "cat_005",
    name: "Gujarati Thali",
    description: "Traditional Gujarati thali with variety of sabzis, dal, kadhi, and sweets",
    price: 350,
    image: "/placeholder.svg?height=200&width=300",
    category: "vegetarian",
    serves: "per person",
    items: ["Mixed Sabzi", "Dal", "Kadhi", "Rotli", "Rice", "Shrikhand"],
  },
  {
    id: "cat_006",
    name: "BBQ & Grill",
    description: "Grilled items with tandoori chicken, kebabs, and grilled vegetables",
    price: 750,
    image: "/placeholder.svg?height=200&width=300",
    category: "non-vegetarian",
    serves: "per person",
    items: ["Tandoori Chicken", "Seekh Kebab", "Grilled Fish", "Veg Tikka"],
  },
]

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const location = searchParams.get("location")

    // Filter services based on query parameters
    let services = mockCateringServices

    if (category && category !== "all") {
      services = services.filter((service) => service.category === category)
    }

    // In a real application, you would filter by location as well
    // services = services.filter(service => service.availableLocations.includes(location))

    return NextResponse.json(
      {
        services,
        total: services.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get catering services error:", error)
    return NextResponse.json({ error: "Failed to fetch catering services" }, { status: 500 })
  }
}
