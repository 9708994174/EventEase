import { type NextRequest, NextResponse } from "next/server"

const mockExtraServices = [
  {
    id: "extra_001",
    name: "Photo Booth",
    description: "Fun photo booth with props and instant printing for guests",
    price: 8000,
    image: "/placeholder.svg?height=200&width=300",
    category: "entertainment",
    duration: "4 hours",
    includes: ["Photo Booth Setup", "Props & Accessories", "Instant Printing", "Digital Copies"],
  },
  {
    id: "extra_002",
    name: "Welcome Drinks",
    description: "Refreshing welcome drinks for guests upon arrival",
    price: 150,
    image: "/placeholder.svg?height=200&width=300",
    category: "beverages",
    unit: "per person",
    includes: ["Fresh Juices", "Mocktails", "Tea/Coffee", "Service Staff"],
  },
  {
    id: "extra_003",
    name: "Valet Parking",
    description: "Professional valet parking service for guest convenience",
    price: 5000,
    image: "/placeholder.svg?height=200&width=300",
    category: "service",
    duration: "Event duration",
    includes: ["Trained Valet Staff", "Parking Management", "Vehicle Security", "Guest Assistance"],
  },
  {
    id: "extra_004",
    name: "Live Streaming",
    description: "Professional live streaming setup for remote guests",
    price: 12000,
    image: "/placeholder.svg?height=200&width=300",
    category: "technology",
    duration: "Full event",
    includes: ["Multi-camera Setup", "Live Streaming Platform", "Technical Support", "Recording"],
  },
  {
    id: "extra_005",
    name: "Mehendi Artist",
    description: "Professional mehendi artist for traditional celebrations",
    price: 3000,
    image: "/placeholder.svg?height=200&width=300",
    category: "traditional",
    duration: "3 hours",
    includes: ["Professional Artist", "Henna Supplies", "Design Consultation", "Touch-up Service"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let services = mockExtraServices

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
    console.error("Get extra services error:", error)
    return NextResponse.json({ error: "Failed to fetch extra services" }, { status: 500 })
  }
}
