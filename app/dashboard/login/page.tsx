import { redirect } from "next/navigation"

export default function DashboardLoginRedirect() {
  redirect("/admin/login")
  return null
}
