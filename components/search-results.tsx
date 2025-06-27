"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import VenueCard from "@/components/venue-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Grid, List } from "lucide-react"

// Mock data - replace with actual API calls
const mockVenues = [
  {
    id: "1",
    name: "Grand Palace Banquet Hall",
    location: "Connaught Place, Delhi",
    rating: 4.8,
    reviewCount: 156,
    price: 80000,
    priceUnit: "event",
    capacity: "100-300 guests",
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Parking", "AC", "WiFi", "Catering"],
    type: "venue",
  },
  {
    id: "2",
    name: "Royal Caterers",
    location: "Karol Bagh, Delhi",
    rating: 4.6,
    reviewCount: 89,
    price: 1200,
    priceUnit: "person",
    capacity: "50+ guests",
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Veg", "Non-Veg", "Jain", "Live Counter"],
    type: "catering",
  },
  {
    id: "3",
    name: "Elegant Event Decorators",
    location: "Lajpat Nagar, Delhi",
    rating: 4.7,
    reviewCount: 124,
    price: 25000,
    priceUnit: "package",
    capacity: "All events",
    image: "/placeholder.svg?height=300&width=400",
    amenities: ["Floral", "Lighting", "Stage", "Backdrop"],
    type: "decoration",
  },
]

export default function SearchResults() {
  const searchParams = useSearchParams()
  const [venues, setVenues] = useState(mockVenues)
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("recommended")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    // Simulate API call
    const fetchResults = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams(searchParams.toString())
        const response = await fetch(`/api/search/venues?${params.toString()}`)

        if (response.ok) {
          const data = await response.json()
          setVenues(data.venues || mockVenues)
        } else {
          setVenues(mockVenues)
        }
      } catch (error) {
        console.error("Error fetching venues:", error)
        setVenues(mockVenues)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [searchParams])

  const handleSort = (value: string) => {
    setSortBy(value)
    const sortedVenues = [...venues]

    switch (value) {
      case "price-low":
        sortedVenues.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sortedVenues.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sortedVenues.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Keep original order for recommended
        break
    }

    setVenues(sortedVenues)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        <span className="ml-2 text-base sm:text-lg">Finding perfect matches...</span>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
          <p className="text-sm sm:text-base text-gray-600">Found {venues.length} options for your celebration</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* View Mode Toggle - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1 mr-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4" />
            </Button>
          </div>

          <Select value={sortBy} onValueChange={handleSort}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Grid */}
      <div
        className={`grid gap-4 sm:gap-6 ${
          viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
        }`}
      >
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} viewMode={viewMode} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8 sm:mt-12">
        <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
          Load More Results
        </Button>
      </div>
    </div>
  )
}
