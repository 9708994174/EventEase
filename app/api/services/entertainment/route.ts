import { type NextRequest, NextResponse } from "next/server"

const mockEntertainmentServices = [
  {
    id: "ent_001",
    name: "Professional DJ",
    description: "Experienced DJ with latest sound system and lighting for all occasions",
    price: 8000,
    image: "/placeholder.svg?height=200&width=300",
    category: "music",
    duration: "4 hours",
    includes: ["Sound System", "Microphones", "LED Lights", "Music Library"],
  },
  {
    id: "ent_002",
    name: "Live Band Performance",
    description: "Professional live band with singers and musicians for memorable performances",
    price: 25000,
    image: "/placeholder.svg?height=200&width=300",
    category: "music",
    duration: "3 hours",
    includes: ["4-piece Band", "Sound Equipment", "Stage Setup", "Repertoire of 50+ Songs"],
  },
  {
    id: "ent_003",
    name: "Dance Troupe",
    description: "Professional dancers performing Bollywood, classical, and contemporary dance",
    price: 15000,
    image: "/placeholder.svg?height=200&width=300",
    category: "dance",
    duration: "45 minutes",
    includes: ["6 Dancers", "Costume Changes", "Choreography", "Background Music"],
  },
  {
    id: "ent_004",
    name: "Magic Show",
    description: "Professional magician with interactive magic show for all age groups",
    price: 12000,
    image: "/placeholder.svg?height=200&width=300",
    category: "performance",
    duration: "60 minutes",
    includes: ["Professional Magician", "Magic Props", "Interactive Show", "Audience Participation"],
  },
  {
    id: "ent_005",
    name: "Stand-up Comedy",
    description: "Professional comedian for light-hearted entertainment and laughter",
    price: 10000,
    image: "/placeholder.svg?height=200&width=300",
    category: "comedy",
    duration: "45 minutes",
    includes: ["Professional Comedian", "Clean Comedy", "Audience Interaction", "Microphone Setup"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let services = mockEntertainmentServices

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
    console.error("Get entertainment services error:", error)
    return NextResponse.json({ error: "Failed to fetch entertainment services" }, { status: 500 })
  }
}
