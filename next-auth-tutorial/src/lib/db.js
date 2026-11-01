// src/lib/db.js
import "server-only"; // client component import kare to build error aa jaye
import bcrypt from "bcryptjs";

// Sirf seekhne ke liye in-memory store. Server restart par data khatam.
// globalThis par rakhne se dev mein hot reload ke baad bhi data bacha rehta hai.
const users = globalThis.__users ?? (globalThis.__users = new Map()); // key: email

export async function findUserByEmail(email) {
  return users.get(email) ?? null;
}

export async function findUserById(id) {
  for (const user of users.values()) {
    if (user.id === id) return user;
  }
  return null;
}

export async function createUser({ name, email, password }) {
  const passwordHash = await bcrypt.hash(password, 12); // cost factor 12

  // RBAC: ADMIN_EMAILS mein jo email ho usko admin role milta hai
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash, // plain password KABHI store nahi karna
    role: adminEmails.includes(email) ? "admin" : "user",
    createdAt: new Date().toISOString(),
  };
  users.set(email, user);
  return user;
}

export async function verifyPassword(plainPassword, passwordHash) {
  return bcrypt.compare(plainPassword, passwordHash);
}

// Timing-safe login: user na mile tab bhi bcrypt chalane ke liye dummy hash
export const DUMMY_HASH = bcrypt.hashSync("timing-safe-dummy-password", 12);
