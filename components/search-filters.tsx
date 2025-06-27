"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

const filterCategories = {
  venueType: ["Banquet Hall", "Resort", "Hotel", "Outdoor Venue", "Community Hall", "Restaurant"],
  amenities: [
    "Parking",
    "Air Conditioning",
    "WiFi",
    "Sound System",
    "Stage",
    "Dance Floor",
    "Catering Kitchen",
    "Bridal Room",
  ],
  cuisine: ["North Indian", "South Indian", "Chinese", "Continental", "Gujarati", "Punjabi", "Bengali", "Rajasthani"],
  serviceType: ["Venues", "Catering", "Decoration", "Photography", "Entertainment", "Cakes"],
}

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const [priceRange, setPriceRange] = useState([
    Number.parseInt(searchParams.get("minPrice") || "10000"),
    Number.parseInt(searchParams.get("maxPrice") || "200000"),
  ])
  const [guestRange, setGuestRange] = useState([
    Number.parseInt(searchParams.get("minGuests") || "50"),
    Number.parseInt(searchParams.get("maxGuests") || "500"),
  ])
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
    venueType: searchParams.get("venueType")?.split(",").filter(Boolean) || [],
    amenities: searchParams.get("amenities")?.split(",").filter(Boolean) || [],
    cuisine: searchParams.get("cuisine")?.split(",").filter(Boolean) || [],
    serviceType: searchParams.get("serviceType")?.split(",").filter(Boolean) || [],
  })

  // Update state when URL params change
  useEffect(() => {
    setPriceRange([
      Number.parseInt(searchParams.get("minPrice") || "10000"),
      Number.parseInt(searchParams.get("maxPrice") || "200000"),
    ])
    setGuestRange([
      Number.parseInt(searchParams.get("minGuests") || "50"),
      Number.parseInt(searchParams.get("maxGuests") || "500"),
    ])
    setSelectedFilters({
      venueType: searchParams.get("venueType")?.split(",").filter(Boolean) || [],
      amenities: searchParams.get("amenities")?.split(",").filter(Boolean) || [],
      cuisine: searchParams.get("cuisine")?.split(",").filter(Boolean) || [],
      serviceType: searchParams.get("serviceType")?.split(",").filter(Boolean) || [],
    })
  }, [searchParams])

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: checked ? [...prev[category], value] : prev[category].filter((item) => item !== value),
    }))
  }

  const removeFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }))
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      venueType: [],
      amenities: [],
      cuisine: [],
      serviceType: [],
    })
    setPriceRange([10000, 200000])
    setGuestRange([50, 500])

    // Clear URL params
    const params = new URLSearchParams(searchParams.toString())
    params.delete("minPrice")
    params.delete("maxPrice")
    params.delete("minGuests")
    params.delete("maxGuests")
    params.delete("venueType")
    params.delete("amenities")
    params.delete("cuisine")
    params.delete("serviceType")

    router.push(`/search?${params.toString()}`)
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Set price range
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    // Set guest range
    params.set("minGuests", guestRange[0].toString())
    params.set("maxGuests", guestRange[1].toString())

    // Set selected filters
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(","))
      } else {
        params.delete(key)
      }
    })

    router.push(`/search?${params.toString()}`)
    setIsOpen(false) // Close mobile filter on apply
  }

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).flat().length
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs sm:text-sm">
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters).map(([category, values]) =>
                values.map((value) => (
                  <Badge key={`${category}-${value}`} variant="secondary" className="flex items-center gap-1 text-xs">
                    {value}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(category, value)} />
                  </Badge>
                )),
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500000}
              min={5000}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-xs sm:text-sm text-gray-600">
              <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
              <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Capacity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Guest Capacity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider value={guestRange} onValueChange={setGuestRange} max={1000} min={10} step={10} className="w-full" />
            <div className="flex justify-between text-xs sm:text-sm text-gray-600">
              <span>{guestRange[0]} guests</span>
              <span>{guestRange[1]} guests</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Service Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filterCategories.serviceType.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`service-${type}`}
                  checked={selectedFilters.serviceType.includes(type)}
                  onCheckedChange={(checked) => handleFilterChange("serviceType", type, checked as boolean)}
                />
                <label
                  htmlFor={`service-${type}`}
                  className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Venue Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Venue Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filterCategories.venueType.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`venue-${type}`}
                  checked={selectedFilters.venueType.includes(type)}
                  onCheckedChange={(checked) => handleFilterChange("venueType", type, checked as boolean)}
                />
                <label
                  htmlFor={`venue-${type}`}
                  className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filterCategories.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={selectedFilters.amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleFilterChange("amenities", amenity, checked as boolean)}
                />
                <label
                  htmlFor={`amenity-${amenity}`}
                  className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={applyFilters}>
        Apply Filters ({getActiveFiltersCount()})
      </Button>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
        </Button>
      </div>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>
    </>
  )
}
