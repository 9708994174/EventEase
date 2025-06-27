"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Presentation, Coffee, Award, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CorporateServicesPage() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCorporateVenues()
  }, [])

  const fetchCorporateVenues = async () => {
    try {
      const response = await fetch("/api/search/venues?category=corporate&limit=6")
      if (response.ok) {
        const data = await response.json()
        setVenues(data.venues || [])
      }
    } catch (error) {
      console.error("Error fetching corporate venues:", error)
    } finally {
      setLoading(false)
    }
  }

  const corporateServices = [
    {
      icon: Presentation,
      title: "Conference & Seminars",
      description: "Professional venues equipped with latest AV technology for impactful presentations.",
      features: ["High-speed WiFi", "AV Equipment", "Seating arrangements", "Catering services", "Technical support"],
      price: "Starting from ₹15,000",
    },
    {
      icon: Coffee,
      title: "Corporate Meetings",
      description: "Intimate boardrooms and meeting spaces for productive business discussions.",
      features: ["Boardroom setup", "Video conferencing", "Refreshments", "Parking facilities", "Business center"],
      price: "Starting from ₹5,000",
    },
    {
      icon: Award,
      title: "Award Ceremonies",
      description: "Elegant venues for recognizing achievements and celebrating success.",
      features: ["Stage setup", "Lighting design", "Sound system", "Photography", "Trophy presentation"],
      price: "Starting from ₹25,000",
    },
    {
      icon: Users,
      title: "Team Building Events",
      description: "Engaging venues for team building activities and corporate retreats.",
      features: ["Activity spaces", "Outdoor areas", "Accommodation", "Meal arrangements", "Event coordination"],
      price: "Starting from ₹8,000",
    },
  ]

  const corporatePackages = [
    {
      name: "Business Meeting",
      price: "₹12,000",
      description: "Perfect for small team meetings and presentations",
      features: [
        "Meeting room for 20 people",
        "AV equipment included",
        "High-speed WiFi",
        "Refreshments (tea/coffee)",
        "Parking facilities",
        "4-hour duration",
      ],
      popular: false,
    },
    {
      name: "Corporate Conference",
      price: "₹45,000",
      description: "Comprehensive package for large corporate events",
      features: [
        "Conference hall for 200 people",
        "Professional AV setup",
        "Live streaming capability",
        "Welcome coffee & lunch",
        "Registration desk",
        "Photography coverage",
        "Full-day event",
        "Dedicated coordinator",
      ],
      popular: true,
    },
    {
      name: "Executive Retreat",
      price: "₹85,000",
      description: "Premium package for executive meetings and retreats",
      features: [
        "Luxury resort venue",
        "Multiple meeting rooms",
        "Team building activities",
        "Accommodation (2 days/1 night)",
        "All meals included",
        "Transportation",
        "Spa & recreation",
        "Complete event management",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Corporate Event
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Elevate your business events with our professional corporate event planning services. From intimate board
              meetings to large conferences, we ensure your corporate gatherings are successful and memorable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/search?occasion=corporate">Find Corporate Venues</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
              >
                <Link href="/contact">Request Proposal</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Corporate Event Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional event solutions tailored for your business needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {corporateServices.map((service, index) => (
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
                      <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <Badge className="bg-blue-100 text-blue-800">{service.price}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">{service.description}</CardDescription>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Corporate Packages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our professionally designed corporate event packages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corporatePackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                    pkg.popular ? "ring-2 ring-blue-600 scale-105" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 rounded-t-lg">
                      <Badge className="bg-white text-blue-600">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-blue-600 my-2">{pkg.price}</div>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={`w-full ${
                        pkg.popular
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us for Corporate Events?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We understand the unique requirements of corporate events and deliver professional excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Excellence</h3>
              <p className="text-gray-600">
                Our team understands corporate culture and delivers events that reflect your brand's professionalism.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Timely Execution</h3>
              <p className="text-gray-600">
                We respect your business schedule and ensure all events are executed on time with precision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Support</h3>
              <p className="text-gray-600">
                A dedicated account manager ensures seamless communication and flawless event execution.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Corporate Event?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let us help you create impactful corporate events that drive business success. Get a customized proposal
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/contact?service=corporate">Get Proposal</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-semibold bg-transparent"
              >
                <Link href="/search?occasion=corporate">Browse Venues</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
