import { Suspense } from "react"
import PartnerLanding from "@/components/partner-landing"

export default function PartnerPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <PartnerLanding />
      </Suspense>
    </div>
  )
}
