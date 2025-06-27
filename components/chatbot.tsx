"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Phone, Mail, Minimize2, Maximize2 } from "lucide-react"
import { motion } from "framer-motion"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "quick-reply" | "card" | "contact"
  data?: any
}

const quickReplies = [
  "I want to book a venue",
  "What services do you offer?",
  "Pricing information",
  "Talk to a human",
  "Wedding planning",
  "Corporate events",
]

const botResponses = {
  greeting:
    "Hi there! 👋 I'm your Celebration Concierge assistant. I'm here to help you plan the perfect event! How can I assist you today?",
  venue:
    "Great choice! I can help you find the perfect venue. What type of event are you planning and how many guests will you have?",
  services:
    "We offer comprehensive event planning services including:\n\n🏛️ Venue booking\n🍽️ Catering services\n📸 Photography\n🎵 Entertainment\n🎨 Decoration\n🎂 Cakes & desserts\n\nWhich service interests you most?",
  pricing:
    "Our pricing varies based on your specific needs. Here are our starting prices:\n\n• Venue booking: ₹10,000+\n• Catering: ₹500/person\n• Photography: ₹15,000+\n• Decoration: ₹8,000+\n\nWould you like a detailed quote for your event?",
  wedding:
    "Congratulations on your upcoming wedding! 💒 We specialize in creating magical wedding experiences. Our wedding packages include:\n\n✨ Venue selection\n💐 Decoration & flowers\n📷 Photography & videography\n🍽️ Catering\n🎵 Entertainment\n\nWhen is your wedding date?",
  corporate:
    "Perfect! We handle all types of corporate events:\n\n🏢 Conferences & seminars\n🎉 Team building events\n🚀 Product launches\n🏆 Award ceremonies\n🍽️ Corporate dinners\n\nWhat type of corporate event are you planning?",
  human:
    "I'll connect you with one of our event specialists right away! You can also reach us at:\n\n📞 +91 98765 43210\n📧 hello@celebrationconcierge.com\n\nOr would you prefer to schedule a callback?",
  default:
    "I'd be happy to help you with that! Could you please provide more details about what you're looking for? You can also browse our services or contact our team directly.",
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: botResponses.greeting,
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("venue") || message.includes("book") || message.includes("hall")) {
      return botResponses.venue
    } else if (message.includes("service") || message.includes("what do you offer")) {
      return botResponses.services
    } else if (message.includes("price") || message.includes("cost") || message.includes("pricing")) {
      return botResponses.pricing
    } else if (message.includes("wedding") || message.includes("marriage") || message.includes("shaadi")) {
      return botResponses.wedding
    } else if (message.includes("corporate") || message.includes("office") || message.includes("business")) {
      return botResponses.corporate
    } else if (
      message.includes("human") ||
      message.includes("agent") ||
      message.includes("talk") ||
      message.includes("call")
    ) {
      return botResponses.human
    } else if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! " + botResponses.greeting
    } else if (message.includes("thank") || message.includes("thanks")) {
      return "You're welcome! Is there anything else I can help you with today? 😊"
    } else if (message.includes("bye") || message.includes("goodbye")) {
      return "Thank you for chatting with us! Feel free to reach out anytime. Have a wonderful day! 👋"
    } else {
      return botResponses.default
    }
  }

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateBotResponse(messageText),
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
        >
          <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </Button>

        {/* Notification Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">1</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className={`fixed z-50 ${
        isMinimized
          ? "bottom-4 right-4 sm:bottom-6 sm:right-6"
          : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96"
      }`}
    >
      <Card className={`shadow-2xl border-0 ${isMinimized ? "w-auto" : "h-[500px] sm:h-[600px]"} overflow-hidden`}>
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <CardTitle className="text-sm sm:text-base font-semibold">Celebration Assistant</CardTitle>
                <p className="text-xs text-purple-100">Online • Typically replies instantly</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1 sm:p-2"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 sm:p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
            {/* Messages */}
            <ScrollArea className="flex-1 p-3 sm:p-4">
              <div className="space-y-3 sm:space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === "user" ? "bg-purple-600" : "bg-gray-200"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg px-3 py-2 sm:px-4 sm:py-3 ${
                          message.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-xs sm:text-sm whitespace-pre-line">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${message.sender === "user" ? "text-purple-200" : "text-gray-500"}`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-3 py-2 sm:px-4 sm:py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="p-3 sm:p-4 border-t bg-gray-50">
                <p className="text-xs text-gray-600 mb-2">Quick replies:</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {quickReplies.slice(0, 4).map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-white hover:bg-purple-50 border-purple-200 text-purple-700"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 sm:p-4 border-t bg-white">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 text-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Contact Options */}
              <div className="flex items-center justify-center space-x-4 mt-3 pt-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickReply("Talk to a human")}
                  className="text-xs text-gray-600 hover:text-purple-600"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call Us
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickReply("I need help with booking")}
                  className="text-xs text-gray-600 hover:text-purple-600"
                >
                  <Mail className="w-3 h-3 mr-1" />
                  Email
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}
