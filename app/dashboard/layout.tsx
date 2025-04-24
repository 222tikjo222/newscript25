"use client"

import type React from "react"
import { ProSidebar } from "@/components/dashboard/pro-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <ProSidebar />
      <div className="flex-1 pr-[280px] transition-all duration-300">
        <div className="container py-8">{children}</div>
      </div>
    </div>
  )
}
