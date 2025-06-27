"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Award, Users, Clock, CheckCircle, Star, Heart, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function TrustIndicators() {
  const certifications = [
    {
      icon: Shield,
      title: "SSL Secured",
      description: "Bank-level security for all transactions",
      badge: "Verified",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Award,
      title: "ISO 9001:2015",
      description: "Quality management system certified",
      badge: "Certified",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: CheckCircle,
      title: "GDPR Compliant",
      description: "Data protection and privacy assured",
      badge: "Compliant",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Star,
      title: "Google Verified",
      description: "Verified business on Google My Business",
      badge: "Verified",
      color: "from-yellow-500 to-orange-600",
    },
  ]

  const partnerships = [
    { name: "Razorpay", logo: "/placeholder.svg?height=60&width=120", description: "Secure Payment Partner" },
    { name: "AWS", logo: "/placeholder.svg?height=60&width=120", description: "Cloud Infrastructure" },
    { name: "Google Cloud", logo: "/placeholder.svg?height=60&width=120", description: "Data Analytics" },
    { name: "Microsoft", logo: "/placeholder.svg?height=60&width=120", description: "Business Solutions" },
    { name: "Salesforce", logo: "/placeholder.svg?height=60&width=120", description: "CRM Platform" },
    { name: "Twilio", logo: "/placeholder.svg?height=60&width=120", description: "Communication APIs" },
  ]

  const awards = [
    {
      year: "2024",
      title: "Best Event Planning Platform",
      organization: "India Digital Awards",
      icon: Award,
    },
    {
      year: "2023",
      title: "Customer Choice Award",
      organization: "Business Excellence Awards",
      icon: Users,
    },
    {
      year: "2023",
      title: "Innovation in Technology",
      organization: "Tech Innovation Summit",
      icon: Sparkles,
    },
    {
      year: "2022",
      title: "Startup of the Year",
      organization: "Indian Startup Awards",
      icon: Star,
    },
  ]

  const guarantees = [
    {
      icon: Heart,
      title: "100% Satisfaction Guarantee",
      description: "Love your event or get your money back",
    },
    {
      icon: Clock,
      title: "On-Time Delivery Promise",
      description: "We guarantee timely execution of all services",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "All vendors are verified and quality-checked",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal event coordinator for every booking",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted & Certified</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trust is our priority. We maintain the highest standards of security, quality, and service excellence.
          </p>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {certifications.map((cert, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${cert.color} rounded-full mb-4`}
                >
                  <cert.icon className="w-6 h-6 text-white" />
                </div>
                <Badge className={`mb-3 bg-gradient-to-r ${cert.color} text-white`}>{cert.badge}</Badge>
                <h3 className="font-bold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Partnerships */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Trusted Technology Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partnerships.map((partner, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 rounded-lg p-4 mb-2 group-hover:bg-gray-100 transition-colors duration-300">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="w-full h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <p className="text-xs text-gray-500">{partner.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Awards & Recognition</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-4">
                    <award.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="mb-3 bg-yellow-100 text-yellow-800">{award.year}</Badge>
                  <h4 className="font-bold text-gray-900 mb-2">{award.title}</h4>
                  <p className="text-gray-600 text-sm">{award.organization}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Promises to You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                      <guarantee.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">{guarantee.title}</h4>
                    <p className="text-sm opacity-90">{guarantee.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
