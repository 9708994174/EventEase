"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, MapPin, Star, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function FeaturedCategories() {
  const categories = [
    {
      id: "wedding",
      title: "Wedding Celebrations",
      description: "Create your dream wedding with our premium venues and comprehensive planning services.",
      image: "/placeholder.svg?height=400&width=600",
      price: "Starting from ₹2,50,000",
      venues: "150+ venues",
      rating: 4.9,
      popular: true,
      features: ["Bridal Suite", "Catering", "Decoration", "Photography"],
      gradient: "from-rose-500 to-pink-600",
    },
    {
      id: "corporate",
      title: "Corporate Events",
      description: "Professional venues and services for conferences, seminars, and corporate celebrations.",
      image: "/placeholder.svg?height=400&width=600",
      price: "Starting from ₹50,000",
      venues: "80+ venues",
      rating: 4.8,
      popular: false,
      features: ["AV Equipment", "Business Center", "Catering", "Parking"],
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      id: "birthday",
      title: "Birthday Parties",
      description: "Make birthdays special with themed decorations, entertainment, and memorable experiences.",
      image: "/placeholder.svg?height=400&width=600",
      price: "Starting from ₹15,000",
      venues: "200+ venues",
      rating: 4.9,
      popular: true,
      features: ["Theme Decoration", "Entertainment", "Cake", "Photography"],
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      id: "anniversary",
      title: "Anniversary Celebrations",
      description: "Celebrate love and milestones with romantic settings and personalized experiences.",
      image: "/placeholder.svg?height=400&width=600",
      price: "Starting from ₹25,000",
      venues: "120+ venues",
      rating: 4.8,
      popular: false,
      features: ["Romantic Setup", "Live Music", "Special Menu", "Photography"],
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: "baby-shower",
      title: "Baby Showers",
      description: "Welcome new arrivals with beautiful baby shower celebrations and thoughtful arrangements.",
      image: "/placeholder.svg?height=400&width=600",
      price: "Starting from ₹20,000",
      venues: "90+ venues",
      rating: 4.7,
      popular: false,
      features: ["Baby Theme", "Games", "Catering", "Gifts"],
      gradient: "from-green-500 to-teal-600",
    },
    {
      id: "engagement",
      title: "Engagement Parties",
      description: "Begin your journey together with elegant engagement celebrations and beautiful memories.",
      image: "/placeholder.svg?height=400&width=600",
      price: "Starting from ₹40,000",
      venues: "110+ venues",
      rating: 4.8,
      popular: true,
      features: ["Ring Ceremony", "Photography", "Catering", "Decoration"],
      gradient: "from-indigo-500 to-purple-600",
    },
  ]

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Celebration Categories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we have the perfect venues and services for every occasion.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60`}></div>

                  {/* Overlay Content */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    {category.popular && <Badge className="bg-white/90 text-gray-900 font-semibold">🔥 Popular</Badge>}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span className="font-semibold">{category.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{category.venues}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{category.price}</div>
                      <div className="text-sm text-gray-500">Per event</div>
                    </div>
                    <Button
                      asChild
                      className={`bg-gradient-to-r ${category.gradient} hover:opacity-90 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
                    >
                      <Link href={`/services/${category.id}`}>
                        Explore
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
          >
            <Link href="/search">
              <Calendar className="w-5 h-5 mr-2" />
              View All Categories
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
