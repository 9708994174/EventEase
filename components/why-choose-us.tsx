"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, Award, Users, Headphones, Sparkles, CheckCircle, Star } from "lucide-react"
import { motion } from "framer-motion"

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "100% Secure & Verified",
      description: "All our venues and vendors are thoroughly verified and background-checked for your safety.",
      stats: "500+ verified partners",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you at every step of your event planning journey.",
      stats: "Average response: 2 minutes",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Award,
      title: "Award-Winning Service",
      description: "Recognized as India's Best Event Planning Platform with multiple industry awards.",
      stats: "15+ industry awards",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: Users,
      title: "Expert Event Coordinators",
      description: "Dedicated event coordinators with 10+ years of experience to make your celebration perfect.",
      stats: "50+ expert coordinators",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Headphones,
      title: "Personalized Planning",
      description: "Customized event planning solutions tailored to your specific needs, preferences, and budget.",
      stats: "100% personalized approach",
      color: "from-teal-500 to-cyan-600",
    },
    {
      icon: Sparkles,
      title: "Transparent Pricing",
      description: "No hidden charges, no surprises. Get detailed pricing breakdown and pay only for what you need.",
      stats: "Zero hidden fees",
      color: "from-rose-500 to-pink-600",
    },
  ]

  const testimonialStats = [
    { number: "4.9/5", label: "Customer Rating", icon: Star },
    { number: "99.8%", label: "Success Rate", icon: CheckCircle },
    { number: "10,000+", label: "Happy Customers", icon: Users },
    { number: "24/7", label: "Support Available", icon: Headphones },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Celebration Concierge?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're not just another event planning platform. We're your trusted partner in creating magical moments that
            last a lifetime.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full mb-6`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>

                  {/* Stats Badge */}
                  <Badge className={`bg-gradient-to-r ${feature.color} text-white font-semibold px-3 py-1`}>
                    {feature.stats}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Trusted by Thousands</h3>
                <p className="text-lg opacity-90">
                  Our numbers speak for themselves. Join the celebration family today!
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {testimonialStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">SSL Secured</h4>
                <p className="text-gray-600 text-sm">Your data is protected with bank-level security</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">ISO Certified</h4>
                <p className="text-gray-600 text-sm">Quality management system certified</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">Money Back Guarantee</h4>
                <p className="text-gray-600 text-sm">100% satisfaction or full refund</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
