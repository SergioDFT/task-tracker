import { cookies } from "next/headers"
import { getUserFromSession } from "../core/session"
import { cache } from "react"
import { redirect } from "next/navigation"

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>

type User = Exclude<
  Awaited<ReturnType<typeof getUserFromSession>>,
  undefined | null
>

function _getCurrentUser(options: {
  withFullUser: true
  redirectIfNotFound: true
}): Promise<FullUser>
function _getCurrentUser(options: {
  withFullUser: true
  redirectIfNotFound?: false
}): Promise<FullUser | null>
function _getCurrentUser(options: {
  withFullUser?: false
  redirectIfNotFound: true
}): Promise<User>
function _getCurrentUser(options?: {
  withFullUser?: false
  redirectIfNotFound?: false
}): Promise<User | null>
async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false,
} = {}) {
  const user = await getUserFromSession(await cookies())

  if (user == null) {
    if (redirectIfNotFound) return redirect("/sign-in")
    return null
  }

  if (withFullUser) {
    const fullUser = await getUserFromDb(user.id)
    if (fullUser == null) throw new Error("User not found in database")
    return fullUser
  }

  return user
}

export const getCurrentUser = cache(_getCurrentUser)

function getUserFromDb(id: string) {
  return prisma.user.findUnique({
    where: { id: id },
  })
}