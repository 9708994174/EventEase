import mongoose from "mongoose"

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [100, "Subject cannot be more than 100 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message cannot be more than 1000 characters"],
    },
    inquiryType: {
      type: String,
      enum: [
        "general-inquiry",
        "venue-booking",
        "service-partnership",
        "technical-support",
        "billing-payments",
        "event-planning-consultation",
        "feedback-suggestions",
      ],
      default: "general-inquiry",
    },
    status: {
      type: String,
      enum: ["new", "in-progress", "resolved", "closed"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    response: {
      message: String,
      respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      respondedAt: Date,
    },
    followUp: {
      required: {
        type: Boolean,
        default: false,
      },
      scheduledAt: Date,
      completedAt: Date,
      notes: String,
    },
    source: {
      type: String,
      enum: ["website", "mobile-app", "phone", "email", "social-media", "referral"],
      default: "website",
    },
    userAgent: String,
    ipAddress: String,
    referrer: String,
  },
  {
    timestamps: true,
  },
)

// Indexes
contactSchema.index({ status: 1, priority: -1 })
contactSchema.index({ inquiryType: 1 })
contactSchema.index({ createdAt: -1 })
contactSchema.index({ email: 1 })

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema)
