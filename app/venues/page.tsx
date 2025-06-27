"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, TreePine, Hotel, Home, Users, MapPin, ArrowRight, Star } from "lucide-react"

const venueCategories = [
  {
    id: "banquet-halls",
    title: "Banquet Halls",
    description: "Elegant banquet halls perfect for weddings and large celebrations",
    icon: Building2,
    color: "from-blue-500 to-indigo-500",
    capacity: "100-1000 guests",
    priceRange: "₹50,000 - ₹2,00,000",
    features: ["Air Conditioning", "Stage Setup", "Parking", "Catering Kitchen"],
    href: "/venues/banquet-halls",
  },
  {
    id: "resorts",
    title: "Resorts",
    description: "Luxurious resort venues with accommodation and scenic views",
    icon: TreePine,
    color: "from-green-500 to-emerald-500",
    capacity: "50-500 guests",
    priceRange: "₹1,00,000 - ₹5,00,000",
    features: ["Accommodation", "Multiple Venues", "Outdoor Space", "Recreation"],
    href: "/venues/resorts",
  },
  {
    id: "hotels",
    title: "Hotels",
    description: "Premium hotel venues with professional service and amenities",
    icon: Hotel,
    color: "from-purple-500 to-violet-500",
    capacity: "20-300 guests",
    priceRange: "₹30,000 - ₹3,00,000",
    features: ["Professional Service", "Multiple Halls", "Accommodation", "Catering"],
    href: "/venues/hotels",
  },
  {
    id: "outdoor",
    title: "Outdoor Venues",
    description: "Beautiful outdoor spaces for garden parties and ceremonies",
    icon: TreePine,
    color: "from-teal-500 to-cyan-500",
    capacity: "50-800 guests",
    priceRange: "₹40,000 - ₹2,50,000",
    features: ["Garden Setting", "Natural Ambiance", "Photography Friendly", "Weather Backup"],
    href: "/venues/outdoor",
  },
  {
    id: "farmhouses",
    title: "Farmhouses",
    description: "Rustic farmhouse venues for intimate and unique celebrations",
    icon: Home,
    color: "from-amber-500 to-orange-500",
    capacity: "30-200 guests",
    priceRange: "₹25,000 - ₹1,50,000",
    features: ["Private Space", "Rustic Charm", "Outdoor Area", "Flexible Setup"],
    href: "/venues/farmhouses",
  },
  {
    id: "community",
    title: "Community Halls",
    description: "Affordable community halls for local celebrations and events",
    icon: Users,
    color: "from-red-500 to-pink-500",
    capacity: "50-300 guests",
    priceRange: "₹15,000 - ₹75,000",
    features: ["Budget Friendly", "Local Access", "Basic Amenities", "Flexible Timing"],
    href: "/venues/community",
  },
]

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Find Your Perfect <span className="gradient-text">Venue</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover amazing venues for your special occasions. From intimate gatherings to grand celebrations, we
              have the perfect space for every event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Search Venues
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                View All Categories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Venue Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Venue Categories</h2>
            <p className="text-gray-600">Choose from our diverse range of venue types</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venueCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{category.title}</CardTitle>
                    <CardDescription className="text-gray-600">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{category.capacity}</span>
                        </div>
                        <Badge variant="secondary">{category.priceRange}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {category.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <Link href={category.href}>
                        <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                          Explore Venues
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Venues Available" },
              { number: "50+", label: "Cities Covered" },
              { number: "10,000+", label: "Events Hosted" },
              { number: "4.8", label: "Average Rating", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="space-y-2"
              >
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600">{stat.number}</span>
                  {stat.icon && <stat.icon className="w-8 h-8 text-yellow-400 ml-2 fill-current" />}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Our venue experts are here to help you find the perfect space for your event
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <MapPin className="w-5 h-5 mr-2" />
                Get Venue Recommendations
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Contact Our Experts
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
