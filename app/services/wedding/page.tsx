"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, MapPin, Star, Camera, Music, Utensils, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function WeddingServicesPage() {
  const [packages, setPackages] = useState([])
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWeddingData()
  }, [])

  const fetchWeddingData = async () => {
    try {
      const [packagesRes, venuesRes] = await Promise.all([
        fetch("/api/services/wedding/packages"),
        fetch("/api/search/venues?category=wedding&limit=6"),
      ])

      if (packagesRes.ok && venuesRes.ok) {
        const packagesData = await packagesRes.json()
        const venuesData = await venuesRes.json()
        setPackages(packagesData.packages || [])
        setVenues(venuesData.venues || [])
      }
    } catch (error) {
      console.error("Error fetching wedding data:", error)
    } finally {
      setLoading(false)
    }
  }

  const weddingServices = [
    {
      icon: Camera,
      title: "Photography & Videography",
      description: "Capture every precious moment with our professional photographers and videographers.",
      features: ["Pre-wedding shoot", "Ceremony coverage", "Reception photography", "Drone shots", "Same-day editing"],
      price: "Starting from ₹45,000",
    },
    {
      icon: Music,
      title: "Entertainment & Music",
      description: "Create the perfect ambiance with our curated entertainment and music services.",
      features: ["Live bands", "DJ services", "Sound systems", "Lighting", "Dance performances"],
      price: "Starting from ₹25,000",
    },
    {
      icon: Utensils,
      title: "Catering Services",
      description: "Delight your guests with exquisite cuisine from our partner restaurants and caterers.",
      features: ["Multi-cuisine options", "Live counters", "Welcome drinks", "Wedding cake", "Special dietary needs"],
      price: "Starting from ₹800/person",
    },
    {
      icon: Sparkles,
      title: "Decoration & Styling",
      description: "Transform your venue into a magical setting with our creative decoration services.",
      features: ["Mandap decoration", "Floral arrangements", "Lighting design", "Stage setup", "Guest seating"],
      price: "Starting from ₹50,000",
    },
  ]

  const weddingPackages = [
    {
      name: "Essential Wedding",
      price: "₹2,50,000",
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
    },
    {
      name: "Premium Wedding",
      price: "₹5,00,000",
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
    },
    {
      name: "Luxury Wedding",
      price: "₹10,00,000",
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
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pt-20">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Dream Wedding
              <span className="block bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                Planning Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create the wedding of your dreams with our comprehensive planning services. From intimate ceremonies to
              grand celebrations, we make your special day perfect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/search?occasion=wedding">Find Wedding Venues</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
              >
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Wedding Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for your perfect wedding day, all in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {weddingServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <Badge className="bg-rose-100 text-rose-800">{service.price}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">{service.description}</CardDescription>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Wedding Packages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated wedding packages designed to fit every budget and style.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {weddingPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                    pkg.popular ? "ring-2 ring-rose-500 scale-105" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-center py-2 rounded-t-lg">
                      <Badge className="bg-white text-rose-600">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-rose-600 my-2">{pkg.price}</div>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={`w-full ${
                        pkg.popular
                          ? "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                          : "bg-gray-900 hover:bg-gray-800"
                      } text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
                    >
                      <Link href={`/contact?package=${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        Choose Package
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Wedding Venues</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover beautiful venues perfect for your wedding celebration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.slice(0, 6).map((venue: any, index) => (
              <motion.div
                key={venue._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={venue.images?.[0] || "/placeholder.svg?height=200&width=400"}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-900">
                        <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                        {venue.rating || 4.5}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{venue.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{venue.location?.city}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">Up to {venue.capacity} guests</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-rose-600">₹{venue.pricing?.base?.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">per day</div>
                      </div>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                      >
                        <Link href={`/venue/${venue._id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
            >
              <Link href="/search?occasion=wedding">View All Wedding Venues</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Dream Wedding?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let our expert wedding planners help you create the perfect celebration. Get started with a free
              consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/contact?service=wedding">Get Free Consultation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-rose-600 px-8 py-3 rounded-full font-semibold bg-transparent"
              >
                <Link href="/search?occasion=wedding">Browse Venues</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
