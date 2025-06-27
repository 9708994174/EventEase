"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Heart,
  Camera,
  Utensils,
  Music,
  MapPin,
  Star,
  ArrowRight,
  Users,
  Calendar,
  IndianRupee,
} from "lucide-react"

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

const engagementPackages = [
  {
    id: "intimate",
    name: "Intimate Engagement",
    price: 75000,
    description: "Perfect for close family and friends",
    features: [
      "Venue for 50-100 guests",
      "Basic decoration with flowers",
      "Photography (4 hours)",
      "Light refreshments",
      "Ring ceremony setup",
    ],
    popular: false,
  },
  {
    id: "classic",
    name: "Classic Engagement",
    price: 150000,
    description: "Traditional engagement ceremony",
    features: [
      "Venue for 100-200 guests",
      "Premium decoration with themes",
      "Photography & Videography (6 hours)",
      "Full catering service",
      "Stage setup with backdrop",
      "Sound system & lighting",
    ],
    popular: true,
  },
  {
    id: "grand",
    name: "Grand Engagement",
    price: 300000,
    description: "Luxurious engagement celebration",
    features: [
      "Premium venue for 200+ guests",
      "Designer decoration & themes",
      "Professional photography & videography",
      "Multi-cuisine catering",
      "Live entertainment",
      "Bridal room & guest facilities",
      "Welcome drinks & dessert counter",
    ],
    popular: false,
  },
]

export default function EngagementPage() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("/api/search/venues?category=engagement&limit=6")
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Sparkles className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Perfect Engagement Ceremonies</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Celebrate your love story with beautiful engagement ceremonies. From intimate gatherings to grand
              celebrations, we make your special moment unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                <Calendar className="w-5 h-5 mr-2" />
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-600 bg-transparent"
              >
                View Packages
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Engagement Packages</h2>
            <p className="text-gray-600">Choose the perfect package for your engagement ceremony</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card
                  className={`h-full relative ${pkg.popular ? "ring-2 ring-teal-500 shadow-xl" : "hover:shadow-lg"} transition-all duration-300`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-teal-500 text-white px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-900">{pkg.name}</CardTitle>
                    <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                    <div className="flex items-center justify-center mt-4">
                      <IndianRupee className="w-6 h-6 text-teal-600" />
                      <span className="text-3xl font-bold text-teal-600">{pkg.price.toLocaleString("en-IN")}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Heart className="w-4 h-4 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${pkg.popular ? "bg-teal-600 hover:bg-teal-700" : ""}`}>
                      Select Package
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Engagement Venues</h2>
            <p className="text-gray-600">Beautiful venues perfect for your engagement ceremony</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
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
          ) : (
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 text-teal-600" />
                          <span className="font-semibold text-teal-600">{venue.price.toLocaleString("en-IN")}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/search?category=engagement">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                View All Venues
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Engagement Services</h2>
            <p className="text-gray-600">Everything you need for a perfect engagement ceremony</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Camera,
                title: "Photography",
                description: "Professional engagement photography to capture your special moments",
              },
              {
                icon: Utensils,
                title: "Catering",
                description: "Delicious food and refreshments for your guests",
              },
              {
                icon: Music,
                title: "Entertainment",
                description: "Live music and entertainment for a memorable celebration",
              },
              {
                icon: Sparkles,
                title: "Decoration",
                description: "Beautiful decorations and theme setup for your venue",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Plan Your Perfect Engagement?</h2>
            <p className="text-xl text-teal-100 mb-8">
              Let us help you create a beautiful and memorable engagement ceremony
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-600 bg-transparent"
              >
                <Heart className="w-5 h-5 mr-2" />
                View Gallery
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
