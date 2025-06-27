import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Contact from "@/models/Contact"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { name, email, phone, subject, message, inquiryType } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Please fill in all required fields" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address" }, { status: 400 })
    }

    // Phone validation (if provided)
    if (phone) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(phone)) {
        return NextResponse.json({ success: false, error: "Please enter a valid phone number" }, { status: 400 })
      }
    }

    // Get request metadata
    const headersList = headers()
    const userAgent = headersList.get("user-agent") || ""
    const forwarded = headersList.get("x-forwarded-for")
    const ipAddress = forwarded ? forwarded.split(",")[0] : request.ip || "unknown"
    const referrer = headersList.get("referer") || ""

    // Determine priority based on inquiry type
    let priority = "medium"
    if (inquiryType === "technical-support" || inquiryType === "billing-payments") {
      priority = "high"
    } else if (inquiryType === "venue-booking" || inquiryType === "event-planning-consultation") {
      priority = "high"
    }

    // Create contact entry
    const contact = new Contact({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
      inquiryType: inquiryType || "general-inquiry",
      priority,
      userAgent,
      ipAddress,
      referrer,
      source: "website",
    })

    await contact.save()

    // Send notification email to admin (in production)
    // await sendNotificationEmail(contact)

    // Send auto-reply email to user (in production)
    // await sendAutoReplyEmail(contact)

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We will get back to you within 24 hours.",
      contactId: contact._id,
    })
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof Error && (error as any).name === "ValidationError") {
      const errors = Object.values((error as any).errors).map((err: any) => err.message)
      return NextResponse.json({ success: false, error: errors.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: "Failed to send message. Please try again." }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const inquiryType = searchParams.get("inquiryType")
    const priority = searchParams.get("priority")

    // Build query
    const query: any = {}
    if (status) query.status = status
    if (inquiryType) query.inquiryType = inquiryType
    if (priority) query.priority = priority

    // Execute query with pagination
    const skip = (page - 1) * limit

    const [contacts, totalCount] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("assignedTo", "name email")
        .populate("response.respondedBy", "name email")
        .lean(),
      Contact.countDocuments(query),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      contacts,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
      },
    })
  } catch (error) {
    console.error("Get contacts error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch contacts" }, { status: 500 })
  }
}
