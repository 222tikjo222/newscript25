"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check, Plus, Edit, Trash2, UserPlus, Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RolesPage() {
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false)
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [selectedRole, setSelectedRole] = useState<(typeof roles)[0] | null>(null)

  // بيانات وهمية للأدوار
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "مدير",
      description: "صلاحيات كاملة للوصول إلى جميع أجزاء النظام",
      usersCount: 2,
      permissions: {
        dashboard: true,
        users: true,
        cars: true,
        auctions: true,
        orders: true,
        settings: true,
        content: true,
        api: true,
        payments: true,
        reports: true,
      },
    },
    {
      id: 2,
      name: "مشرف",
      description: "صلاحيات للوصول إلى معظم أجزاء النظام باستثناء الإعدادات الحساسة",
      usersCount: 3,
      permissions: {
        dashboard: true,
        users: true,
        cars: true,
        auctions: true,
        orders: true,
        settings: false,
        content: true,
        api: false,
        payments: true,
        reports: true,
      },
    },
    {
      id: 3,
      name: "محرر محتوى",
      description: "صلاحيات لإدارة المحتوى والسيارات فقط",
      usersCount: 5,
      permissions: {
        dashboard: true,
        users: false,
        cars: true,
        auctions: false,
        orders: false,
        settings: false,
        content: true,
        api: false,
        payments: false,
        reports: false,
      },
    },
  ])

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: {
      dashboard: true,
      users: false,
      cars: false,
      auctions: false,
      orders: false,
      settings: false,
      content: false,
      api: false,
      payments: false,
      reports: false,
    },
  })

  const handleAddRole = () => {
    setIsSaving(true)

    // محاكاة عملية الحفظ
    setTimeout(() => {
      setIsSaving(false)
      setIsAddRoleDialogOpen(false)

      // إضافة الدور الجديد
      const newRoleWithId = {
        ...newRole,
        id: roles.length + 1,
        usersCount: 0,
      }
      setRoles([...roles, newRoleWithId])

      // إعادة تعيين نموذج الدور الجديد
      setNewRole({
        name: "",
        description: "",
        permissions: {
          dashboard: true,
          users: false,
          cars: false,
          auctions: false,
          orders: false,
          settings: false,
          content: false,
          api: false,
          payments: false,
          reports: false,
        },
      })

      // عرض رسالة النجاح
      setIsSaved(true)
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1500)
  }

  const handleEditRole = () => {
    setIsSaving(true)

    // محاكاة عملية الحفظ
    setTimeout(() => {
      setIsSaving(false)
      setIsEditRoleDialogOpen(false)

      if (selectedRole) {
        // تحديث الدور
        const updatedRoles = roles.map((role) => (role.id === selectedRole.id ? selectedRole : role))
        setRoles(updatedRoles)
      }

      // عرض رسالة النجاح
      setIsSaved(true)
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1500)
  }

  const handleDeleteRole = (id: number) => {
    // حذف الدور
    const updatedRoles = roles.filter((role) => role.id !== id)
    setRoles(updatedRoles)

    // عرض رسالة النجاح
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin className="hidden lg:flex" />
      <div className="flex-1 space-y-6 p-6 lg:pr-80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">الأدوار والصلاحيات</h1>
            <p className="text-muted-foreground">إدارة أدوار المستخدمين وصلاحياتهم في النظام</p>
          </div>
          <Button onClick={() => setIsAddRoleDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            إضافة دور جديد
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
            <CardTitle>الأدوار الحالية</CardTitle>
            <CardDescription>قائمة بجميع الأدوار المعرفة في النظام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>عدد المستخدمين</TableHead>
                    <TableHead>الصلاحيات</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <Users className="h-3 w-3" />
                          {role.usersCount}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(role.permissions).map(
                            ([key, value]) =>
                              value && (
                                <Badge key={key} variant="secondary" className="text-xs">
                                  {key}
                                </Badge>
                              ),
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedRole(role)
                              setIsEditRoleDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">تعديل</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteRole(role.id)}
                            disabled={role.usersCount > 0}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">حذف</span>
                          </Button>
                          <Button variant="outline" size="icon">
                            <UserPlus className="h-4 w-4" />
                            <span className="sr-only">إضافة مستخدم</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* نافذة إضافة دور جديد */}
        <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>إضافة دور جديد</DialogTitle>
              <DialogDescription>أدخل تفاصيل الدور الجديد وحدد الصلاحيات المسموح بها.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">اسم الدور</Label>
                <Input
                  id="role-name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="أدخل اسم الدور"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">وصف الدور</Label>
                <Input
                  id="role-description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="أدخل وصف الدور"
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>الصلاحيات</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="perm-dashboard"
                      checked={newRole.permissions.dashboard}
                      onCheckedChange={(checked) =>
                        setNewRole({
                          ...newRole,
                          permissions: { ...newRole.permissions, dashboard: checked },
                        })
                      }
                    />
                    <Label htmlFor="perm-dashboard">لوحة التحكم</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="perm-users"
                      checked={newRole.permissions.users}
                      onCheckedChange={(checked) =>
                        setNewRole({
                          ...newRole,
                          permissions: { ...newRole.permissions, users: checked },
                        })
                      }
                    />
                    <Label htmlFor="perm-users">إدارة المستخدمين</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="perm-cars"
                      checked={newRole.permissions.cars}
                      onCheckedChange={(checked) =>
                        setNewRole({
                          ...newRole,
                          permissions: { ...newRole.permissions, cars: checked },
                        })
                      }
                    />
                    <Label htmlFor="perm-cars">إدارة السيارات</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="perm-auctions"
                      checked={newRole.permissions.auctions}
                      onCheckedChange={(checked) =>
                        setNewRole({
                          ...newRole,
                          permissions: { ...newRole.permissions, auctions: checked },
                        })
                      }
                    />
                    <Label htmlFor="perm-auctions">إدارة المزادات</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="perm-orders"
                      checked={newRole.permissions.orders}
                      onCheckedChange={(checked) =>
                        setNewRole({
                          ...newRole,
                          permissions: { ...newRole.permissions, orders: checked },
                        })
                      }
                    />
                    <Label htmlFor="perm-orders">إدارة الطلبات</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="perm-settings"
                      checked={newRole.permissions.settings}
                      onCheckedChange={(checked) =>
                        setNewRole({
                          ...newRole,
                          permissions: { ...newRole.permissions, settings: checked },
                        })
                      }
                    />
                    <Label htmlFor="perm-settings">إعدادات النظام</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="perm-content"
                      checked={newRole.permissions.content}
                      onCheckedChange={(checked) =>
                        setNewRole({
                          ...newRole,
                          permissions: { ...newRole.permissions, content: checked },
                        })
                      }
                    />
                    <Label htmlFor="perm-content">إدارة المحتوى</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="perm-api"
                      checked={newRole.permissions.api}
                      onCheckedChange={(checked) =>
                        setNewRole({
                          ...newRole,
                          permissions: { ...newRole.permissions, api: checked },
                        })
                      }
                    />
                    <Label htmlFor="perm-api">إدارة API</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="perm-payments"
                      checked={newRole.permissions.payments}
                      onCheckedChange={(checked) =>
                        setNewRole({
                          ...newRole,
                          permissions: { ...newRole.permissions, payments: checked },
                        })
                      }
                    />
                    <Label htmlFor="perm-payments">إدارة المدفوعات</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="perm-reports"
                      checked={newRole.permissions.reports}
                      onCheckedChange={(checked) =>
                        setNewRole({
                          ...newRole,
                          permissions: { ...newRole.permissions, reports: checked },
                        })
                      }
                    />
                    <Label htmlFor="perm-reports">التقارير والإحصائيات</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddRoleDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddRole} disabled={isSaving}>
                {isSaving ? "جاري الحفظ..." : "إضافة الدور"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* نافذة تعديل الدور */}
        <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>تعديل الدور</DialogTitle>
              <DialogDescription>تعديل تفاصيل وصلاحيات الدور المحدد.</DialogDescription>
            </DialogHeader>
            {selectedRole && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role-name">اسم الدور</Label>
                  <Input
                    id="edit-role-name"
                    value={selectedRole.name}
                    onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
                    placeholder="أدخل اسم الدور"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role-description">وصف الدور</Label>
                  <Input
                    id="edit-role-description"
                    value={selectedRole.description}
                    onChange={(e) => setSelectedRole({ ...selectedRole, description: e.target.value })}
                    placeholder="أدخل وصف الدور"
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>الصلاحيات</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="edit-perm-dashboard"
                        checked={selectedRole.permissions.dashboard}
                        onCheckedChange={(checked) =>
                          setSelectedRole({
                            ...selectedRole,
                            permissions: { ...selectedRole.permissions, dashboard: checked },
                          })
                        }
                      />
                      <Label htmlFor="edit-perm-dashboard">لوحة التحكم</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="edit-perm-users"
                        checked={selectedRole.permissions.users}
                        onCheckedChange={(checked) =>
                          setSelectedRole({
                            ...selectedRole,
                            permissions: { ...selectedRole.permissions, users: checked },
                          })
                        }
                      />
                      <Label htmlFor="edit-perm-users">إدارة المستخدمين</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="edit-perm-cars"
                        checked={selectedRole.permissions.cars}
                        onCheckedChange={(checked) =>
                          setSelectedRole({
                            ...selectedRole,
                            permissions: { ...selectedRole.permissions, cars: checked },
                          })
                        }
                      />
                      <Label htmlFor="edit-perm-cars">إدارة السيارات</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="edit-perm-auctions"
                        checked={selectedRole.permissions.auctions}
                        onCheckedChange={(checked) =>
                          setSelectedRole({
                            ...selectedRole,
                            permissions: { ...selectedRole.permissions, auctions: checked },
                          })
                        }
                      />
                      <Label htmlFor="edit-perm-auctions">إدارة المزادات</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="edit-perm-orders"
                        checked={selectedRole.permissions.orders}
                        onCheckedChange={(checked) =>
                          setSelectedRole({
                            ...selectedRole,
                            permissions: { ...selectedRole.permissions, orders: checked },
                          })
                        }
                      />
                      <Label htmlFor="edit-perm-orders">إدارة الطلبات</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="edit-perm-settings"
                        checked={selectedRole.permissions.settings}
                        onCheckedChange={(checked) =>
                          setSelectedRole({
                            ...selectedRole,
                            permissions: { ...selectedRole.permissions, settings: checked },
                          })
                        }
                      />
                      <Label htmlFor="edit-perm-settings">إعدادات النظام</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="edit-perm-content"
                        checked={selectedRole.permissions.content}
                        onCheckedChange={(checked) =>
                          setSelectedRole({
                            ...selectedRole,
                            permissions: { ...selectedRole.permissions, content: checked },
                          })
                        }
                      />
                      <Label htmlFor="edit-perm-content">إدارة المحتوى</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="edit-perm-api"
                        checked={selectedRole.permissions.api}
                        onCheckedChange={(checked) =>
                          setSelectedRole({
                            ...selectedRole,
                            permissions: { ...selectedRole.permissions, api: checked },
                          })
                        }
                      />
                      <Label htmlFor="edit-perm-api">إدارة API</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="edit-perm-payments"
                        checked={selectedRole.permissions.payments}
                        onCheckedChange={(checked) =>
                          setSelectedRole({
                            ...selectedRole,
                            permissions: { ...selectedRole.permissions, payments: checked },
                          })
                        }
                      />
                      <Label htmlFor="edit-perm-payments">إدارة المدفوعات</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="edit-perm-reports"
                        checked={selectedRole.permissions.reports}
                        onCheckedChange={(checked) =>
                          setSelectedRole({
                            ...selectedRole,
                            permissions: { ...selectedRole.permissions, reports: checked },
                          })
                        }
                      />
                      <Label htmlFor="edit-perm-reports">التقارير والإحصائيات</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleEditRole} disabled={isSaving}>
                {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
