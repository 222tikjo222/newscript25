import type { Car, Bid, User, Auction, Notification, PaymentMethod, Address, Payment, Order } from "./types"

export const cars: Car[] = [
  {
    id: 1,
    title: "مرسيدس S-Class 2023",
    description: "سيارة فاخرة بمواصفات عالية، حالة ممتازة، صيانة دورية في الوكالة",
    price: 450000,
    image: "/pristine-s-class.png",
    status: "auction",
    created_at: "2023-10-15",
    features: ["نظام ملاحة", "كاميرا خلفية", "مقاعد جلد", "نظام صوتي فاخر"],
    model: "S-Class",
    year: 2023,
    mileage: 5000,
    color: "أسود",
  },
  {
    id: 2,
    title: "بي إم دبليو X7 2022",
    description: "سيارة دفع رباعي فاخرة، مساحة داخلية واسعة، أداء قوي وتقنيات متطورة",
    price: 380000,
    image: "/sleek-black-x7.png",
    status: "auction",
    created_at: "2023-11-20",
    features: ["دفع رباعي", "مقاعد مدفأة", "شاشة لمس 12 بوصة", "نظام تعليق هوائي"],
    model: "X7",
    year: 2022,
    mileage: 12000,
    color: "أسود",
  },
  {
    id: 3,
    title: "أودي A8 2023",
    description: "سيارة سيدان فاخرة، تقنيات متطورة، راحة استثنائية وأداء متميز",
    price: 420000,
    image: "/sleek-silver-a8.png",
    status: "available",
    created_at: "2023-09-05",
    features: ["نظام مساعدة القيادة", "إضاءة محيطية", "نظام صوتي Bang & Olufsen", "تدفئة وتبريد للمقاعد"],
    model: "A8",
    year: 2023,
    mileage: 8000,
    color: "فضي",
  },
  {
    id: 4,
    title: "لكزس LX600 2023",
    description: "سيارة دفع رباعي فاخرة، قوة وفخامة، مناسبة للطرق الوعرة والمدينة",
    price: 520000,
    image: "/pristine-lx600.png",
    status: "auction",
    created_at: "2023-08-10",
    features: ["محرك V8", "نظام تعليق متكيف", "شاشات ترفيهية خلفية", "رادار استشعار محيطي"],
    model: "LX600",
    year: 2023,
    mileage: 3000,
    color: "أبيض لؤلؤي",
  },
]

export const users: User[] = [
  {
    id: 1,
    username: "ahmed_ali",
    email: "ahmed@example.com",
    created_at: "2023-01-15",
  },
  {
    id: 2,
    username: "sara_mohamed",
    email: "sara@example.com",
    created_at: "2023-02-20",
  },
  {
    id: 3,
    username: "محمد_العمري",
    email: "mohammed@example.com",
    created_at: "2023-03-10",
  },
]

export const bids: Bid[] = [
  {
    id: 1,
    car_id: 1,
    user_id: 1,
    amount: 440000,
    status: "active",
    created_at: "2023-10-20",
    user: users[0],
  },
  {
    id: 2,
    car_id: 1,
    user_id: 2,
    amount: 445000,
    status: "active",
    created_at: "2023-10-22",
    user: users[1],
  },
  {
    id: 3,
    car_id: 2,
    user_id: 1,
    amount: 370000,
    status: "won",
    created_at: "2023-10-25",
    user: users[0],
  },
  {
    id: 4,
    car_id: 4,
    user_id: 2,
    amount: 510000,
    status: "active",
    created_at: "2023-10-26",
    user: users[1],
  },
]

export const auctions: Auction[] = [
  {
    id: 1,
    car_id: 1,
    start_price: 430000,
    current_price: 445000,
    start_date: "2023-10-15T10:00:00",
    end_date: "2023-11-15T18:00:00",
    status: "active",
    bids_count: 2,
    highest_bidder_id: 2,
    highest_bidder: users[1],
  },
  {
    id: 2,
    car_id: 2,
    start_price: 360000,
    current_price: 370000,
    start_date: "2023-10-20T14:00:00",
    end_date: "2023-10-25T14:00:00",
    status: "ended",
    bids_count: 1,
    highest_bidder_id: 1,
    highest_bidder: users[0],
  },
  {
    id: 3,
    car_id: 4,
    start_price: 500000,
    current_price: 510000,
    start_date: "2023-10-25T09:00:00",
    end_date: "2023-11-25T18:00:00",
    status: "active",
    bids_count: 1,
    highest_bidder_id: 2,
    highest_bidder: users[1],
  },
]

