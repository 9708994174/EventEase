import mongoose, { Schema, type Document } from "mongoose"

export interface IPartnerApplication extends Document {
  businessName: string
  ownerName: string
  email: string
  phone: string
  businessType: "venue" | "catering" | "decoration" | "photography" | "entertainment" | "other"
  city: string
  experience?: string
  description?: string
  status: "pending" | "approved" | "rejected" | "under_review"
  submittedAt: Date
  reviewedAt?: Date
  reviewedBy?: mongoose.Types.ObjectId
  notes?: string
}

const PartnerApplicationSchema = new Schema<IPartnerApplication>({
  businessName: {
    type: String,
    required: true,
    trim: true,
  },
  ownerName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  businessType: {
    type: String,
    enum: ["venue", "catering", "decoration", "photography", "entertainment", "other"],
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: String,
    enum: ["0-1", "2-5", "6-10", "10+"],
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "under_review"],
    default: "pending",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: {
    type: Date,
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  notes: {
    type: String,
  },
})

// Indexes
PartnerApplicationSchema.index({ email: 1 })
PartnerApplicationSchema.index({ status: 1 })
PartnerApplicationSchema.index({ submittedAt: -1 })
PartnerApplicationSchema.index({ businessType: 1, city: 1 })

export default mongoose.models.PartnerApplication ||
  mongoose.model<IPartnerApplication>("PartnerApplication", PartnerApplicationSchema)
