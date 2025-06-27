import mongoose, { Schema, type Document } from "mongoose"

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId
  entityId: mongoose.Types.ObjectId
  entityType: "venue" | "service" | "partner"
  rating: number
  comment: string
  helpfulCount: number
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  entityId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  entityType: {
    type: String,
    enum: ["venue", "service", "partner"],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
  },
  helpfulCount: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Indexes
ReviewSchema.index({ entityId: 1, entityType: 1 })
ReviewSchema.index({ userId: 1, entityId: 1, entityType: 1 }, { unique: true })
ReviewSchema.index({ rating: -1 })
ReviewSchema.index({ createdAt: -1 })

// Update the updatedAt field before saving
ReviewSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema)
