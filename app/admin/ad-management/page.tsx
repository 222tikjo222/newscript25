"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, Upload, Trash2, Edit, Plus, ImageIcon, ExternalLink, MoreHorizontal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdManagementPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [selectedAd, setSelectedAd] = useState<(typeof ads)[0] | null>(null)

  // بيانات وهمية للإعلانات
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "عرض خاص على السيارات الفاخرة",
      image: "/placeholder.svg",
      url: "https://example.com/special-offer",
      location: "home_top",
      isActive: true,
      startDate: "2023-08-01",
      endDate: "2023-09-01",
      clicks: 245,
      impressions: 1250,
    },
    {
      id: 2,
      title: "خصم 10% على جميع السيارات",
      image: "/placeholder.svg",
      url: "https://example.com/discount",
      location: "cars_sidebar",
      isActive: true,
      startDate: "2023-08-15",
      endDate: "2023-09-15",
      clicks: 120,
      impressions: 980,
    },
    {
      id: 3,
      title: "مزاد خاص على السيارات الكلاسيكية",
      image: "/placeholder.svg",
      url: "https://example.com/classic-auction",
      location: "auctions_page",
      isActive: false,
      startDate: "2023-09-01",
      endDate: "2023-10-01",
      clicks: 0,
      impressions: 0,
    },
  ])

  const [newAd, setNewAd] = useState({
    title: "",
    image: "",
    url: "",
    location: "home_top",
    isActive: true,
    startDate: "",
    endDate: "",
  })

  const handleAddAd = () => {
    setIsSaving(true)

    // محاكاة عملية الحفظ
    setTimeout(() => {
      setIsSaving(false)
      setIsAddDialogOpen(false)

      // إضافة الإعلان الجديد
      const newAdWithId = {
        ...newAd,
        id: ads.length + 1,
        clicks: 0,
        impressions: 0,
      }
      setAds([...ads, newAdWithId])

      // إعادة تعيين نموذج الإعلان الجديد
      setNewAd({
        title: "",
        image: "",
        url: "",
        location: "home_top",
        isActive: true,
        startDate: "",
        endDate: "",
      })

      // عرض رسالة النجاح
      setIsSaved(true)
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1500)
  }

  const handleEditAd = () => {
    setIsSaving(true)

    // محاكاة عملية الحفظ
    setTimeout(() => {
      setIsSaving(false)
      setIsEditDialogOpen(false)

      if (selectedAd) {
        // تحديث الإعلان
        const updatedAds = ads.map((ad) => (ad.id === selectedAd.id ? selectedAd : ad))
        setAds(updatedAds)
      }

      // عرض رسالة النجاح
      setIsSaved(true)
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1500)
  }

  const handleDeleteAd = (id: number) => {
    // حذف الإعلان
    const updatedAds = ads.filter((ad) => ad.id !== id)
    setAds(updatedAds)

    // عرض رسالة النجاح
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  const getLocationName = (location: string) => {
    switch (location) {
      case "home_top":
        return "أعلى الصفحة الرئيسية"
      case "home_bottom":
        return "أسفل الصفحة الرئيسية"
      case "cars_sidebar":
        return "الشريط الجانبي لصفحة السيارات"
      case "auctions_page":
        return "صفحة المزادات"
      default:
        return location
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin className="hidden lg:flex" />
      <div className="flex-1 space-y-6 p-6 lg:pr-80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">إدارة الإعلانات</h1>
            <p className="text-muted-foreground">إدارة وتخصيص الإعلانات التي تظهر في الموقع</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            إضافة إعلان جديد
          </Button>
        </div>

        {isSaved && (
          <Alert className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300">
            <Check className="h-4 w-4" />
            <AlertTitle>تم بنجاح!</AlertTitle>
            <AlertDescription>تم حفظ التغييرات بنجاح.</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>الإعلانات الحالية</CardTitle>
            <CardDescription>قائمة بجميع الإعلانات المضافة إلى الموقع</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العنوان</TableHead>
                    <TableHead>الصورة</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>النقرات</TableHead>
                    <TableHead>المشاهدات</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ads.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell className="font-medium">{ad.title}</TableCell>
                      <TableCell>
                        <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted">
                          <ImageIcon className="h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell>{getLocationName(ad.location)}</TableCell>
                      <TableCell>
                        <Badge variant={ad.isActive ? "success" : "secondary"}>{ad.isActive ? "نشط" : "غير نشط"}</Badge>
                      </TableCell>
                      <TableCell>{ad.clicks}</TableCell>
                      <TableCell>{ad.impressions}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">القائمة</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedAd(ad)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteAd(ad.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              حذف
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href={ad.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                فتح الرابط
                              </a>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* نافذة إضافة إعلان جديد */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>إضافة إعلان جديد</DialogTitle>
              <DialogDescription>أدخل تفاصيل الإعلان الجديد الذي تريد إضافته إلى الموقع.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الإعلان</Label>
                <Input
                  id="title"
                  value={newAd.title}
                  onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                  placeholder="أدخل عنوان الإعلان"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">صورة الإعلان</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    value={newAd.image}
                    onChange={(e) => setNewAd({ ...newAd, image: e.target.value })}
                    placeholder="اختر صورة الإعلان"
                    disabled
                  />
                  <Button variant="outline" type="button">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">رابط الإعلان</Label>
                <Input
                  id="url"
                  value={newAd.url}
                  onChange={(e) => setNewAd({ ...newAd, url: e.target.value })}
                  placeholder="أدخل الرابط الذي سينتقل إليه المستخدم عند النقر على الإعلان"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">موقع الإعلان</Label>
                <Select value={newAd.location} onValueChange={(value) => setNewAd({ ...newAd, location: value })}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="اختر موقع الإعلان" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home_top">أعلى الصفحة الرئيسية</SelectItem>
                    <SelectItem value="home_bottom">أسفل الصفحة الرئيسية</SelectItem>
                    <SelectItem value="cars_sidebar">الشريط الجانبي لصفحة السيارات</SelectItem>
                    <SelectItem value="auctions_page">صفحة المزادات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="isActive"
                  checked={newAd.isActive}
                  onCheckedChange={(checked) => setNewAd({ ...newAd, isActive: checked })}
                />
                <Label htmlFor="isActive">تفعيل الإعلان</Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">تاريخ البدء</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newAd.startDate}
                    onChange={(e) => setNewAd({ ...newAd, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">تاريخ الانتهاء</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newAd.endDate}
                    onChange={(e) => setNewAd({ ...newAd, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddAd} disabled={isSaving}>
                {isSaving ? "جاري الحفظ..." : "إضافة الإعلان"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* نافذة تعديل الإعلان */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>تعديل الإعلان</DialogTitle>
              <DialogDescription>تعديل تفاصيل الإعلان المحدد.</DialogDescription>
            </DialogHeader>
            {selectedAd && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">عنوان الإعلان</Label>
                  <Input
                    id="edit-title"
                    value={selectedAd.title}
                    onChange={(e) => setSelectedAd({ ...selectedAd, title: e.target.value })}
                    placeholder="أدخل عنوان الإعلان"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-image">صورة الإعلان</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="edit-image"
                      value={selectedAd.image}
                      onChange={(e) => setSelectedAd({ ...selectedAd, image: e.target.value })}
                      placeholder="اختر صورة الإعلان"
                      disabled
                    />
                    <Button variant="outline" type="button">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-url">رابط الإعلان</Label>
                  <Input
                    id="edit-url"
                    value={selectedAd.url}
                    onChange={(e) => setSelectedAd({ ...selectedAd, url: e.target.value })}
                    placeholder="أدخل الرابط الذي سينتقل إليه المستخدم عند النقر على الإعلان"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">موقع الإعلان</Label>
                  <Select
                    value={selectedAd.location}
                    onValueChange={(value) => setSelectedAd({ ...selectedAd, location: value })}
                  >
                    <SelectTrigger id="edit-location">
                      <SelectValue placeholder="اختر موقع الإعلان" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home_top">أعلى الصفحة الرئيسية</SelectItem>
                      <SelectItem value="home_bottom">أسفل الصفحة الرئيسية</SelectItem>
                      <SelectItem value="cars_sidebar">الشريط الجانبي لصفحة السيارات</SelectItem>
                      <SelectItem value="auctions_page">صفحة المزادات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch
                    id="edit-isActive"
                    checked={selectedAd.isActive}
                    onCheckedChange={(checked) => setSelectedAd({ ...selectedAd, isActive: checked })}
                  />
                  <Label htmlFor="edit-isActive">تفعيل الإعلان</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-startDate">تاريخ البدء</Label>
                    <Input
                      id="edit-startDate"
                      type="date"
                      value={selectedAd.startDate}
                      onChange={(e) => setSelectedAd({ ...selectedAd, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-endDate">تاريخ الانتهاء</Label>
                    <Input
                      id="edit-endDate"
                      type="date"
                      value={selectedAd.endDate}
                      onChange={(e) => setSelectedAd({ ...selectedAd, endDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleEditAd} disabled={isSaving}>
                {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
