import mongoose from "mongoose"

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Venue name is required"],
      trim: true,
      maxlength: [100, "Venue name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    type: {
      type: String,
      required: true,
      enum: ["banquet-hall", "hotel", "resort", "outdoor", "community-hall", "restaurant", "farmhouse", "palace"],
      default: "banquet-hall",
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
        match: [/^\d{6}$/, "Please enter a valid pincode"],
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
      landmarks: [String],
    },
    capacity: {
      min: {
        type: Number,
        required: true,
        min: [1, "Minimum capacity must be at least 1"],
      },
      max: {
        type: Number,
        required: true,
        min: [1, "Maximum capacity must be at least 1"],
      },
      flexible: {
        type: Boolean,
        default: false,
      },
    },
    pricing: {
      base: {
        type: Number,
        required: true,
        min: [0, "Base price cannot be negative"],
      },
      unit: {
        type: String,
        enum: ["event", "day", "hour", "person"],
        default: "event",
      },
      seasonal: [
        {
          season: {
            type: String,
            enum: ["peak", "off-peak", "wedding-season"],
          },
          multiplier: {
            type: Number,
            min: 0.5,
            max: 3.0,
            default: 1.0,
          },
        },
      ],
      packages: [
        {
          name: String,
          description: String,
          price: Number,
          inclusions: [String],
          duration: String,
        },
      ],
    },
    amenities: [
      {
        type: String,
        enum: [
          "parking",
          "valet-parking",
          "wifi",
          "ac",
          "sound-system",
          "projector",
          "stage",
          "dance-floor",
          "green-room",
          "bridal-room",
          "catering-kitchen",
          "bar",
          "swimming-pool",
          "garden",
          "terrace",
          "elevator",
          "wheelchair-access",
          "cctv",
          "security",
          "generator",
          "washrooms",
          "changing-rooms",
        ],
      },
    ],
    features: [String],
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        caption: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
        category: {
          type: String,
          enum: ["exterior", "interior", "hall", "garden", "amenity", "food", "decoration"],
        },
      },
    ],
    contact: {
      phone: {
        type: String,
        required: true,
        match: [/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
      },
      email: {
        type: String,
        required: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
      },
      website: String,
      socialMedia: {
        facebook: String,
        instagram: String,
        youtube: String,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    manager: {
      name: String,
      phone: String,
      email: String,
    },
    availability: {
      workingDays: [
        {
          type: String,
          enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        },
      ],
      workingHours: {
        start: String,
        end: String,
      },
      blackoutDates: [Date],
      advanceBookingDays: {
        type: Number,
        default: 30,
      },
      minimumBookingHours: {
        type: Number,
        default: 4,
      },
    },
    policies: {
      cancellation: {
        policy: String,
        refundPercentage: [
          {
            daysBeforeEvent: Number,
            refundPercent: Number,
          },
        ],
      },
      payment: {
        advancePercentage: {
          type: Number,
          min: 0,
          max: 100,
          default: 25,
        },
        acceptedMethods: [
          {
            type: String,
            enum: ["cash", "card", "upi", "netbanking", "cheque"],
          },
        ],
      },
      terms: [String],
      restrictions: [String],
    },
    catering: {
      inHouse: {
        type: Boolean,
        default: false,
      },
      external: {
        type: Boolean,
        default: true,
      },
      cuisines: [String],
      menuOptions: [
        {
          name: String,
          type: {
            type: String,
            enum: ["veg", "non-veg", "vegan", "jain"],
          },
          pricePerPerson: Number,
          items: [String],
        },
      ],
      barService: {
        type: Boolean,
        default: false,
      },
    },
    decoration: {
      inHouse: {
        type: Boolean,
        default: false,
      },
      external: {
        type: Boolean,
        default: true,
      },
      themes: [String],
      restrictions: [String],
    },
    rating: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
      breakdown: {
        service: { type: Number, default: 0 },
        cleanliness: { type: Number, default: 0 },
        value: { type: Number, default: 0 },
        location: { type: Number, default: 0 },
        amenities: { type: Number, default: 0 },
      },
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    stats: {
      views: {
        type: Number,
        default: 0,
      },
      bookings: {
        type: Number,
        default: 0,
      },
      wishlistCount: {
        type: Number,
        default: 0,
      },
      lastBooked: Date,
    },
    verification: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      verifiedAt: Date,
      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      documents: [
        {
          type: {
            type: String,
            enum: ["license", "registration", "tax", "insurance", "fire-safety"],
          },
          url: String,
          verified: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending", "suspended"],
      default: "pending",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      slug: {
        type: String,
        unique: true,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
venueSchema.index({ "location.city": 1, "location.area": 1 })
venueSchema.index({ type: 1 })
venueSchema.index({ "capacity.min": 1, "capacity.max": 1 })
venueSchema.index({ "pricing.base": 1 })
venueSchema.index({ "rating.average": -1 })
venueSchema.index({ status: 1, featured: -1 })
venueSchema.index({ "location.coordinates": "2dsphere" })

// Generate slug before saving
venueSchema.pre("save", function (next) {
  if (!this.seo.slug) {
    this.seo.slug =
      this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      this.location.city.toLowerCase()
  }
  next()
})

// Update rating when reviews change
venueSchema.methods.updateRating = async function () {
  const Review = mongoose.model("Review")
  const reviews = await Review.find({ venue: this._id })

  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    this.rating.average = totalRating / reviews.length
    this.rating.count = reviews.length

    // Calculate breakdown
    const breakdown = reviews.reduce(
      (acc, review) => {
        acc.service += review.breakdown?.service || 0
        acc.cleanliness += review.breakdown?.cleanliness || 0
        acc.value += review.breakdown?.value || 0
        acc.location += review.breakdown?.location || 0
        acc.amenities += review.breakdown?.amenities || 0
        return acc
      },
      { service: 0, cleanliness: 0, value: 0, location: 0, amenities: 0 },
    )

    Object.keys(breakdown).forEach((key) => {
      this.rating.breakdown[key] = breakdown[key] / reviews.length
    })
  }

  await this.save()
}

export default mongoose.models.Venue || mongoose.model("Venue", venueSchema)
