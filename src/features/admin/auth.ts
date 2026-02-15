import { auth } from "@clerk/nextjs/server";

export async function requireAdminAccess(req?: Request) {
  const { userId } = await auth();
  if (!userId) return false;

  if (!req) return true;

  const password = req.headers.get("x-admin-password") || new URL(req.url).searchParams.get("password");
  return password === process.env.ADMIN_PASSWORD;
}
