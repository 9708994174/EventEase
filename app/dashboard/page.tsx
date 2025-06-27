import { Suspense } from "react"
import UserDashboard from "@/components/user-dashboard"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <UserDashboard />
      </Suspense>
    </div>
  )
}
