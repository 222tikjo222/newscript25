import Link from "next/link"
import { ArrowLeft, Check, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FancyButton } from "@/components/ui/fancy-button"
import { CarCarousel } from "@/components/car-carousel"
import { InteractiveImage } from "@/components/interactive-image"
import { ChatBot } from "@/components/chat-bot/chat-bot"

const cars = [
  {
    id: 1,
    title: "مرسيدس S-Class 2023",
    year: 2023,
    price: 450000,
    type: "فاخرة",
    saleType: "مزاد",
    image: "/pristine-s-class.png",
    images: ["/pristine-s-class.png", "/sleek-silver-a8.png", "/sleek-black-x7.png"],
  },
  {
    id: 2,
    title: "بي إم دبليو X7 2022",
    year: 2022,
    price: 380000,
    type: "دفع رباعي",
    saleType: "بيع مباشر",
    image: "/sleek-black-x7.png",
    images: ["/sleek-black-x7.png", "/pristine-s-class.png", "/sleek-silver-a8.png"],
  },
  {
    id: 3,
    title: "أودي A8 2023",
    year: 2023,
    price: 420000,
    type: "سيدان",
    saleType: "مزاد",
    image: "/sleek-silver-a8.png",
    images: ["/sleek-silver-a8.png", "/pristine-s-class.png", "/sleek-black-x7.png"],
  },
  {
    id: 4,
    title: "لكزس LX600 2023",
    year: 2023,
    price: 520000,
    type: "دفع رباعي",
    saleType: "بيع مباشر",
    image: "/pristine-lx600.png",
    images: ["/pristine-lx600.png", "/sleek-silver-a8.png", "/sleek-black-x7.png"],
  },
  {
    id: 5,
    title: "بورش كايين 2022",
    year: 2022,
    price: 400000,
    type: "دفع رباعي",
    saleType: "مزاد",
    image: "/sleek-auto-display.png",
    images: ["/sleek-auto-display.png", "/pristine-s-class.png", "/sleek-black-x7.png"],
  },
]

export default function Home() {
  const featuredCars = cars.slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-muted py-16 md:py-24">
        <div className="container flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              اكتشف أفضل السيارات الفاخرة
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-[600px] mx-auto md:mx-0">
              نقدم لك مجموعة متميزة من السيارات الفاخرة بأفضل الأسعار وخدمات ما بعد البيع المتكاملة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <FancyButton size="lg" variant="default">
                <Link href="/cars" className="flex items-center">
                  تصفح السيارات
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </FancyButton>
              <FancyButton size="lg" variant="glass">
                <Link href="/contact">تواصل معنا</Link>
              </FancyButton>
            </div>
          </div>
          <div className="flex-1">
            <InteractiveImage
              src="/sleek-auto-display.png"
              alt="سيارة فاخرة"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              magnifyOnHover={true}
              zoomable={true}
            />
          </div>
        </div>
      </section>

      {/* Car Carousel */}
      <section className="py-16">
        <div className="container">
          <CarCarousel cars={cars} title="سيارات مميزة" />
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">سيارات مميزة</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              اكتشف أحدث السيارات الفاخرة المتوفرة في معرضنا بمواصفات استثنائية وأسعار تنافسية
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <Card key={car.id} className="overflow-hidden group">
                <div className="relative h-60">
                  <InteractiveImage
                    src={car.image || "/placeholder.svg"}
                    alt={car.title}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{car.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{car.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{car.price.toLocaleString()} ريال</span>
                    <FancyButton variant="neomorphic">
                      <Link href={`/cars/${car.id}`}>التفاصيل</Link>
                    </FancyButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <FancyButton size="lg" variant="glass">
              <Link href="/cars">عرض جميع السيارات</Link>
            </FancyButton>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">خدماتنا</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              نقدم مجموعة متكاملة من الخدمات لضمان تجربة مميزة لعملائنا الكرام
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">بيع وشراء السيارات</h3>
                <p className="text-muted-foreground">
                  نوفر خدمات بيع وشراء السيارات الفاخرة بأفضل الأسعار وضمانات متكاملة
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">الصيانة الدورية</h3>
                <p className="text-muted-foreground">
                  نقدم خدمات الصيانة الدورية للسيارات بأيدي فنيين متخصصين وقطع غيار أصلية
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">خدمات ما بعد البيع</h3>
                <p className="text-muted-foreground">
                  نوفر خدمات متكاملة ما بعد البيع لضمان رضا عملائنا وتقديم أفضل تجربة ممكنة
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">آراء العملاء</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              استمع إلى تجارب عملائنا الكرام مع معرضنا وخدماتنا المتميزة
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "تجربة رائعة مع معرض السيارات، حصلت على سيارة أحلامي بسعر مناسب وخدمة ممتازة من الفريق."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">أ</span>
                  </div>
                  <div className="mr-3">
                    <h4 className="font-bold">أحمد محمد</h4>
                    <p className="text-sm text-muted-foreground">الرياض</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "خدمة الصيانة ممتازة والفريق محترف جداً. أنصح الجميع بالتعامل مع هذا المعرض للحصول على أفضل الخدمات."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">س</span>
                  </div>
                  <div className="mr-3">
                    <h4 className="font-bold">سارة عبدالله</h4>
                    <p className="text-sm text-muted-foreground">جدة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "أسعار تنافسية وخيارات متنوعة من السيارات الفاخرة. تجربة شراء سلسة وسريعة مع فريق محترف."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">خ</span>
                  </div>
                  <div className="mr-3">
                    <h4 className="font-bold">خالد العمري</h4>
                    <p className="text-sm text-muted-foreground">الدمام</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">تواصل معنا اليوم</h2>
          <p className="text-xl mb-8 max-w-[800px] mx-auto">
            هل تبحث عن سيارة أحلامك؟ تواصل معنا اليوم للحصول على أفضل العروض والخدمات المتميزة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <FancyButton size="lg" variant="secondary">
              <Link href="/contact">تواصل معنا</Link>
            </FancyButton>
            <FancyButton
              size="lg"
              variant="outline"
              className="bg-transparent border-white hover:bg-white hover:text-primary"
            >
              <Link href="/cars">تصفح السيارات</Link>
            </FancyButton>
          </div>
        </div>
      </section>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  )
}
