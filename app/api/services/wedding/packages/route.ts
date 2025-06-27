import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // In a real application, this would fetch from your database
    const packages = [
      {
        id: "essential-wedding",
        name: "Essential Wedding",
        price: 250000,
        description: "Perfect for intimate weddings with essential services",
        features: [
          "Venue for 100 guests",
          "Basic decoration",
          "Photography (4 hours)",
          "Catering (lunch/dinner)",
          "Basic sound system",
          "Wedding coordinator",
        ],
        popular: false,
        category: "wedding",
        duration: "1 day",
        includes: {
          venue: true,
          catering: true,
          decoration: true,
          photography: true,
          coordination: true,
        },
      },
      {
        id: "premium-wedding",
        name: "Premium Wedding",
        price: 500000,
        description: "Comprehensive package for memorable celebrations",
        features: [
          "Venue for 200 guests",
          "Premium decoration",
          "Photography & videography",
          "Multi-cuisine catering",
          "DJ & entertainment",
          "Bridal makeup",
          "Transportation",
          "Dedicated coordinator",
        ],
        popular: true,
        category: "wedding",
        duration: "2 days",
        includes: {
          venue: true,
          catering: true,
          decoration: true,
          photography: true,
          videography: true,
          entertainment: true,
          makeup: true,
          transportation: true,
          coordination: true,
        },
      },
      {
        id: "luxury-wedding",
        name: "Luxury Wedding",
        price: 1000000,
        description: "Ultimate luxury experience for your special day",
        features: [
          "Premium venue for 300+ guests",
          "Designer decoration",
          "Professional photography team",
          "Gourmet catering",
          "Live entertainment",
          "Bridal suite",
          "Guest accommodation",
          "Complete event management",
        ],
        popular: false,
        category: "wedding",
        duration: "3 days",
        includes: {
          venue: true,
          catering: true,
          decoration: true,
          photography: true,
          videography: true,
          entertainment: true,
          makeup: true,
          transportation: true,
          accommodation: true,
          coordination: true,
        },
      },
    ]

    return NextResponse.json({ packages }, { status: 200 })
  } catch (error) {
    console.error("Get wedding packages error:", error)
    return NextResponse.json({ error: "Failed to fetch wedding packages" }, { status: 500 })
  }
}
