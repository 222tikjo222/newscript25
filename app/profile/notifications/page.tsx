"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Check, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getNotificationsForUser } from "@/lib/data"
import type { Notification } from "@/lib/types"

export default function ProfileNotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  // في تطبيق حقيقي، سنقوم بجلب بيانات المستخدم من API
  const userId = 1 // مثال لمعرف المستخدم

  // جلب الإشعارات
  const [notifications, setNotifications] = useState<Notification[]>(getNotificationsForUser(userId))

  // تصنيف الإشعارات
  const unreadNotifications = notifications.filter((notification) => !notification.is_read)
  const readNotifications = notifications.filter((notification) => notification.is_read)

  const markAsRead = (notificationId: number) => {
    // في تطبيق حقيقي، سنقوم بإرسال طلب API لتحديث حالة الإشعار
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, is_read: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    // في تطبيق حقيقي، سنقوم بإرسال طلب API لتحديث حالة جميع الإشعارات
    setNotifications((prev) => prev.map((notification) => ({ ...notification, is_read: true })))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "bid":
        return "🛎️"
      case "outbid":
        return "⚠️"
      case "won":
        return "🏆"
      case "ended":
        return "🏁"
      case "system":
        return "ℹ️"
      default:
        return "📌"
    }
  }

  const getNotificationLink = (notification: Notification) => {
    if (notification.auction_id) {
      return `/auctions/${notification.auction_id}`
    }
    if (notification.car_id) {
      return `/cars/${notification.car_id}`
    }
    return "#"
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">الإشعارات</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* القائمة الجانبية */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>القائمة</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="flex flex-col">
              <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-muted">
                <User className="h-4 w-4" />
                <span>معلوماتي</span>
              </Link>
              <Link
                href="/profile/notifications"
                className="flex items-center gap-2 px-4 py-2 hover:bg-muted text-primary"
              >
                <Bell className="h-4 w-4" />
                <span>الإشعارات</span>
              </Link>
            </nav>
          </CardContent>
        </Card>

        {/* المحتوى الرئيسي */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="all">الكل</TabsTrigger>
                  <TabsTrigger value="unread">غير مقروءة</TabsTrigger>
                  <TabsTrigger value="read">مقروءة</TabsTrigger>
                </TabsList>
                {unreadNotifications.length > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    <Check className="h-4 w-4 ml-2" />
                    تعيين الكل كمقروء
                  </Button>
                )}
              </div>
            </Tabs>
          </div>

          <TabsContent value="all" className="mt-0">
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`overflow-hidden ${!notification.is_read ? "border-primary/50 bg-primary/5" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.created_at).toLocaleString("ar-SA")}
                            </span>
                          </div>
                          <p className="text-muted-foreground mt-1">{notification.message}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                              <Link href={getNotificationLink(notification)}>عرض التفاصيل</Link>
                            </Button>
                            {!notification.is_read && (
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                <Check className="h-4 w-4 ml-1" />
                                تعيين كمقروء
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-bold mb-2">لا توجد إشعارات</h3>
                  <p className="text-muted-foreground">ستظهر هنا جميع الإشعارات الخاصة بك</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            {unreadNotifications.length > 0 ? (
              <div className="space-y-4">
                {unreadNotifications.map((notification) => (
                  <Card key={notification.id} className="overflow-hidden border-primary/50 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.created_at).toLocaleString("ar-SA")}
                            </span>
                          </div>
                          <p className="text-muted-foreground mt-1">{notification.message}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                              <Link href={getNotificationLink(notification)}>عرض التفاصيل</Link>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                              <Check className="h-4 w-4 ml-1" />
                              تعيين كمقروء
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-bold mb-2">لا توجد إشعارات غير مقروءة</h3>
                  <p className="text-muted-foreground">لقد قمت بقراءة جميع الإشعارات</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="read" className="mt-0">
            {readNotifications.length > 0 ? (
              <div className="space-y-4">
                {readNotifications.map((notification) => (
                  <Card key={notification.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.created_at).toLocaleString("ar-SA")}
                            </span>
                          </div>
                          <p className="text-muted-foreground mt-1">{notification.message}</p>
                          <div className="mt-2">
                            <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                              <Link href={getNotificationLink(notification)}>عرض التفاصيل</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-bold mb-2">لا توجد إشعارات مقروءة</h3>
                  <p className="text-muted-foreground">لم تقم بقراءة أي إشعارات بعد</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </div>
      </div>
    </div>
  )
}
