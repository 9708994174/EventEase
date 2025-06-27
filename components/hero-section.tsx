"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Search, Sparkles, Heart, Star } from "lucide-react"
import { motion } from "framer-motion"

const occasions = [
  "Wedding",
  "Birthday Party",
  "Anniversary",
  "Corporate Event",
  "Baby Shower",
  "Engagement",
  "Graduation",
  "Festival Celebration",
]

const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"]

export default function HeroSection() {
  const [searchData, setSearchData] = useState({
    occasion: "",
    location: "",
    date: "",
    guests: "",
  })
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchData.occasion) params.set("occasion", searchData.occasion)
    if (searchData.location) params.set("location", searchData.location)
    if (searchData.date) params.set("date", searchData.date)
    if (searchData.guests) params.set("guests", searchData.guests)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 text-white/10"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        >
          <Heart className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 text-white/10"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <Star className="w-6 h-6" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/3 text-white/10"
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xs font-bold text-white mb-6 leading-tight">
              
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                 Your Celebration Our Passion
              </span>
            
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-1xs text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From intimate gatherings to grand celebrations, we bring your vision to life with our comprehensive event
            planning services.
          </motion.p>

          {/* Search Form */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Occasion
                </label>
                <Select
                  value={searchData.occasion}
                  onValueChange={(value) => setSearchData((prev) => ({ ...prev, occasion: value }))}
                >
                  <SelectTrigger className="bg-white/20 border-white/30 text-white placeholder:text-white/60">
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {occasions.map((occasion) => (
                      <SelectItem key={occasion} value={occasion.toLowerCase()}>
                        {occasion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <Select
                  value={searchData.location}
                  onValueChange={(value) => setSearchData((prev) => ({ ...prev, location: value }))}
                >
                  <SelectTrigger className="bg-white/20 border-white/30 text-white placeholder:text-white/60">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </label>
                <Input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData((prev) => ({ ...prev, date: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Guests
                </label>
                <Input
                  type="number"
                  placeholder="Number of guests"
                  value={searchData.guests}
                  onChange={(e) => setSearchData((prev) => ({ ...prev, guests: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  min="1"
                />
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Search className="w-5 h-5 mr-2" />
              Find My Perfect Venue
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300 text-sm">Premium Venues</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-300 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300 text-sm">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-gray-300 text-sm">Average Rating</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}
