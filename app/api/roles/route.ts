import { NextResponse } from "next/server";
import { getActiveProfessionals } from "@/src/lib/firebase/firestore";

export async function GET() {
  const roles = await getActiveProfessionals();
  return NextResponse.json({ roles: roles.map((item) => ({ roleTitle: item.roleTitle, roleSlug: item.roleSlug })) });
}
