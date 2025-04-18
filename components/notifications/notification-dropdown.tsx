"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { getNotificationsForUser, getUnreadNotificationsCount } from "@/lib/data"
import type { Notification } from "@/lib/types"

interface NotificationDropdownProps {
  userId: number
}

export function NotificationDropdown({ userId }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // في تطبيق حقيقي، سنقوم بجلب الإشعارات من API
    const userNotifications = getNotificationsForUser(userId)
    setNotifications(userNotifications)
    setUnreadCount(getUnreadNotificationsCount(userId))

    // محاكاة لتحديث الإشعارات كل 30 ثانية
    const interval = setInterval(() => {
      const updatedNotifications = getNotificationsForUser(userId)
      setNotifications(updatedNotifications)
      setUnreadCount(getUnreadNotificationsCount(userId))
    }, 30000)

    return () => clearInterval(interval)
  }, [userId])

  const markAsRead = (notificationId: number) => {
    // في تطبيق حقيقي، سنقوم بإرسال طلب API لتحديث حالة الإشعار
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, is_read: true } : notification,
      ),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    // في تطبيق حقيقي، سنقوم بإرسال طلب API لتحديث حالة جميع الإشعارات
    setNotifications((prev) => prev.map((notification) => ({ ...notification, is_read: true })))
    setUnreadCount(0)
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">الإشعارات</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>الإشعارات</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto py-1 px-2 text-xs">
              تعيين الكل كمقروء
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-3 ${!notification.is_read ? "bg-muted/50" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-2 w-full">
                  <div className="text-lg">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">{notification.message}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.created_at).toLocaleString("ar-SA")}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">لا توجد إشعارات</div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile/notifications" className="w-full text-center justify-center">
            عرض جميع الإشعارات
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
