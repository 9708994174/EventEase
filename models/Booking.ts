import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
    },
    services: [
      {
        type: {
          type: String,
          enum: ["venue", "catering", "decoration", "photography", "entertainment", "extras"],
          required: true,
        },
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        serviceName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        unitPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        customizations: {
          type: Map,
          of: mongoose.Schema.Types.Mixed,
        },
      },
    ],
    eventDetails: {
      occasion: {
        type: String,
        required: true,
        enum: [
          "wedding",
          "birthday",
          "anniversary",
          "corporate",
          "baby-shower",
          "engagement",
          "graduation",
          "festival",
        ],
      },
      eventDate: {
        type: Date,
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      guestCount: {
        type: Number,
        required: true,
        min: 1,
      },
      specialRequests: String,
      dietaryRestrictions: [String],
      accessibility: [String],
    },
    customerDetails: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: String,
      emergencyContact: {
        name: String,
        phone: String,
        relation: String,
      },
    },
    pricing: {
      subtotal: {
        type: Number,
        required: true,
        min: 0,
      },
      taxes: {
        type: Number,
        default: 0,
        min: 0,
      },
      serviceCharges: {
        type: Number,
        default: 0,
        min: 0,
      },
      discount: {
        type: Number,
        default: 0,
        min: 0,
      },
      total: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    payment: {
      status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded", "partial"],
        default: "pending",
      },
      method: {
        type: String,
        enum: ["upi", "card", "netbanking", "wallet", "cash"],
        required: true,
      },
      transactionId: String,
      paidAmount: {
        type: Number,
        default: 0,
        min: 0,
      },
      paymentDate: Date,
      refundAmount: {
        type: Number,
        default: 0,
        min: 0,
      },
      refundDate: Date,
    },
    status: {
      type: String,
      enum: ["pending_confirmation", "confirmed", "in_progress", "completed", "cancelled", "refunded"],
      default: "pending_confirmation",
    },
    timeline: [
      {
        status: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        note: String,
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    documents: [
      {
        name: String,
        url: String,
        type: {
          type: String,
          enum: ["contract", "invoice", "receipt", "permit", "other"],
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    communication: [
      {
        type: {
          type: String,
          enum: ["email", "sms", "call", "meeting", "note"],
        },
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        to: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
    ],
    cancellation: {
      reason: String,
      cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      cancelledAt: Date,
      refundEligible: {
        type: Boolean,
        default: false,
      },
      cancellationFee: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Generate unique booking ID
bookingSchema.pre("save", async function (next) {
  if (!this.bookingId) {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 8)
    this.bookingId = `CC${timestamp}${random}`.toUpperCase()
  }
  next()
})

// Calculate total before saving
bookingSchema.pre("save", function (next) {
  this.pricing.total = this.pricing.subtotal + this.pricing.taxes + this.pricing.serviceCharges - this.pricing.discount
  next()
})

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema)
