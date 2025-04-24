"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { ar } from "date-fns/locale"

// بيانات وهمية للمستخدمين - في التطبيق الحقيقي ستأتي من API
const users = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    avatar: "/avatars/user1.png",
    role: "مستخدم",
    status: "نشط",
    createdAt: new Date(2023, 3, 15),
  },
  {
    id: 2,
    name: "سارة عبدالله",
    email: "sara@example.com",
    avatar: "/avatars/user2.png",
    role: "شريك",
    status: "نشط",
    createdAt: new Date(2023, 3, 18),
  },
  {
    id: 3,
    name: "خالد العمري",
    email: "khalid@example.com",
    avatar: "/avatars/user3.png",
    role: "مستخدم",
    status: "نشط",
    createdAt: new Date(2023, 3, 20),
  },
  {
    id: 4,
    name: "نورة السعيد",
    email: "noura@example.com",
    avatar: "/avatars/user4.png",
    role: "مستخدم",
    status: "معلق",
    createdAt: new Date(2023, 3, 22),
  },
]

export function AdminLatestUsers() {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={user.role === "شريك" ? "default" : "outline"} className="text-xs">
                  {user.role}
                </Badge>
                <Badge variant={user.status === "نشط" ? "success" : "secondary"} className="text-xs">
                  {user.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(user.createdAt, { addSuffix: true, locale: ar })}
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        عرض جميع المستخدمين
      </Button>
    </div>
  )
}