export const notifications: Notification[] = [
  {
    id: 1,
    user_id: 1,
    title: "تم تقديم عرضك بنجاح",
    message: "تم تقديم عرضك بمبلغ 440,000 ريال على سيارة مرسيدس S-Class 2023 بنجاح.",
    type: "bid",
    is_read: true,
    created_at: "2023-10-20T15:30:00",
    auction_id: 1,
    car_id: 1,
  },
  {
    id: 2,
    user_id: 1,
    title: "تم تجاوز عرضك",
    message: "تم تجاوز عرضك على سيارة مرسيدس S-Class 2023. العرض الحالي هو 445,000 ريال.",
    type: "outbid",
    is_read: false,
    created_at: "2023-10-22T10:15:00",
    auction_id: 1,
    car_id: 1,
  },
  {
    id: 3,
    user_id: 2,
    title: "تم تقديم عرضك بنجاح",
    message: "تم تقديم عرضك بمبلغ 445,000 ريال على سيارة مرسيدس S-Class 2023 بنجاح.",
    type: "bid",
    is_read: true,
    created_at: "2023-10-22T10:15:00",
    auction_id: 1,
    car_id: 1,
  },
  {
    id: 4,
    user_id: 1,
    title: "تم تقديم عرضك بنجاح",
    message: "تم تقديم عرضك بمبلغ 370,000 ريال على سيارة بي إم دبليو X7 2022 بنجاح.",
    type: "bid",
    is_read: false,
    created_at: "2023-10-25T16:45:00",
    auction_id: 2,
    car_id: 2,
  },
  {
    id: 5,
    user_id: 2,
    title: "تم تقديم عرضك بنجاح",
    message: "تم تقديم عرضك بمبلغ 510,000 ريال على سيارة لكزس LX600 2023 بنجاح.",
    type: "bid",
    is_read: false,
    created_at: "2023-10-26T11:20:00",
    auction_id: 3,
    car_id: 4,
  },
  {
    id: 6,
    user_id: 1,
    title: "تهانينا! لقد فزت بالمزاد",
    message: "تهانينا! لقد فزت بالمزاد على سيارة بي إم دبليو X7 2022 بمبلغ 370,000 ريال.",
    type: "won",
    is_read: false,
    created_at: "2023-10-25T14:05:00",
    auction_id: 2,
    car_id: 2,
  },
]

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm_1",
    user_id: 1,
    brand: "Visa",
    last4: "4242",
    expiry_month: "12",
    expiry_year: "25",
    is_default: true,
  },
  {
    id: "pm_2",
    user_id: 1,
    brand: "Mastercard",
    last4: "5555",
    expiry_month: "10",
    expiry_year: "24",
    is_default: false,
  },
]

export const addresses: Address[] = [
  {
    id: 1,
    user_id: 1,
    name: "أحمد علي",
    address_line1: "شارع الملك فهد",
    address_line2: "حي العليا",
    city: "الرياض",
    postal_code: "12345",
    phone: "0555123456",
    is_default: true,
  },
  {
    id: 2,
    user_id: 1,
    name: "أحمد علي",
    address_line1: "شارع الأمير محمد بن عبدالعزيز",
    address_line2: "حي السلامة",
    city: "جدة",
    postal_code: "23456",
    phone: "0555123456",
    is_default: false,
  },
]

export const payments: Payment[] = [
  {
    id: 1,
    bid_id: 3,
    user_id: 1,
    amount: 370000,
    status: "pending",
    payment_method: "pm_1",
    created_at: "2023-10-26T10:00:00",
  },
]

export const orders: Order[] = []

export const getCarById = (id: number): Car | undefined => {
  return cars.find((car) => car.id === id)
}

export const getBidsForCar = (carId: number): Bid[] => {
  return bids.filter((bid) => bid.car_id === carId)
}

export const getAllCars = (): Car[] => {
  return cars
}

export const getAuctionCars = (): Car[] => {
  return cars.filter((car) => car.status === "auction")
}

export const getAuctionById = (id: number): Auction | undefined => {
  return auctions.find((auction) => auction.id === id)
}

export const getAuctionByCar = (carId: number): Auction | undefined => {
  return auctions.find((auction) => auction.car_id === carId)
}

export const getNotificationsForUser = (userId: number): Notification[] => {
  return notifications.filter((notification) => notification.user_id === userId)
}

export const getUnreadNotificationsCount = (userId: number): number => {
  return notifications.filter((notification) => notification.user_id === userId && !notification.is_read).length
}

export const getPaymentMethodsForUser = (userId: number): PaymentMethod[] => {
  return paymentMethods.filter((pm) => pm.user_id === userId)
}

export const getAddressesForUser = (userId: number): Address[] => {
  return addresses.filter((address) => address.user_id === userId)
}

export const getPaymentForBid = (bidId: number): Payment | undefined => {
  return payments.find((payment) => payment.bid_id === bidId)
}

export const getOrderForBid = (bidId: number): Order | undefined => {
  return orders.find((order) => order.bid_id === bidId)
}
