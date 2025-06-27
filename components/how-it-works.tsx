"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Users, CheckCircle, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search & Discover",
      description: "Browse through our curated collection of premium venues and services tailored to your needs.",
      details: ["500+ verified venues", "Advanced filters", "Real-time availability", "Instant quotes"],
    },
    {
      icon: Calendar,
      title: "Plan & Customize",
      description: "Use our intelligent package builder to create your perfect celebration with personalized services.",
      details: ["Custom packages", "Expert recommendations", "Budget optimization", "Timeline planning"],
    },
    {
      icon: Users,
      title: "Book & Coordinate",
      description: "Secure your booking with our seamless process and let our experts handle all the coordination.",
      details: ["Secure payments", "Dedicated coordinator", "Vendor management", "Real-time updates"],
    },
    {
      icon: CheckCircle,
      title: "Celebrate & Enjoy",
      description: "Relax and enjoy your perfect celebration while we ensure everything runs smoothly.",
      details: ["On-site support", "Quality assurance", "Emergency backup", "Memory capture"],
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Planning your perfect celebration is easier than ever with our streamlined 4-step process.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6 mt-4">
                      <step.icon className="w-8 h-8 text-purple-600" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                    {/* Details */}
                    <ul className="space-y-2 mb-6">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center justify-center text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-purple-600" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Planning?</h3>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of happy customers who have created unforgettable memories with us. Your perfect
                celebration is just a few clicks away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Link href="/search">
                    <Search className="w-5 h-5 mr-2" />
                    Find Venues Now
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-full font-semibold bg-transparent"
                >
                  <Link href="/contact">
                    <Users className="w-5 h-5 mr-2" />
                    Talk to Expert
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
