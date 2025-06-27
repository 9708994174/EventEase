"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, MapPin, Users, Phone, Mail, Download, Share2, Home, Star } from "lucide-react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

interface BookingConfirmationProps {
  bookingId: string
}

export default function BookingConfirmation({ bookingId }: BookingConfirmationProps) {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchBookingDetails()
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [bookingId])

  const fetchBookingDetails = async () => {
    try {
      const token = localStorage.getItem("auth-token")
      const response = await fetch(`/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setBooking(data.booking)
      } else {
        router.push("/404")
      }
    } catch (error) {
      console.error("Error fetching booking:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: "My Celebration Booking Confirmed!",
      text: `I just booked ${booking.venue?.name || "a celebration package"} through Celebration Concierge!`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const downloadInvoice = () => {
    // In production, this would generate and download a PDF invoice
    alert("Invoice download will be available soon!")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking not found</h1>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h1>
            <p className="text-xl text-gray-600">
              Your celebration is all set. We can't wait to make it unforgettable!
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg">Booking ID: {booking.bookingId}</Badge>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-lg">
              Status: {booking.status.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
        </motion.div>

        {/* Booking Details */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Event Details */}
          <Card className="border-2 border-teal-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Date</label>
                  <p className="text-gray-900 font-semibold">
                    {new Date(booking.eventDetails.eventDate).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Time</label>
                  <p className="text-gray-900 font-semibold">
                    {booking.eventDetails.startTime} - {booking.eventDetails.endTime}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Guests</label>
                  <p className="text-gray-900 font-semibold flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {booking.eventDetails.guestCount}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Occasion</label>
                  <p className="text-gray-900 font-semibold capitalize">{booking.eventDetails.occasion}</p>
                </div>
              </div>

              {booking.venue && (
                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-600">Venue</label>
                  <div className="mt-1">
                    <p className="text-gray-900 font-semibold">{booking.venue.name}</p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {booking.venue.location.address}, {booking.venue.location.city}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-2 border-orange-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-orange-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Your Details</label>
                <div className="mt-1 space-y-1">
                  <p className="text-gray-900 font-semibold">{booking.user.name}</p>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {booking.user.email}
                  </p>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {booking.user.phone}
                  </p>
                </div>
              </div>

              {booking.venue?.contact && (
                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-600">Venue Contact</label>
                  <div className="mt-1 space-y-1">
                    <p className="text-gray-600 flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {booking.venue.contact.phone}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {booking.venue.contact.email}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-gray-600">Our Support</label>
                <div className="mt-1 space-y-1">
                  <p className="text-gray-600 flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    +91 98765 43210
                  </p>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    support@celebrationconcierge.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Services & Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-2 border-purple-100 mb-8">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Services */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Selected Services</h4>
                  {booking.services.map((service: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">{service.serviceName}</p>
                        <p className="text-sm text-gray-600">
                          {service.type} • Qty: {service.quantity}
                        </p>
                      </div>
                      <span className="font-medium">
                        ₹{(service.unitPrice * service.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{booking.pricing.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>₹{(booking.pricing.taxes + booking.pricing.serviceCharges).toLocaleString("en-IN")}</span>
                  </div>
                  {booking.pricing.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{booking.pricing.discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Paid</span>
                    <span className="text-teal-600">₹{booking.pricing.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Payment Status</span>
                    <Badge className="bg-green-100 text-green-800">{booking.payment.status.toUpperCase()}</Badge>
                  </div>
                  {booking.payment.transactionId && (
                    <p className="text-sm text-gray-600 mt-1">Transaction ID: {booking.payment.transactionId}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button onClick={downloadInvoice} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download Invoice
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            Share Booking
          </Button>
          <Button onClick={() => router.push("/dashboard")} className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Button>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-teal-50 to-orange-50 border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Confirmation Email</h4>
                  <p className="text-gray-600 text-sm">
                    You'll receive a detailed confirmation email with all booking information
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Vendor Coordination</h4>
                  <p className="text-gray-600 text-sm">Our team will coordinate with all vendors for your event</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Event Day Support</h4>
                  <p className="text-gray-600 text-sm">24/7 support available on your special day</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
