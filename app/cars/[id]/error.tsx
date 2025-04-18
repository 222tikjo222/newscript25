"use client"

import { useEffect } from "react"
import Link from "next/link"

interface ErrorPageProps {
  error: Error
  reset: () => void
}

export default function CarErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Car page error:", error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Something Went Wrong</h1>
      <p className="text-xl text-gray-600 mb-8">We encountered an error while loading this car.</p>
      <div className="flex justify-center gap-4">
        <button onClick={reset} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Try Again
        </button>
        <Link href="/cars" className="border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded">
          Browse All Cars
        </Link>
      </div>
    </div>
  )
}
