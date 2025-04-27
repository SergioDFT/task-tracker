import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, username, email_addresses } = evt.data;
    console.log("Our User ", id, username, email_addresses);
    //call server action to create user to database
    await prisma.user.create({
      data: {
        clerkUserId: id,
        username: username,
        email: email_addresses[0].email_address,
      },
    });
    NextResponse.json("User created",{ status: 200 });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    console.log("Our deleted user details:", id);

    //call server action to delete user from database
    await prisma.user.delete({
      where: {
        clerkUserId: id,
      },
    });
    NextResponse.json("deleted successfully",{ status: 200 });
  }

  if (eventType === "user.updated") {
    const { id, username, email_addresses } = evt.data;

    //call server action to update user on the database
    await prisma.user.update({
      where: {
        clerkUserId: id,
      },
      data: {
        username: username,
        email: email_addresses[0].email_address,
      },
    });
  }

  return new Response("updated successfully", { status: 200 });
}
