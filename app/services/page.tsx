"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Building,
  Cake,
  Camera,
  Music,
  Palette,
  Utensils,
  Gift,
  Search,
  Star,
  ArrowRight,
  Calendar,
} from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    id: "wedding",
    title: "Wedding Planning",
    description: "Complete wedding planning services from engagement to reception",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    features: ["Venue Selection", "Catering", "Photography", "Decoration", "Entertainment"],
    startingPrice: "₹50,000",
    popular: true,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    description: "Professional corporate event planning and management",
    icon: Building,
    color: "from-blue-500 to-indigo-500",
    features: ["Conference Planning", "Team Building", "Product Launches", "Award Ceremonies"],
    startingPrice: "₹25,000",
    popular: false,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "birthday",
    title: "Birthday Parties",
    description: "Memorable birthday celebrations for all ages",
    icon: Cake,
    color: "from-yellow-500 to-orange-500",
    features: ["Theme Decoration", "Entertainment", "Catering", "Photography"],
    startingPrice: "₹15,000",
    popular: true,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "photography",
    title: "Photography Services",
    description: "Professional photography for all your special moments",
    icon: Camera,
    color: "from-green-500 to-emerald-500",
    features: ["Event Photography", "Pre-wedding Shoots", "Candid Photography", "Video Coverage"],
    startingPrice: "₹10,000",
    popular: false,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Live entertainment and music for your celebrations",
    icon: Music,
    color: "from-purple-500 to-violet-500",
    features: ["Live Bands", "DJ Services", "Dancers", "Anchoring"],
    startingPrice: "₹8,000",
    popular: false,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "decoration",
    title: "Decoration Services",
    description: "Beautiful decorations to transform your venue",
    icon: Palette,
    color: "from-teal-500 to-cyan-500",
    features: ["Floral Arrangements", "Lighting", "Stage Setup", "Theme Decoration"],
    startingPrice: "₹12,000",
    popular: true,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "catering",
    title: "Catering Services",
    description: "Delicious food and beverages for your guests",
    icon: Utensils,
    color: "from-red-500 to-pink-500",
    features: ["Multi-cuisine Options", "Live Counters", "Beverages", "Desserts"],
    startingPrice: "₹500/person",
    popular: true,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "anniversary",
    title: "Anniversary Celebrations",
    description: "Romantic and memorable anniversary celebrations",
    icon: Gift,
    color: "from-rose-500 to-pink-500",
    features: ["Romantic Setup", "Special Dining", "Photography", "Surprise Elements"],
    startingPrice: "₹20,000",
    popular: false,
    image: "/placeholder.svg?height=300&width=400",
  },
]

const testimonials = [
  {
    name: "Priya & Raj",
    service: "Wedding Planning",
    rating: 5,
    comment: "Celebration Concierge made our dream wedding come true! Every detail was perfect.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Tech Corp",
    service: "Corporate Event",
    rating: 5,
    comment: "Professional service and flawless execution for our annual conference.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Anita Sharma",
    service: "Birthday Party",
    rating: 5,
    comment: "My daughter's birthday party was magical! Thank you for the amazing decoration.",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.id === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", name: "All Services" },
    { id: "wedding", name: "Weddings" },
    { id: "corporate", name: "Corporate" },
    { id: "birthday", name: "Birthdays" },
    { id: "photography", name: "Photography" },
    { id: "entertainment", name: "Entertainment" },
    { id: "decoration", name: "Decoration" },
    { id: "catering", name: "Catering" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed">
              From intimate gatherings to grand celebrations, we offer comprehensive event planning services to make
              your special moments unforgettable.
            </p>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`text-xs sm:text-sm ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        : "bg-transparent hover:bg-purple-50"
                    }`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />

                    {service.popular && (
                      <Badge className="absolute top-3 right-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                        Popular
                      </Badge>
                    )}

                    <div className="absolute bottom-4 left-4 text-white">
                      <service.icon className="w-8 h-8 sm:w-10 sm:h-10 mb-2" />
                      <h3 className="text-lg sm:text-xl font-bold">{service.title}</h3>
                    </div>
                  </div>

                  <CardContent className="p-4 sm:p-6">
                    <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">{service.description}</p>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {service.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{service.features.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">Starting from</p>
                          <p className="text-lg sm:text-xl font-bold text-purple-600">{service.startingPrice}</p>
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          <Link href={`/services/${service.id}`}>
                            View Details
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-600">Events Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-sm sm:text-base text-gray-600">Service Partners</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-sm sm:text-base text-gray-600">Happy Customers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">4.9★</div>
              <div className="text-sm sm:text-base text-gray-600">Average Rating</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base italic">"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Plan Your Perfect Event?
            </h2>
            <p className="text-lg sm:text-xl text-purple-100 mb-8 sm:mb-10">
              Let our expert team help you create unforgettable memories. Get started with a free consultation today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 h-12 sm:h-14"
              >
                <Link href="/contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Consultation
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 h-12 sm:h-14 bg-transparent"
              >
                <Link href="/search">
                  <Search className="w-5 h-5 mr-2" />
                  Browse Venues
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
