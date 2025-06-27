"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Users, Star, IndianRupee, ArrowRight, Trash2 } from "lucide-react"

interface WishlistItem {
  id: string
  name: string
  location: string
  price: number
  rating: number
  images: string[]
  capacity: string
  category: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("auth-token")
        if (!token) {
          setLoading(false)
          return
        }

        const response = await fetch("/api/users/me/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setWishlistItems(data.wishlist || [])
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [])

  const removeFromWishlist = async (venueId: string) => {
    try {
      const token = localStorage.getItem("auth-token")
      const response = await fetch("/api/users/me/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ venueId }),
      })

      if (response.ok) {
        setWishlistItems((items) => items.filter((item) => item.id !== venueId))
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center mb-8">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          ) : wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.images[0] || "/placeholder.svg?height=200&width=300"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 w-8 p-0"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-800">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {item.rating}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{item.capacity}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-600">{item.price.toLocaleString("en-IN")}</span>
                        </div>
                        <Link href={`/venue/${item.id}`}>
                          <Button size="sm">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Start adding venues you love to your wishlist!</p>
              <Link href="/search">
                <Button>Browse Venues</Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
