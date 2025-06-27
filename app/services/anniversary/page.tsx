"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Gift, Camera, Music } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AnniversaryServicesPage() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnniversaryVenues()
  }, [])

  const fetchAnniversaryVenues = async () => {
    try {
      const response = await fetch("/api/search/venues?category=anniversary&limit=6")
      if (response.ok) {
        const data = await response.json()
        setVenues(data.venues || [])
      }
    } catch (error) {
      console.error("Error fetching anniversary venues:", error)
    } finally {
      setLoading(false)
    }
  }

  const anniversaryServices = [
    {
      icon: Heart,
      title: "Romantic Decorations",
      description: "Create an intimate and romantic atmosphere with elegant decorations and lighting.",
      features: ["Floral arrangements", "Romantic lighting", "Candle setups", "Photo displays", "Memory walls"],
      price: "Starting from ₹15,000",
    },
    {
      icon: Camera,
      title: "Photography & Videography",
      description: "Capture precious moments and create lasting memories of your special celebration.",
      features: ["Couple photography", "Candid moments", "Family portraits", "Video highlights", "Same-day editing"],
      price: "Starting from ₹20,000",
    },
    {
      icon: Music,
      title: "Entertainment & Music",
      description: "Set the perfect mood with curated music and entertainment for your anniversary.",
      features: ["Live music", "DJ services", "Special songs", "Dance floor", "Sound systems"],
      price: "Starting from ₹18,000",
    },
    {
      icon: Gift,
      title: "Catering & Dining",
      description: "Enjoy exquisite dining experiences with customized menus for your celebration.",
      features: ["Multi-course meals", "Anniversary cake", "Wine selection", "Special dietary needs", "Table service"],
      price: "Starting from ₹1,200/person",
    },
  ]

  const anniversaryPackages = [
    {
      name: "Intimate Anniversary",
      price: "₹35,000",
      description: "Perfect for intimate anniversary celebrations",
      features: [
        "Private dining for 20 guests",
        "Romantic decorations",
        "Anniversary cake (1kg)",
        "Photography (3 hours)",
        "Background music",
        "Personalized touches",
        "Flower arrangements",
        "Dedicated coordinator",
      ],
      popular: false,
    },
    {
      name: "Golden Celebration",
      price: "₹65,000",
      description: "Elegant package for milestone anniversaries",
      features: [
        "Banquet hall for 50 guests",
        "Premium decorations",
        "Live music performance",
        "Multi-course dinner",
        "Anniversary cake (2kg)",
        "Photography & videography",
        "Memory slideshow",
        "Gift arrangements",
        "Complete event management",
      ],
      popular: true,
    },
    {
      name: "Grand Anniversary",
      price: "₹1,20,000",
      description: "Luxurious celebration for special milestones",
      features: [
        "Premium venue for 100 guests",
        "Designer decorations",
        "Live band performance",
        "Gourmet dining experience",
        "Custom anniversary cake",
        "Professional photography team",
        "Video documentation",
        "Guest accommodation",
        "Transportation arrangements",
        "Anniversary gifts",
        "Complete hospitality",
      ],
      popular: false,
    },
  ]

  const anniversaryMilestones = [
    {
      years: "1st",
      name: "Paper Anniversary",
      theme: "New Beginnings",
      colors: ["White", "Cream", "Gold"],
      ideas: ["Photo albums", "Love letters", "Memory books", "Paper flowers"],
    },
    {
      years: "5th",
      name: "Wood Anniversary",
      theme: "Strong Roots",
      colors: ["Brown", "Green", "Natural"],
      ideas: ["Wooden decorations", "Tree planting", "Rustic themes", "Nature elements"],
    },
    {
      years: "10th",
      name: "Tin Anniversary",
      theme: "Flexibility",
      colors: ["Silver", "Blue", "White"],
      ideas: ["Metallic accents", "Modern themes", "Silver decorations", "Contemporary style"],
    },
    {
      years: "25th",
      name: "Silver Anniversary",
      theme: "Precious Moments",
      colors: ["Silver", "White", "Pearl"],
      ideas: ["Silver decorations", "Elegant themes", "Classic style", "Formal celebrations"],
    },
    {
      years: "50th",
      name: "Golden Anniversary",
      theme: "Golden Years",
      colors: ["Gold", "Yellow", "Cream"],
      ideas: ["Gold accents", "Luxury themes", "Grand celebrations", "Family gatherings"],
    },
  ]

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
              Anniversary
              <span className="block bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                Celebration Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Celebrate your love story with our romantic anniversary planning services. From intimate dinners to grand
              celebrations, we help you commemorate your special milestones in style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/search?occasion=anniversary">Find Anniversary Venues</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
              >
                <Link href="/contact">Plan My Anniversary</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Anniversary Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a memorable anniversary celebration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {anniversaryServices.map((service, index) => (
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

      {/* Anniversary Milestones Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Anniversary Milestones</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each anniversary year has its own special meaning and traditional themes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {anniversaryMilestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="text-3xl font-bold text-rose-600 mb-2">{milestone.years}</div>
                    <CardTitle className="text-xl">{milestone.name}</CardTitle>
                    <CardDescription className="text-gray-600">{milestone.theme}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Color Palette</h4>
                      <div className="flex gap-2">
                        {milestone.colors.map((color, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-rose-100 text-rose-800">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Theme Ideas</h4>
                      <ul className="space-y-1">
                        {milestone.ideas.map((idea, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                            {idea}
                          </li>
                        ))}
                      </ul>
                    </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Anniversary Packages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our romantic anniversary celebration packages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {anniversaryPackages.map((pkg, index) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Celebrate Your Love Story?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let us help you create a romantic anniversary celebration that honors your journey together. Start
              planning your perfect anniversary today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/contact?service=anniversary">Plan My Anniversary</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-rose-600 px-8 py-3 rounded-full font-semibold bg-transparent"
              >
                <Link href="/search?occasion=anniversary">Browse Venues</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
