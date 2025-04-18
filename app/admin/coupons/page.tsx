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
import { Check, Copy, Plus, Trash2, Edit, RefreshCw } from "lucide-react"
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

export default function CouponsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<(typeof coupons)[0] | null>(null)
  const [isCopied, setIsCopied] = useState<string | null>(null)

  // بيانات وهمية للكوبونات
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "WELCOME20",
      discount_type: "percentage",
      discount_value: 20,
      min_purchase: 1000,
      max_discount: 500,
      usage_limit: 100,
      used_count: 45,
      start_date: "2023-08-01",
      end_date: "2023-09-30",
      is_active: true,
    },
    {
      id: 2,
      code: "SUMMER50",
      discount_type: "percentage",
      discount_value: 50,
      min_purchase: 5000,
      max_discount: 1000,
      usage_limit: 50,
      used_count: 12,
      start_date: "2023-07-15",
      end_date: "2023-08-15",
      is_active: false,
    },
    {
      id: 3,
      code: "FLAT100",
      discount_type: "fixed",
      discount_value: 100,
      min_purchase: 500,
      max_discount: null,
      usage_limit: 200,
      used_count: 0,
      start_date: "2023-08-01",
      end_date: "2023-12-31",
      is_active: true,
    },
  ])

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount_type: "percentage",
    discount_value: 10,
    min_purchase: 0,
    max_discount: null,
    usage_limit: 100,
    start_date: "",
    end_date: "",
    is_active: true,
  })

  const handleAddCoupon = () => {
    setIsSaving(true)

    // محاكاة عملية الحفظ
    setTimeout(() => {
      setIsSaving(false)
      setIsAddDialogOpen(false)

      // إضافة الكوبون الجديد
      const newCouponWithId = {
        ...newCoupon,
        id: coupons.length + 1,
        used_count: 0,
      }
      setCoupons([...coupons, newCouponWithId])

      // إعادة تعيين نموذج الكوبون الجديد
      setNewCoupon({
        code: "",
        discount_type: "percentage",
        discount_value: 10,
        min_purchase: 0,
        max_discount: null,
        usage_limit: 100,
        start_date: "",
        end_date: "",
        is_active: true,
      })

      // عرض رسالة النجاح
      setIsSaved(true)
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1500)
  }

  const handleEditCoupon = () => {
    setIsSaving(true)

    // محاكاة عملية الحفظ
    setTimeout(() => {
      setIsSaving(false)
      setIsEditDialogOpen(false)

      if (selectedCoupon) {
        // تحديث الكوبون
        const updatedCoupons = coupons.map((coupon) => (coupon.id === selectedCoupon.id ? selectedCoupon : coupon))
        setCoupons(updatedCoupons)
      }

      // عرض رسالة النجاح
      setIsSaved(true)
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1500)
  }

  const handleDeleteCoupon = (id: number) => {
    // حذف الكوبون
    const updatedCoupons = coupons.filter((coupon) => coupon.id !== id)
    setCoupons(updatedCoupons)

    // عرض رسالة النجاح
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code)
    setIsCopied(code)

    // إعادة تعيين حالة النسخ بعد 2 ثانية
    setTimeout(() => {
      setIsCopied(null)
    }, 2000)
  }

  const generateRandomCoupon = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin className="hidden lg:flex" />
      <div className="flex-1 space-y-6 p-6 lg:pr-80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">إدارة الكوبونات</h1>
            <p className="text-muted-foreground">إنشاء وإدارة كوبونات الخصم للموقع</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            إضافة كوبون جديد
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
            <CardTitle>الكوبونات الحالية</CardTitle>
            <CardDescription>قائمة بجميع كوبونات الخصم المضافة إلى الموقع</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>كود الكوبون</TableHead>
                    <TableHead>نوع الخصم</TableHead>
                    <TableHead>قيمة الخصم</TableHead>
                    <TableHead>الحد الأدنى للشراء</TableHead>
                    <TableHead>الاستخدامات</TableHead>
                    <TableHead>تاريخ الانتهاء</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {coupon.code}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyCoupon(coupon.code)}
                            className="h-6 w-6"
                          >
                            {isCopied === coupon.code ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{coupon.discount_type === "percentage" ? "نسبة مئوية" : "مبلغ ثابت"}</TableCell>
                      <TableCell>
                        {coupon.discount_type === "percentage"
                          ? `${coupon.discount_value}%`
                          : `${coupon.discount_value} ريال`}
                      </TableCell>
                      <TableCell>{coupon.min_purchase > 0 ? `${coupon.min_purchase} ريال` : "-"}</TableCell>
                      <TableCell>
                        {coupon.used_count}/{coupon.usage_limit}
                      </TableCell>
                      <TableCell>{new Date(coupon.end_date).toLocaleDateString("ar-SA")}</TableCell>
                      <TableCell>
                        <Badge variant={coupon.is_active ? "success" : "secondary"}>
                          {coupon.is_active ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedCoupon(coupon)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteCoupon(coupon.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              حذف
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

        {/* نافذة إضافة كوبون جديد */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>إضافة كوبون جديد</DialogTitle>
              <DialogDescription>أدخل تفاصيل الكوبون الجديد الذي تريد إضافته إلى الموقع.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  كود الكوبون
                </Label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    id="code"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    placeholder="أدخل كود الكوبون"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setNewCoupon({ ...newCoupon, code: generateRandomCoupon() })}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discount_type" className="text-right">
                  نوع الخصم
                </Label>
                <Select
                  value={newCoupon.discount_type}
                  onValueChange={(value) => setNewCoupon({ ...newCoupon, discount_type: value })}
                >
                  <SelectTrigger id="discount_type" className="col-span-3">
                    <SelectValue placeholder="اختر نوع الخصم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">نسبة مئوية</SelectItem>
                    <SelectItem value="fixed">مبلغ ثابت</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discount_value" className="text-right">
                  قيمة الخصم
                </Label>
                <Input
                  id="discount_value"
                  type="number"
                  value={newCoupon.discount_value}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discount_value: Number(e.target.value) })}
                  placeholder="أدخل قيمة الخصم"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="min_purchase" className="text-right">
                  الحد الأدنى للشراء
                </Label>
                <Input
                  id="min_purchase"
                  type="number"
                  value={newCoupon.min_purchase}
                  onChange={(e) => setNewCoupon({ ...newCoupon, min_purchase: Number(e.target.value) })}
                  placeholder="أدخل الحد الأدنى للشراء"
                  className="col-span-3"
                />
              </div>
              {newCoupon.discount_type === "percentage" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="max_discount" className="text-right">
                    الحد الأقصى للخصم
                  </Label>
                  <Input
                    id="max_discount"
                    type="number"
                    value={newCoupon.max_discount || ""}
                    onChange={(e) =>
                      setNewCoupon({
                        ...newCoupon,
                        max_discount: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    placeholder="أدخل الحد الأقصى للخصم (اختياري)"
                    className="col-span-3"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="usage_limit" className="text-right">
                  عدد الاستخدامات
                </Label>
                <Input
                  id="usage_limit"
                  type="number"
                  value={newCoupon.usage_limit}
                  onChange={(e) => setNewCoupon({ ...newCoupon, usage_limit: Number(e.target.value) })}
                  placeholder="أدخل عدد الاستخدامات المسموح بها"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start_date" className="text-right">
                  تاريخ البدء
                </Label>
                <Input
                  id="start_date"
                  type="date"
                  value={newCoupon.start_date}
                  onChange={(e) => setNewCoupon({ ...newCoupon, start_date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end_date" className="text-right">
                  تاريخ الانتهاء
                </Label>
                <Input
                  id="end_date"
                  type="date"
                  value={newCoupon.end_date}
                  onChange={(e) => setNewCoupon({ ...newCoupon, end_date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="is_active" className="text-right">
                  نشط
                </Label>
                <div className="col-span-3 flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch
                    id="is_active"
                    checked={newCoupon.is_active}
                    onCheckedChange={(checked) => setNewCoupon({ ...newCoupon, is_active: checked })}
                  />
                  <Label htmlFor="is_active">تفعيل الكوبون</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddCoupon} disabled={isSaving}>
                {isSaving ? "جاري الحفظ..." : "إضافة الكوبون"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* نافذة تعديل الكوبون */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>تعديل الكوبون</DialogTitle>
              <DialogDescription>تعديل تفاصيل الكوبون المحدد.</DialogDescription>
            </DialogHeader>
            {selectedCoupon && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-code" className="text-right">
                    كود الكوبون
                  </Label>
                  <div className="col-span-3 flex gap-2">
                    <Input
                      id="edit-code"
                      value={selectedCoupon.code}
                      onChange={(e) => setSelectedCoupon({ ...selectedCoupon, code: e.target.value.toUpperCase() })}
                      placeholder="أدخل كود الكوبون"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedCoupon({ ...selectedCoupon, code: generateRandomCoupon() })}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-discount_type" className="text-right">
                    نوع الخصم
                  </Label>
                  <Select
                    value={selectedCoupon.discount_type}
                    onValueChange={(value) => setSelectedCoupon({ ...selectedCoupon, discount_type: value })}
                  >
                    <SelectTrigger id="edit-discount_type" className="col-span-3">
                      <SelectValue placeholder="اختر نوع الخصم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">نسبة مئوية</SelectItem>
                      <SelectItem value="fixed">مبلغ ثابت</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-discount_value" className="text-right">
                    قيمة الخصم
                  </Label>
                  <Input
                    id="edit-discount_value"
                    type="number"
                    value={selectedCoupon.discount_value}
                    onChange={(e) => setSelectedCoupon({ ...selectedCoupon, discount_value: Number(e.target.value) })}
                    placeholder="أدخل قيمة الخصم"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-min_purchase" className="text-right">
                    الحد الأدنى للشراء
                  </Label>
                  <Input
                    id="edit-min_purchase"
                    type="number"
                    value={selectedCoupon.min_purchase}
                    onChange={(e) => setSelectedCoupon({ ...selectedCoupon, min_purchase: Number(e.target.value) })}
                    placeholder="أدخل الحد الأدنى للشراء"
                    className="col-span-3"
                  />
                </div>
                {selectedCoupon.discount_type === "percentage" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-max_discount" className="text-right">
                      الحد الأقصى للخصم
                    </Label>
                    <Input
                      id="edit-max_discount"
                      type="number"
                      value={selectedCoupon.max_discount || ""}
                      onChange={(e) =>
                        setSelectedCoupon({
                          ...selectedCoupon,
                          max_discount: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                      placeholder="أدخل الحد الأقصى للخصم (اختياري)"
                      className="col-span-3"
                    />
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-usage_limit" className="text-right">
                    عدد الاستخدامات
                  </Label>
                  <Input
                    id="edit-usage_limit"
                    type="number"
                    value={selectedCoupon.usage_limit}
                    onChange={(e) => setSelectedCoupon({ ...selectedCoupon, usage_limit: Number(e.target.value) })}
                    placeholder="أدخل عدد الاستخدامات المسموح بها"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-start_date" className="text-right">
                    تاريخ البدء
                  </Label>
                  <Input
                    id="edit-start_date"
                    type="date"
                    value={selectedCoupon.start_date}
                    onChange={(e) => setSelectedCoupon({ ...selectedCoupon, start_date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-end_date" className="text-right">
                    تاريخ الانتهاء
                  </Label>
                  <Input
                    id="edit-end_date"
                    type="date"
                    value={selectedCoupon.end_date}
                    onChange={(e) => setSelectedCoupon({ ...selectedCoupon, end_date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-is_active" className="text-right">
                    نشط
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2 rtl:space-x-reverse">
                    <Switch
                      id="edit-is_active"
                      checked={selectedCoupon.is_active}
                      onCheckedChange={(checked) => setSelectedCoupon({ ...selectedCoupon, is_active: checked })}
                    />
                    <Label htmlFor="edit-is_active">تفعيل الكوبون</Label>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleEditCoupon} disabled={isSaving}>
                {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
