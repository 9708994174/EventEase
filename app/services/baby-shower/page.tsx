"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Baby, Gift, Camera, Cake, BombIcon as Balloon } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function BabyShowerServicesPage() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBabyShowerVenues()
  }, [])

  const fetchBabyShowerVenues = async () => {
    try {
      const response = await fetch("/api/search/venues?category=baby-shower&limit=6")
      if (response.ok) {
        const data = await response.json()
        setVenues(data.venues || [])
      }
    } catch (error) {
      console.error("Error fetching baby shower venues:", error)
    } finally {
      setLoading(false)
    }
  }

  const babyShowerServices = [
    {
      icon: Balloon,
      title: "Themed Decorations",
      description: "Create a magical atmosphere with beautiful baby shower themed decorations.",
      features: ["Balloon arrangements", "Baby-themed backdrops", "Table centerpieces", "Welcome signs", "Photo props"],
      price: "Starting from ₹12,000",
    },
    {
      icon: Cake,
      title: "Catering & Treats",
      description: "Delicious food and custom cakes perfect for celebrating the upcoming arrival.",
      features: ["Custom baby cakes", "Finger foods", "Mocktails", "Healthy options", "Themed treats"],
      price: "Starting from ₹600/person",
    },
    {
      icon: Gift,
      title: "Games & Activities",
      description: "Fun and engaging activities to entertain guests and create memorable moments.",
      features: ["Baby shower games", "Gift opening ceremony", "Memory book", "Prediction cards", "Photo booth"],
      price: "Starting from ₹8,000",
    },
    {
      icon: Camera,
      title: "Photography & Memories",
      description: "Capture precious moments of this special celebration before baby arrives.",
      features: ["Event photography", "Maternity portraits", "Group photos", "Digital gallery", "Same-day highlights"],
      price: "Starting from ₹18,000",
    },
  ]

  const babyShowerPackages = [
    {
      name: "Sweet Beginnings",
      price: "₹28,000",
      description: "Perfect package for intimate baby shower celebrations",
      features: [
        "Venue for 30 guests",
        "Themed decorations",
        "Baby shower cake (1.5kg)",
        "Light refreshments",
        "Games & activities setup",
        "Photography (2 hours)",
        "Party favors",
        "Coordinator assistance",
      ],
      popular: false,
    },
    {
      name: "Bundle of Joy",
      price: "₹45,000",
      description: "Comprehensive package for memorable celebrations",
      features: [
        "Venue for 50 guests",
        "Premium decorations",
        "Custom baby shower cake",
        "Full catering menu",
        "Entertainment & games",
        "Photography & videography",
        "Gift table setup",
        "Memory book creation",
        "Complete event coordination",
      ],
      popular: true,
    },
    {
      name: "Royal Baby Shower",
      price: "₹75,000",
      description: "Luxury package for grand celebrations",
      features: [
        "Premium venue for 80 guests",
        "Designer decorations",
        "Multi-tier baby cake",
        "Gourmet catering",
        "Professional entertainment",
        "Photography team",
        "Maternity photoshoot",
        "Guest accommodation",
        "Complete hospitality",
      ],
      popular: false,
    },
  ]

  const babyShowerThemes = [
    {
      name: "Twinkle Twinkle Little Star",
      colors: ["Gold", "White", "Silver"],
      description: "Celestial theme perfect for welcoming your little star",
      elements: ["Star decorations", "Moon and stars backdrop", "Glittery accents", "Celestial cake"],
    },
    {
      name: "Oh Baby!",
      colors: ["Pink", "Blue", "Yellow"],
      description: "Classic baby shower theme with traditional colors",
      elements: ["Baby blocks", "Pacifier decorations", "Baby bottles", "Cute baby animals"],
    },
    {
      name: "Jungle Safari",
      colors: ["Green", "Brown", "Orange"],
      description: "Adventure-themed celebration with cute jungle animals",
      elements: ["Animal decorations", "Jungle backdrop", "Safari props", "Animal-shaped treats"],
    },
    {
      name: "Little Prince/Princess",
      colors: ["Royal Blue", "Pink", "Gold"],
      description: "Royal themed celebration for your little royalty",
      elements: ["Crown decorations", "Royal backdrop", "Castle props", "Elegant table settings"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 pt-20">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full mb-6">
              <Baby className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Baby Shower
              <span className="block bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Planning Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Celebrate the upcoming arrival of your little bundle of joy with our comprehensive baby shower planning
              services. From intimate gatherings to grand celebrations, we create magical moments for this special
              milestone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/search?occasion=baby-shower">Find Baby Shower Venues</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
              >
                <Link href="/contact">Plan My Baby Shower</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Baby Shower Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a memorable baby shower celebration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {babyShowerServices.map((service, index) => (
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
                      <div className="p-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <Badge className="bg-pink-100 text-pink-800">{service.price}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">{service.description}</CardDescription>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
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

      {/* Themes Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Baby Shower Themes</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our curated collection of beautiful baby shower themes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {babyShowerThemes.map((theme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{theme.name}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      {theme.colors.map((color, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-800">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">{theme.description}</CardDescription>
                    <ul className="space-y-2">
                      {theme.elements.map((element, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {element}
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Baby Shower Packages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our specially designed baby shower celebration packages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {babyShowerPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                    pkg.popular ? "ring-2 ring-pink-500 scale-105" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="bg-gradient-to-r from-pink-500 to-blue-500 text-white text-center py-2 rounded-t-lg">
                      <Badge className="bg-white text-pink-600">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-pink-600 my-2">{pkg.price}</div>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={`w-full ${
                        pkg.popular
                          ? "bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Celebrate Your Bundle of Joy?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let us help you create a magical baby shower celebration that honors this special milestone. Start
              planning your perfect baby shower today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/contact?service=baby-shower">Plan My Baby Shower</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-pink-600 px-8 py-3 rounded-full font-semibold bg-transparent"
              >
                <Link href="/search?occasion=baby-shower">Browse Venues</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
