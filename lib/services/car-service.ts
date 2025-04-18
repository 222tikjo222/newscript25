import type { Car } from "@/types/car"

// Mock data - replace with your actual data fetching logic
const mockCars: Car[] = [
  {
    id: "1",
    name: "Tesla Model S",
    price: 79999,
    description: "Luxury electric sedan with impressive range and performance.",
    images: ["/images/cars/tesla-model-s-1.jpg", "/images/cars/tesla-model-s-2.jpg"],
    features: ["Electric", "Autopilot", "Premium Interior"],
    year: 2023,
    mileage: 0,
    condition: "New",
    seller: {
      id: "s1",
      name: "Tesla Official",
      rating: 4.9,
      verified: true,
    },
  },
  {
    id: "2",
    name: "BMW M5",
    price: 103500,
    description: "High-performance luxury sedan with twin-turbo V8 engine.",
    images: ["/images/cars/bmw-m5-1.jpg", "/images/cars/bmw-m5-2.jpg"],
    features: ["Twin-Turbo V8", "All-Wheel Drive", "Carbon Fiber Trim"],
    year: 2023,
    mileage: 1200,
    condition: "Like New",
    seller: {
      id: "s2",
      name: "Premium Auto Group",
      rating: 4.7,
      verified: true,
    },
  },
  {
    id: "3",
    name: "Ford Mustang GT",
    price: 45999,
    description: "Iconic American muscle car with powerful V8 engine.",
    images: ["/images/cars/mustang-gt-1.jpg", "/images/cars/mustang-gt-2.jpg"],
    features: ["V8 Engine", "Manual Transmission", "Performance Package"],
    year: 2022,
    mileage: 8500,
    condition: "Excellent",
    seller: {
      id: "s3",
      name: "Classic Motors",
      rating: 4.5,
      verified: false,
    },
  },
  // Add more mock cars as needed
]

export class CarNotFoundError extends Error {
  constructor(id: string) {
    super(`Car with ID ${id} not found`)
    this.name = "CarNotFoundError"
  }
}

export class InvalidCarIdError extends Error {
  constructor(id: string | undefined) {
    super(`Invalid car ID: ${id}`)
    this.name = "InvalidCarIdError"
  }
}

export class CarServiceError extends Error {
  public statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.name = "CarServiceError"
    this.statusCode = statusCode
  }
}

/**
 * Get a car by its ID with robust error handling
 * @param id - The ID of the car to retrieve
 * @returns The car object
 * @throws {InvalidCarIdError} When the ID is invalid
 * @throws {CarNotFoundError} When no car with the given ID exists
 * @throws {CarServiceError} When there's an error fetching the car data
 */
export async function getCarById(id: string): Promise<Car> {
  try {
    // Validate input
    if (!id) {
      throw new InvalidCarIdError(id)
    }

    // Trim and sanitize the ID
    const sanitizedId = id.trim()

    // In a real app, this would be a database or API call
    // For now, we'll use the mock data

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Find the car in our mock data
    const car = mockCars.find((car) => car.id === sanitizedId)

    // If no car is found, throw a specific error
    if (!car) {
      throw new CarNotFoundError(sanitizedId)
    }

    return car
  } catch (error) {
    // Handle known error types
    if (error instanceof CarNotFoundError || error instanceof InvalidCarIdError) {
      // Re-throw these specific errors as they are already properly formatted
      throw error
    }

    // Log unexpected errors
    console.error("Error fetching car data:", error)

    // Wrap unknown errors in our CarServiceError
    throw new CarServiceError("An unexpected error occurred while fetching the car data", 500)
  }
}

/**
 * Get all available cars
 * @returns Array of car objects
 */
export async function getAllCars(): Promise<Car[]> {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return mockCars
  } catch (error) {
    console.error("Error fetching all cars:", error)
    throw new CarServiceError("Failed to fetch cars", 500)
  }
}
