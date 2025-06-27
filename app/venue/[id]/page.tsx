import { Suspense } from "react"
import VenueDetail from "@/components/venue-detail"
import { notFound } from "next/navigation"

interface VenuePageProps {
  params: {
    id: string
  }
}

export default function VenuePage({ params }: VenuePageProps) {
  if (!params.id) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading venue details...</div>}>
        <VenueDetail venueId={params.id} />
      </Suspense>
    </div>
  )
}
