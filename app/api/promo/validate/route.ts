import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

// Mock promo codes - replace with actual database
const promoCodes = {
  WELCOME10: { discount: 10, type: "percentage", minAmount: 5000 },
  SAVE500: { discount: 500, type: "fixed", minAmount: 10000 },
  FIRST20: { discount: 20, type: "percentage", minAmount: 15000 },
  FESTIVAL15: { discount: 15, type: "percentage", minAmount: 8000 },
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { code, bookingAmount } = await request.json()

    if (!code || !bookingAmount) {
      return NextResponse.json({ error: "Promo code and booking amount are required" }, { status: 400 })
    }

    const promoCode = promoCodes[code.toUpperCase() as keyof typeof promoCodes]

    if (!promoCode) {
      return NextResponse.json({ error: "Invalid promo code" }, { status: 400 })
    }

    if (bookingAmount < promoCode.minAmount) {
      return NextResponse.json(
        {
          error: `Minimum booking amount of ₹${promoCode.minAmount.toLocaleString("en-IN")} required for this promo code`,
        },
        { status: 400 },
      )
    }

    let discount = 0
    if (promoCode.type === "percentage") {
      discount = Math.round((bookingAmount * promoCode.discount) / 100)
    } else {
      discount = promoCode.discount
    }

    // Cap discount at 50% of booking amount
    const maxDiscount = Math.round(bookingAmount * 0.5)
    discount = Math.min(discount, maxDiscount)

    return NextResponse.json(
      {
        valid: true,
        discount,
        code: code.toUpperCase(),
        message: `Promo code applied! You saved ₹${discount.toLocaleString("en-IN")}`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Validate promo code error:", error)
    return NextResponse.json({ error: "Failed to validate promo code" }, { status: 500 })
  }
}
