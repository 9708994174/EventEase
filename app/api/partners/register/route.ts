import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PartnerApplication from "@/models/PartnerApplication"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { businessName, ownerName, email, phone, businessType, city, experience, description } = await request.json()

    // Validation
    if (!businessName || !ownerName || !email || !phone || !businessType || !city) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
    }

    // Check if application already exists
    const existingApplication = await PartnerApplication.findOne({ email })
    if (existingApplication) {
      return NextResponse.json({ error: "Application already exists for this email" }, { status: 409 })
    }

    // Create partner application
    const application = new PartnerApplication({
      businessName,
      ownerName,
      email,
      phone,
      businessType,
      city,
      experience,
      description,
      status: "pending",
      submittedAt: new Date(),
    })

    await application.save()

    // Here you would typically:
    // 1. Send confirmation email to applicant
    // 2. Send notification to admin team
    // 3. Create a ticket in support system

    return NextResponse.json(
      {
        message: "Partnership application submitted successfully",
        applicationId: application._id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Partner registration error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
