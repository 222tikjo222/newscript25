import Link from "next/link"

export default function CarNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">Sorry, we couldn't find the car you're looking for.</p>
      <div className="flex justify-center gap-4">
        <Link href="/cars" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Browse All Cars
        </Link>
        <Link href="/" className="border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded">
          Return Home
        </Link>
      </div>
    </div>
  )
}
