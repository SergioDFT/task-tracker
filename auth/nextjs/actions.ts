"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { signInSchema, signUpSchema } from "./schemas"
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from "../core/passwordHasher"
import { cookies } from "next/headers"
import { createUserSession, removeUserFromSession } from "../core/session"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData)

  if (!success) return "Invalid username or password"

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (user == null || user.password == null || user.salt == null) {
    return "Invalid username or password"
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  })

  if (!isCorrectPassword) return "Invalid username or password"

  await createUserSession(user, await cookies())

  redirect("/")
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData)

  if (!success) return "Unable to create account"

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (existingUser != null) return "Account already exists"

  try {
    const salt = generateSalt()
    const hashedPassword = await hashPassword(data.password, salt)

    const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          salt: salt,
        },
        select: {
          id: true,
        },
      })
    if (user == null) return "Unable to create account"
    await createUserSession(user, await cookies())
  } catch {
    return "Unable to create account"
  }

  redirect("/")
}

export async function logOut() {
  await removeUserFromSession(await cookies())
  redirect("/")
}
