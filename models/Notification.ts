import mongoose, { Schema, type Document } from "mongoose"

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  message: string
  type: "booking" | "payment" | "reminder" | "promotion" | "system"
  read: boolean
  actionUrl?: string
  metadata?: any
  createdAt: Date
}

const NotificationSchema = new Schema<INotification>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["booking", "payment", "reminder", "promotion", "system"],
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  actionUrl: {
    type: String,
  },
  metadata: {
    type: Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Indexes
NotificationSchema.index({ userId: 1, read: 1 })
NotificationSchema.index({ createdAt: -1 })
NotificationSchema.index({ type: 1 })

export default mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema)
