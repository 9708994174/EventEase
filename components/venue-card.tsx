"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, MapPin, Users, Wifi, Car, Utensils, Snowflake } from "lucide-react"

interface Venue {
  id: string
  name: string
  location: string
  rating: number
  reviewCount: number
  price: number
  priceUnit: string
  capacity: string
  image: string
  amenities: string[]
  type: string
}

interface VenueCardProps {
  venue: Venue
  viewMode?: "grid" | "list"
}

const amenityIcons: { [key: string]: any } = {
  Parking: Car,
  AC: Snowflake,
  WiFi: Wifi,
  Catering: Utensils,
  Veg: "🥗",
  "Non-Veg": "🍖",
  Jain: "🌱",
  "Live Counter": "👨‍🍳",
  Floral: "🌸",
  Lighting: "💡",
  Stage: "🎭",
  Backdrop: "🎨",
}

export default function VenueCard({ venue, viewMode = "grid" }: VenueCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
    // Here you would make API call to add/remove from wishlist
  }

  const formatPrice = (price: number, unit: string) => {
    return `₹${price.toLocaleString("en-IN")}${unit === "person" ? "/person" : unit === "event" ? "/event" : "/package"}`
  }

  if (viewMode === "list") {
    return (
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-64 h-48 sm:h-40 flex-shrink-0">
            <img
              src={venue.image || "/placeholder.svg"}
              alt={venue.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWishlist}
              className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white w-8 h-8 sm:w-10 sm:h-10"
            >
              <Heart
                className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </Button>

            {/* Type Badge */}
            <Badge className="absolute top-3 left-3 bg-teal-600 hover:bg-teal-700 text-xs">{venue.type}</Badge>
          </div>

          <CardContent className="flex-1 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between h-full">
              <div className="flex-1 space-y-2 sm:space-y-3">
                {/* Title and Location */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                    {venue.name}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {venue.location}
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium text-sm sm:text-base">{venue.rating}</span>
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm">({venue.reviewCount} reviews)</span>
                </div>

                {/* Capacity */}
                <div className="flex items-center text-gray-600 text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  {venue.capacity}
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {venue.amenities.slice(0, 4).map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity]
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                      >
                        {typeof IconComponent === "string" ? (
                          <span>{IconComponent}</span>
                        ) : IconComponent ? (
                          <IconComponent className="h-3 w-3" />
                        ) : null}
                        <span>{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center mt-4 sm:mt-0 sm:ml-4">
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-teal-600">
                    {formatPrice(venue.price, venue.priceUnit)}
                  </div>
                  <div className="text-xs text-gray-500">Starting price</div>
                </div>

                <Link href={`/venue/${venue.id}`}>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white mt-2 sm:mt-3">View Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={venue.image || "/placeholder.svg"}
          alt={venue.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white w-8 h-8 sm:w-10 sm:h-10"
        >
          <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </Button>

        {/* Type Badge */}
        <Badge className="absolute top-3 left-3 bg-teal-600 hover:bg-teal-700 text-xs">{venue.type}</Badge>
      </div>

      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Title and Location */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
              {venue.name}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {venue.location}
            </div>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 font-medium text-sm sm:text-base">{venue.rating}</span>
            </div>
            <span className="text-gray-500 text-xs sm:text-sm">({venue.reviewCount} reviews)</span>
          </div>

          {/* Capacity */}
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="h-4 w-4 mr-1" />
            {venue.capacity}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {venue.amenities.slice(0, 4).map((amenity, index) => {
              const IconComponent = amenityIcons[amenity]
              return (
                <div
                  key={index}
                  className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                >
                  {typeof IconComponent === "string" ? (
                    <span>{IconComponent}</span>
                  ) : IconComponent ? (
                    <IconComponent className="h-3 w-3" />
                  ) : null}
                  <span>{amenity}</span>
                </div>
              )
            })}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-teal-600">
                {formatPrice(venue.price, venue.priceUnit)}
              </div>
              <div className="text-xs text-gray-500">Starting price</div>
            </div>

            <Link href={`/venue/${venue.id}`}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
