"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Users, Star, IndianRupee, ArrowRight, Filter } from "lucide-react"

interface Venue {
  id: string
  name: string
  location: string
  city: string
  price: number
  rating: number
  reviewCount: number
  images: string[]
  capacity: string
  amenities: string[]
}

export default function BanquetHallsPage() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("/api/search/venues?category=banquet-hall&limit=12")
        const data = await response.json()
        setVenues(data.venues || [])
      } catch (error) {
        console.error("Error fetching venues:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVenues()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Building2 className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Banquet Halls</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Elegant banquet halls perfect for weddings, receptions, and large celebrations. Find the perfect venue
              with all modern amenities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search?category=banquet-hall">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter Results
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Available Banquet Halls</h2>
            <div className="text-gray-600">{venues.length} venues found</div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : venues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {venues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={venue.images[0] || "/placeholder.svg?height=200&width=300"}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {venue.rating}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">{venue.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{venue.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-3">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{venue.capacity}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {venue.amenities.slice(0, 3).map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {venue.amenities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{venue.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-600">{venue.price.toLocaleString("en-IN")}</span>
                        </div>
                        <Link href={`/venue/${venue.id}`}>
                          <Button size="sm">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No banquet halls found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse other venue types.</p>
              <Link href="/venues">
                <Button>Browse All Venues</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
