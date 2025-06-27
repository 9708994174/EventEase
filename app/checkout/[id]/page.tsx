import { Suspense } from "react"
import CheckoutFlow from "@/components/checkout-flow"

interface CheckoutPageProps {
  params: {
    id: string
  }
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading checkout...</div>}>
        <CheckoutFlow bookingId={params.id} />
      </Suspense>
    </div>
  )
}
