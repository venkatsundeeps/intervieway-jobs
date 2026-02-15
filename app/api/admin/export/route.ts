import { NextResponse } from "next/server";
import { requireAdminAccess } from "@/src/features/admin/auth";
import { getWaitlistRequests } from "@/src/lib/firebase/firestore";

export async function GET(req: Request) {
  const allowed = await requireAdminAccess(req);
  if (!allowed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await getWaitlistRequests();
  const header = ["fullName", "email", "targetRole", "experienceLevel", "selectedService", "notes", "sourcePage", "createdAt"];
  const csv = [
    header.join(","),
    ...rows.map((item) =>
      [item.fullName, item.email, item.targetRole, item.experienceLevel, item.selectedService, item.notes, item.sourcePage, item.createdAt]
        .map((value) => `"${String(value || "").replaceAll('"', '""')}"`)
        .join(","),
    ),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=intervieway-waitlist.csv",
    },
  });
}
