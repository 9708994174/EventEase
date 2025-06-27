"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  MapPin,
  Users,
  Phone,
  Mail,
  Globe,
  Heart,
  Share2,
  Wifi,
  Car,
  Utensils,
  Music,
  Camera,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"
import PackageBuilder from "@/components/package-builder"
import ReviewSection from "@/components/review-section"
import ImageGallery from "@/components/image-gallery"

interface VenueDetailProps {
  venueId: string
}

export default function VenueDetail({ venueId }: VenueDetailProps) {
  const [venue, setVenue] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showPackageBuilder, setShowPackageBuilder] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchVenueDetails()
  }, [venueId])

  const fetchVenueDetails = async () => {
    try {
      const response = await fetch(`/api/venues/${venueId}`)
      if (response.ok) {
        const data = await response.json()
        setVenue(data.venue)
      } else {
        router.push("/404")
      }
    } catch (error) {
      console.error("Error fetching venue:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem("auth-token")
      if (!token) {
        router.push("/auth/login")
        return
      }

      const response = await fetch("/api/users/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          entityId: venueId,
          entityType: "venue",
        }),
      })

      if (response.ok) {
        setIsWishlisted(!isWishlisted)
      }
    } catch (error) {
      console.error("Error updating wishlist:", error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: venue?.name,
          text: `Check out ${venue?.name} on Celebration Concierge`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Venue not found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const amenityIcons: { [key: string]: any } = {
    Parking: Car,
    WiFi: Wifi,
    Catering: Utensils,
    "Music System": Music,
    Photography: Camera,
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Gallery */}
      <div className="relative h-96 md:h-[500px]">
        <ImageGallery images={venue.images || []} />

        {/* Overlay Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleWishlist}
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleShare}
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        {/* Venue Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{venue.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{venue.location}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{venue.rating}</span>
                    <span className="text-gray-300">({venue.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-5 w-5" />
                    <span>{venue.capacity}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-right text-white">
                  <div className="text-3xl font-bold text-yellow-400">₹{venue.price?.toLocaleString("en-IN")}</div>
                  <div className="text-sm opacity-90">Starting price</div>
                </div>
                <Button
                  onClick={() => setShowPackageBuilder(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-xl"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Build My Package
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white border rounded-xl p-1">
            <TabsTrigger value="overview" className="rounded-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="packages" className="rounded-lg">
              Packages
            </TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-lg">
              Gallery
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="contact" className="rounded-lg">
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Venue</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{venue.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {venue.features?.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {venue.amenities?.map((amenity: string, index: number) => {
                        const IconComponent = amenityIcons[amenity]
                        return (
                          <div key={index} className="flex items-center gap-2 text-gray-600">
                            {IconComponent && <IconComponent className="h-4 w-4 text-teal-600" />}
                            <span className="text-sm">{amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages">
            <PackageBuilder venue={venue} />
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {venue.images?.map((image: string, index: number) => (
                <motion.div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${venue.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewSection venueId={venueId} />
          </TabsContent>

          <TabsContent value="contact">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-600">{venue.contact?.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-600">{venue.contact?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-600">{venue.contact?.website}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                    <div className="bg-gray-100 rounded-xl p-4">
                      <p className="text-gray-600">{venue.fullAddress}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Package Builder Modal */}
      {showPackageBuilder && (
        <PackageBuilder venue={venue} onClose={() => setShowPackageBuilder(false)} isModal={true} />
      )}
    </div>
  )
}
