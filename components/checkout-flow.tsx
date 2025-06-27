"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Shield,
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  User,
} from "lucide-react"

interface CheckoutFlowProps {
  bookingId: string
}

const paymentMethods = [
  {
    id: "upi",
    name: "UPI",
    description: "Pay using UPI apps like GPay, PhonePe, Paytm",
    icon: Smartphone,
    popular: true,
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, RuPay cards accepted",
    icon: CreditCard,
    popular: false,
  },
  {
    id: "netbanking",
    name: "Net Banking",
    description: "All major banks supported",
    icon: Building,
    popular: false,
  },
  {
    id: "wallet",
    name: "Digital Wallets",
    description: "Paytm, PhonePe, Amazon Pay",
    icon: Wallet,
    popular: false,
  },
]

export default function CheckoutFlow({ bookingId }: CheckoutFlowProps) {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    specialRequests: "",
  })
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [processing, setProcessing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchBookingDetails()
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

        // Pre-fill customer details if available
        if (data.booking.user) {
          setCustomerDetails((prev) => ({
            ...prev,
            name: data.booking.user.name || "",
            email: data.booking.user.email || "",
            phone: data.booking.user.phone || "",
          }))
        }
      } else {
        router.push("/404")
      }
    } catch (error) {
      console.error("Error fetching booking:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return

    try {
      const response = await fetch("/api/promo/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: promoCode,
          bookingAmount: booking.pricing.total,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setPromoDiscount(data.discount)
        alert(`Promo code applied! You saved ₹${data.discount}`)
      } else {
        alert("Invalid promo code")
      }
    } catch (error) {
      console.error("Error applying promo code:", error)
      alert("Failed to apply promo code")
    }
  }

  const handlePayment = async () => {
    if (!agreeToTerms) {
      alert("Please accept the terms and conditions")
      return
    }

    setProcessing(true)

    try {
      // Update booking with customer details
      const token = localStorage.getItem("auth-token")
      await fetch(`/api/bookings/${bookingId}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerDetails,
          promoDiscount,
          paymentMethod,
        }),
      })

      // Create payment order
      const paymentResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId,
          amount: booking.pricing.total - promoDiscount,
          paymentMethod,
        }),
      })

      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json()

        // Simulate payment gateway integration
        // In production, you would integrate with Razorpay, Stripe, etc.
        setTimeout(() => {
          router.push(`/booking-confirmation/${bookingId}`)
        }, 2000)
      } else {
        alert("Payment failed. Please try again.")
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setProcessing(false)
    }
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

  const finalAmount = booking.pricing.total - promoDiscount

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
            <p className="text-gray-600">Complete your booking in a few simple steps</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Customer Details */}
            <Card className="border-2 border-teal-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  Customer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter your address"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="requests" className="mb-2 block">
                    Special Requests
                  </Label>
                  <Textarea
                    id="requests"
                    value={customerDetails.specialRequests}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, specialRequests: e.target.value }))}
                    placeholder="Any special requirements or requests..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Payment Method */}
            <Card className="border-2 border-orange-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <method.icon className="h-6 w-6 text-gray-600" />
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer">
                            <span className="font-medium">{method.name}</span>
                            {method.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </Label>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">Secure Payment</p>
                    <p className="text-blue-700">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                  />
                  <div className="text-sm">
                    <Label htmlFor="terms" className="cursor-pointer">
                      I agree to the{" "}
                      <a href="/terms" className="text-teal-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-teal-600 hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event Details */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Event Details</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(booking.eventDetails.eventDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{booking.eventDetails.guestCount} guests</span>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Selected Services</h4>
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

                {/* Promo Code */}
                <div className="space-y-2">
                  <Label>Promo Code</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  {promoDiscount > 0 && (
                    <p className="text-sm text-green-600">
                      ✓ Promo applied! You saved ₹{promoDiscount.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{booking.pricing.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>₹{(booking.pricing.taxes + booking.pricing.serviceCharges).toLocaleString("en-IN")}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{promoDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-teal-600">₹{finalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={processing || !agreeToTerms}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-teal-600 to-orange-500 hover:from-teal-700 hover:to-orange-600"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Pay ₹{finalAmount.toLocaleString("en-IN")}
                    </div>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By proceeding, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
