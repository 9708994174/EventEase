"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cake, BombIcon as Balloon, Music, Camera } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function BirthdayServicesPage() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBirthdayVenues()
  }, [])

  const fetchBirthdayVenues = async () => {
    try {
      const response = await fetch("/api/search/venues?category=birthday&limit=6")
      if (response.ok) {
        const data = await response.json()
        setVenues(data.venues || [])
      }
    } catch (error) {
      console.error("Error fetching birthday venues:", error)
    } finally {
      setLoading(false)
    }
  }

  const birthdayServices = [
    {
      icon: Balloon,
      title: "Decoration & Theming",
      description: "Transform any space into a magical birthday wonderland with our creative decorations.",
      features: ["Balloon arrangements", "Theme decorations", "Photo backdrops", "Table setups", "Lighting effects"],
      price: "Starting from ₹8,000",
    },
    {
      icon: Music,
      title: "Entertainment & Activities",
      description: "Keep your guests entertained with fun activities and professional entertainers.",
      features: ["DJ services", "Live music", "Games & activities", "Magic shows", "Dance performances"],
      price: "Starting from ₹12,000",
    },
    {
      icon: Cake,
      title: "Catering & Cakes",
      description: "Delicious food and custom birthday cakes to make your celebration extra special.",
      features: ["Custom birthday cakes", "Party snacks", "Beverages", "Themed treats", "Dietary accommodations"],
      price: "Starting from ₹500/person",
    },
    {
      icon: Camera,
      title: "Photography & Memories",
      description: "Capture every precious moment of your birthday celebration with professional photography.",
      features: ["Event photography", "Candid shots", "Group photos", "Digital gallery", "Same-day highlights"],
      price: "Starting from ₹15,000",
    },
  ]

  const birthdayPackages = [
    {
      name: "Kids Birthday Bash",
      price: "₹25,000",
      description: "Perfect package for children's birthday parties",
      features: [
        "Venue for 50 kids + adults",
        "Themed decorations",
        "Entertainment (magic show/games)",
        "Birthday cake (2kg)",
        "Party snacks & beverages",
        "Photography (2 hours)",
        "Party favors for kids",
        "Dedicated coordinator",
      ],
      popular: true,
    },
    {
      name: "Teen Celebration",
      price: "₹35,000",
      description: "Trendy celebration for teenagers",
      features: [
        "Modern venue for 75 guests",
        "DJ & music system",
        "Photo booth setup",
        "Custom birthday cake",
        "Snacks & mocktails",
        "Photography coverage",
        "Social media worthy setup",
        "Event coordination",
      ],
      popular: false,
    },
    {
      name: "Adult Birthday Party",
      price: "₹50,000",
      description: "Elegant celebration for adult birthdays",
      features: [
        "Premium venue for 100 guests",
        "Sophisticated decorations",
        "Live music/DJ",
        "Designer birthday cake",
        "Cocktails & dinner",
        "Professional photography",
        "Personalized touches",
        "Complete event management",
      ],
      popular: false,
    },
  ]

  const ageGroups = [
    {
      title: "Kids (1-12 years)",
      themes: ["Superhero", "Princess", "Cartoon Characters", "Animals", "Space Adventure"],
      activities: ["Magic shows", "Face painting", "Balloon twisting", "Games", "Puppet shows"],
    },
    {
      title: "Teens (13-19 years)",
      themes: ["Music & Dance", "Sports", "Gaming", "Hollywood", "Neon Party"],
      activities: ["DJ party", "Karaoke", "Photo booth", "Dance competition", "Gaming zone"],
    },
    {
      title: "Adults (20+ years)",
      themes: ["Elegant", "Vintage", "Garden Party", "Cocktail Night", "Surprise Party"],
      activities: ["Live music", "Wine tasting", "Networking", "Dancing", "Memory sharing"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 pt-20">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6">
              <Cake className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Birthday Party
              <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Planning Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Make every birthday unforgettable with our comprehensive party planning services. From kids' themed
              parties to elegant adult celebrations, we create magical moments for every age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/search?occasion=birthday">Find Birthday Venues</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
              >
                <Link href="/contact">Plan My Party</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Birthday Party Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create the perfect birthday celebration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {birthdayServices.map((service, index) => (
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
                      <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
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

      {/* Age Groups Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Celebrations for Every Age</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored birthday experiences designed specifically for different age groups.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ageGroups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-gray-900">{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Popular Themes</h4>
                      <div className="flex flex-wrap gap-2">
                        {group.themes.map((theme, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-pink-100 text-pink-800">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Activities</h4>
                      <ul className="space-y-2">
                        {group.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                            {activity}
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Birthday Packages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our specially designed birthday party packages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {birthdayPackages.map((pkg, index) => (
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
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-2 rounded-t-lg">
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
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
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
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan an Amazing Birthday Party?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let us help you create magical birthday memories that will last a lifetime. Start planning today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/contact?service=birthday">Plan My Party</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-pink-600 px-8 py-3 rounded-full font-semibold bg-transparent"
              >
                <Link href="/search?occasion=birthday">Browse Venues</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
