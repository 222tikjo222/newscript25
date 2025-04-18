import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { getCarById, CarNotFoundError, InvalidCarIdError } from "@/lib/services/car-service"

interface CarDetailsPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CarDetailsPageProps): Promise<Metadata> {
  try {
    const car = await getCarById(params.id)
    return {
      title: `${car.name} | Car Auction`,
      description: car.description,
    }
  } catch (error) {
    return {
      title: "Car Details | Car Auction",
      description: "View detailed information about this car.",
    }
  }
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  try {
    const car = await getCarById(params.id)

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {car.images && car.images.length > 0 ? (
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={car.images[0] || "/placeholder.svg"}
                  alt={car.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
            <p className="text-2xl font-semibold text-green-600 mb-4">${car.price.toLocaleString()}</p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{car.description}</p>
            </div>

            {car.features && car.features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Features</h2>
                <ul className="list-disc pl-5">
                  {car.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-medium text-gray-500">Year</h3>
                <p>{car.year}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Mileage</h3>
                <p>{car.mileage.toLocaleString()} miles</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Condition</h3>
                <p>{car.condition}</p>
              </div>
            </div>

            {car.seller && (
              <div className="border-t pt-4">
                <h2 className="text-xl font-semibold mb-2">Seller Information</h2>
                <div className="flex items-center">
                  <div>
                    <p className="font-medium">{car.seller.name}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{car.seller.rating}</span>
                      {car.seller.verified && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium">
                Place Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    if (error instanceof CarNotFoundError) {
      notFound() // This will show the not-found.tsx page
    }

    if (error instanceof InvalidCarIdError) {
      // Handle invalid ID (could also use notFound() or redirect)
      notFound()
    }

    // For other errors, we'll throw to the closest error boundary
    throw error
  }
}
