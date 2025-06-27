"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Calendar, CreditCard, PartyPopper, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    step: 1,
    title: "Search & Discover",
    description:
      "Browse through our extensive collection of venues and services. Use filters to find exactly what you need for your event.",
    icon: Search,
    color: "from-blue-500 to-indigo-500",
  },
  {
    step: 2,
    title: "Book & Customize",
    description:
      "Select your preferred venue and customize your package with additional services like catering, decoration, and photography.",
    icon: Calendar,
    color: "from-green-500 to-emerald-500",
  },
  {
    step: 3,
    title: "Secure Payment",
    description:
      "Make secure payments through our platform. Pay in installments or full amount as per your convenience.",
    icon: CreditCard,
    color: "from-purple-500 to-violet-500",
  },
  {
    step: 4,
    title: "Celebrate",
    description:
      "Relax and enjoy your event! Our partners will handle all the arrangements while you create beautiful memories.",
    icon: PartyPopper,
    color: "from-pink-500 to-rose-500",
  },
]

const benefits = [
  "Verified venues and service providers",
  "Transparent pricing with no hidden costs",
  "24/7 customer support",
  "Secure payment gateway",
  "Easy cancellation and refund policy",
  "Professional event coordination",
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              How It <span className="gradient-text">Works</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Planning your perfect event is just 4 simple steps away. Let us guide you through the process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative"
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="pt-8 pb-6">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-blue-500 font-bold text-sm">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-blue-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Celebration Concierge?</h2>
            <p className="text-gray-600">We make event planning simple, secure, and stress-free</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Planning?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of happy customers who trusted us with their special events
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Search className="w-5 h-5 mr-2" />
                  Start Planning
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Get Expert Help
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
