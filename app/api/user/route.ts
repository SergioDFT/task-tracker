import { getCurrentUser } from "@/auth/nextjs/currentUser"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const user = await getCurrentUser({ withFullUser: false })
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json(user, { status: 200 }) // explicitly return 200
  } catch (err) {
    console.error("Error in /api/user:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
