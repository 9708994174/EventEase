import { Suspense } from "react"
import BookingConfirmation from "@/components/booking-confirmation"

interface BookingConfirmationPageProps {
  params: {
    id: string
  }
}

export default function BookingConfirmationPage({ params }: BookingConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading confirmation...</div>}>
        <BookingConfirmation bookingId={params.id} />
      </Suspense>
    </div>
  )
}
