"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ShoppingCart,
  Sparkles,
  Utensils,
  Camera,
  Music,
  Palette,
  Gift,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface PackageBuilderProps {
  venue: any
  onClose?: () => void
  isModal?: boolean
}

const steps = [
  { id: "venue", title: "Venue", icon: Sparkles, color: "text-purple-600" },
  { id: "catering", title: "Catering", icon: Utensils, color: "text-orange-600" },
  { id: "decoration", title: "Decoration", icon: Palette, color: "text-pink-600" },
  { id: "entertainment", title: "Entertainment", icon: Music, color: "text-blue-600" },
  { id: "photography", title: "Photography", icon: Camera, color: "text-green-600" },
  { id: "extras", title: "Extras", icon: Gift, color: "text-indigo-600" },
  { id: "review", title: "Review", icon: ShoppingCart, color: "text-teal-600" },
]

export default function PackageBuilder({ venue, onClose, isModal = false }: PackageBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  type ServiceItem = {
    id: string
    name: string
    price: number
    quantity?: number
    customizations?: Record<string, any>
    [key: string]: any
  }
  
  type PackageData = {
    venue: {
      selected: boolean
      name: any
      price: any
      date: string
      startTime: string
      endTime: string
      guests: number
    }
    catering: {
      selected: boolean
      items: ServiceItem[]
      totalPrice: number
    }
    decoration: {
      selected: boolean
      theme: string
      items: ServiceItem[]
      totalPrice: number
    }
    entertainment: {
      selected: boolean
      items: ServiceItem[]
      totalPrice: number
    }
    photography: {
      selected: boolean
      package: any
      totalPrice: number
      items?: ServiceItem[]
    }
    extras: {
      items: ServiceItem[]
      totalPrice: number
      selected?: boolean
    }
  }
  
  type Category = keyof PackageData
  
  const [packageData, setPackageData] = useState<PackageData>({
    venue: {
      selected: true,
      name: venue.name,
      price: venue.price,
      date: "",
      startTime: "",
      endTime: "",
      guests: 0,
    },
    catering: {
      selected: false,
      items: [],
      totalPrice: 0,
    },
    decoration: {
      selected: false,
      theme: "",
      items: [],
      totalPrice: 0,
    },
    entertainment: {
      selected: false,
      items: [],
      totalPrice: 0,
    },
    photography: {
      selected: false,
      package: null,
      totalPrice: 0,
    },
    extras: {
      items: [],
      totalPrice: 0,
    },
  })
  const [totalPrice, setTotalPrice] = useState(venue.price || 0)
  const [services, setServices] = useState({
    catering: [],
    decoration: [],
    entertainment: [],
    photography: [],
    extras: [],
  })
  const router = useRouter()

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    calculateTotalPrice()
  }, [packageData])

  // Calculate the total price based on selected services and venue
  const calculateTotalPrice = () => {
    let total = packageData.venue.price || 0
    total += packageData.catering.totalPrice || 0
    total += packageData.decoration.totalPrice || 0
    total += packageData.entertainment.totalPrice || 0
    total += packageData.photography.totalPrice || 0
    total += packageData.extras.totalPrice || 0
    setTotalPrice(total)
  }

  const fetchServices = async () => {
    try {
      // TODO: Implement fetching logic here, e.g.:
      // const response = await fetch("/api/services");
      // const data = await response.json();
      // setServices(data);

    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleServiceToggle = (category: Category, service: any, checked: boolean) => {
    setPackageData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        selected: checked || (prev[category] as any).items.length > 0,
        items: checked
          ? [...(prev[category] as any).items, { ...service, quantity: 1 }]
          : (prev[category] as any).items.filter((item: any) => item.id !== service.id),
        totalPrice: checked ? (prev[category] as any).totalPrice + service.price : (prev[category] as any).totalPrice - service.price,
      },
    }))
  }

  const handleQuantityChange = (category: Category, serviceId: string, newQuantity: number) => {
    // Only proceed if the category has items (i.e., not "venue")
    if (!("items" in packageData[category])) return

    setPackageData((prev) => {
      const cat = prev[category] as typeof prev["catering"] // type narrowing
      const items = cat.items.map((item: any) => {
        if (item.id === serviceId) {
          return { ...item, quantity: newQuantity }
        }
        return item
      })

      const totalPrice = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

      return {
        ...prev,
        [category]: {
          ...cat,
          items,
          totalPrice,
        },
      }
    })
  }

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("auth-token")
      if (!token) {
        router.push("/auth/login")
        return
      }

      // Prepare booking data
      type BookingService = {
        type: string
        serviceId: any
        serviceName: any
        quantity: any
        unitPrice: any
        customizations: any
      }

      const bookingData = {
        venueId: venue.id,
        services: [] as BookingService[],
        eventDetails: {
          occasion: "celebration",
          eventDate: packageData.venue.date,
          startTime: packageData.venue.startTime,
          endTime: packageData.venue.endTime,
          guestCount: packageData.venue.guests,
        },
        pricing: {
          subtotal: totalPrice,
          discount: 0,
        },
      }

      // Add selected services
      Object.entries(packageData).forEach(([category, data]: [string, any]) => {
        if (data.selected && data.items) {
          data.items.forEach((item: any) => {
            bookingData.services.push({
              type: category,
              serviceId: item.id,
              serviceName: item.name,
              quantity: item.quantity || 1,
              unitPrice: item.price,
              customizations: item.customizations || {},
            })
          })
        }
      })

      const response = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/checkout/${result.booking.id}`)
      } else {
        alert("Failed to create booking. Please try again.")
      }
    } catch (error) {
      console.error("Error creating booking:", error)
      alert("An error occurred. Please try again.")
    }
  }

  const renderStepContent = () => {
    const step = steps[currentStep]

    switch (step.id) {
      case "venue":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Venue Details</h3>
              <p className="text-gray-600">Configure your venue booking details</p>
            </div>

            <Card className="border-2 border-teal-200 bg-teal-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{venue.name}</h4>
                    <p className="text-gray-600">{venue.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-teal-600">₹{venue.price?.toLocaleString("en-IN")}</div>
                    <div className="text-sm text-gray-600">Base price</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                    <Input
                      type="date"
                      value={packageData.venue.date}
                      onChange={(e) =>
                        setPackageData((prev) => ({
                          ...prev,
                          venue: { ...prev.venue, date: e.target.value },
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                    <Input
                      type="number"
                      placeholder="Enter guest count"
                      value={packageData.venue.guests}
                      onChange={(e) =>
                        setPackageData((prev) => ({
                          ...prev,
                          venue: { ...prev.venue, guests: Number.parseInt(e.target.value) || 0 },
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <Input
                      type="time"
                      value={packageData.venue.startTime}
                      onChange={(e) =>
                        setPackageData((prev) => ({
                          ...prev,
                          venue: { ...prev.venue, startTime: e.target.value },
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <Input
                      type="time"
                      value={packageData.venue.endTime}
                      onChange={(e) =>
                        setPackageData((prev) => ({
                          ...prev,
                          venue: { ...prev.venue, endTime: e.target.value },
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "catering":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Catering Services</h3>
              <p className="text-gray-600">Select delicious food options for your celebration</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.catering.map((service: any) => (
                <Card key={service.id} className="border hover:border-orange-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        <div className="text-xl font-bold text-orange-600">₹{service.price}/person</div>
                      </div>
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        className="w-20 h-20 object-cover rounded-lg ml-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Checkbox
                        checked={packageData.catering.items.some((item: any) => item.id === service.id)}
                        onCheckedChange={(checked) => handleServiceToggle("catering", service, checked as boolean)}
                      />

                      {packageData.catering.items.some((item: any) => item.id === service.id) && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => {
                              const currentItem = packageData.catering.items.find((item: any) => item.id === service.id)
                              if (currentItem && (currentItem.quantity ?? 1) > 1) {
                                handleQuantityChange("catering", service.id, (currentItem.quantity ?? 1) - 1)
                              }
                            }}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {packageData.catering.items.find((item: any) => item.id === service.id)?.quantity || 1}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => {
                              const currentItem = packageData.catering.items.find((item: any) => item.id === service.id)
                              if (currentItem) {
                                handleQuantityChange("catering", service.id, (currentItem.quantity ?? 1) + 1)
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "review":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Package</h3>
              <p className="text-gray-600">Review all selected services before booking</p>
            </div>

            <Card className="border-2 border-teal-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Package Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Venue */}
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <h4 className="font-semibold text-gray-900">{packageData.venue.name}</h4>
                    <p className="text-sm text-gray-600">
                      {packageData.venue.date} • {packageData.venue.guests} guests
                    </p>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    ₹{packageData.venue.price.toLocaleString("en-IN")}
                  </div>
                </div>

                {/* Selected Services */}
                {Object.entries(packageData).map(([category, data]: [string, any]) => {
                  if (category !== "venue" && data.selected && data.items?.length > 0) {
                    return (
                      <div key={category} className="py-3 border-b">
                        <h4 className="font-semibold text-gray-900 mb-2 capitalize">{category}</h4>
                        {data.items.map((item: any) => (
                          <div key={item.id} className="flex justify-between items-center ml-4 mb-1">
                            <span className="text-gray-600">
                              {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                            </span>
                            <span className="text-gray-900">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                  }
                  return null
                })}

                <Separator />

                <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-teal-600">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleBooking}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-teal-600 to-orange-500 hover:from-teal-700 hover:to-orange-600 text-white rounded-xl"
            >
              <ShoppingCart className="h-6 w-6 mr-2" />
              Proceed to Checkout
            </Button>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
            <p className="text-gray-600">This section is under development</p>
          </div>
        )
    }
  }

  const containerClass = isModal
    ? "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    : "min-h-screen bg-gray-50"

  const contentClass = isModal
    ? "bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
    : "container mx-auto px-4 py-8"

  return (
    <div className={containerClass}>
      <div className={contentClass}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Package Builder</h1>
            <p className="text-gray-600">Create your perfect celebration package</p>
          </div>
          {isModal && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index <= currentStep ? "bg-teal-600 border-teal-600 text-white" : "border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${index <= currentStep ? "text-teal-600" : "text-gray-400"}`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${index < currentStep ? "bg-teal-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="p-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-600">Total Package Price</div>
            <div className="text-2xl font-bold text-teal-600">₹{totalPrice.toLocaleString("en-IN")}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
