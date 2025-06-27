"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      id: 1,
      name: "Priya & Rahul Sharma",
      event: "Wedding Celebration",
      location: "Mumbai",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Celebration Concierge made our dream wedding come true! From venue selection to the last dance, everything was perfect. Their attention to detail and professional coordination exceeded our expectations.",
      venue: "The Grand Ballroom, Mumbai",
      guests: 350,
      date: "December 2023",
      videoUrl: "#",
    },
    {
      id: 2,
      name: "Anita Desai",
      event: "50th Birthday Party",
      location: "Delhi",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      content:
        "What an incredible celebration! The team understood exactly what I wanted for my milestone birthday. The decoration, entertainment, and coordination were flawless. Highly recommended!",
      venue: "Luxury Garden Resort, Delhi",
      guests: 120,
      date: "November 2023",
      videoUrl: "#",
    },
    {
      id: 3,
      name: "TechCorp Solutions",
      event: "Annual Conference",
      location: "Bangalore",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Professional, efficient, and reliable. Celebration Concierge handled our corporate event with utmost professionalism. The venue was perfect and all technical requirements were met seamlessly.",
      venue: "Convention Center, Bangalore",
      guests: 500,
      date: "October 2023",
      videoUrl: "#",
    },
    {
      id: 4,
      name: "Meera & Vikram",
      event: "25th Anniversary",
      location: "Chennai",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Celebrating our silver jubilee was made special by the wonderful team. They created a romantic atmosphere that brought back memories of our wedding day. Thank you for making it magical!",
      venue: "Beachside Resort, Chennai",
      guests: 80,
      date: "September 2023",
      videoUrl: "#",
    },
    {
      id: 5,
      name: "Kavya Reddy",
      event: "Baby Shower",
      location: "Hyderabad",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      content:
        "The baby shower was absolutely beautiful! Every detail was thoughtfully planned, from the decorations to the games. All my guests were impressed with the organization and creativity.",
      venue: "Garden Pavilion, Hyderabad",
      guests: 60,
      date: "August 2023",
      videoUrl: "#",
    },
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real stories from real celebrations. See why thousands trust us with their special moments.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Testimonial Content */}
              <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-lg">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center mb-6">
                    <Quote className="w-8 h-8 text-yellow-400 mr-3" />
                    <div className="flex">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-lg md:text-xl leading-relaxed mb-8 text-gray-100">
                    "{currentTestimonial.content}"
                  </blockquote>

                  <div className="flex items-center mb-6">
                    <Avatar className="w-16 h-16 mr-4">
                      <AvatarImage src={currentTestimonial.image || "/placeholder.svg"} alt={currentTestimonial.name} />
                      <AvatarFallback className="bg-purple-600 text-white text-lg">
                        {currentTestimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-lg text-white">{currentTestimonial.name}</h4>
                      <p className="text-gray-300">{currentTestimonial.location}</p>
                      <Badge className="mt-1 bg-purple-600 text-white">{currentTestimonial.event}</Badge>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>
                      <span className="font-semibold">Venue:</span>
                      <br />
                      {currentTestimonial.venue}
                    </div>
                    <div>
                      <span className="font-semibold">Guests:</span>
                      <br />
                      {currentTestimonial.guests} people
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video/Image Section */}
              <div className="relative">
                <Card className="border-0 shadow-2xl overflow-hidden">
                  <div className="relative h-96 bg-gradient-to-br from-purple-600 to-pink-600">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt={`${currentTestimonial.event} celebration`}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-20 h-20"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </Button>
                    </div>

                    {/* Event Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <h5 className="font-bold text-white mb-1">{currentTestimonial.event}</h5>
                        <p className="text-gray-200 text-sm">{currentTestimonial.date}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevTestimonial}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-12 h-12"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextTestimonial}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-12 h-12"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">4.9★</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">10,000+</div>
            <div className="text-gray-300">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">99.8%</div>
            <div className="text-gray-300">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
            <div className="text-gray-300">Support Available</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
