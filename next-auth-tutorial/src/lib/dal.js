// src/lib/dal.js  (Data Access Layer: asli gatekeeper)
import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findUserById } from "@/lib/db";

// cache(): ek request mein 5 jagah call ho tab bhi ek hi baar chalega
export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session?.userId) redirect("/login");
  return { userId: session.userId, role: session.role };
});

// DTO: sirf yeh fields server se bahar jaate hain (passwordHash nahi!)
function toPublicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export const getCurrentUser = cache(async () => {
  const { userId } = await verifySession();
  const user = await findUserById(userId);
  if (!user) redirect("/login"); // cookie ke baad account delete ho gaya
  return toPublicUser(user);
});

// RBAC: role database se fresh aata hai (cookie ka role 7 din purana ho sakta hai)
export const requireAdmin = cache(async () => {
  const user = await getCurrentUser();
  if (user.role !== "admin") redirect("/dashboard");
  return user;
});
