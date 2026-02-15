import { NextResponse } from "next/server";
import { requireAdminAccess } from "@/src/features/admin/auth";
import { getWaitlistRequests } from "@/src/lib/firebase/firestore";

export async function GET(req: Request) {
  const allowed = await requireAdminAccess(req);
  if (!allowed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const waitlist = await getWaitlistRequests();
  const roleCounts = waitlist.reduce<Record<string, number>>((acc, item) => {
    acc[item.targetRole] = (acc[item.targetRole] || 0) + 1;
    return acc;
  }, {});
  const serviceCounts = waitlist.reduce<Record<string, number>>((acc, item) => {
    acc[item.selectedService] = (acc[item.selectedService] || 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({
    totalWaitlistRequests: waitlist.length,
    roleCounts,
    serviceCounts,
    recent: waitlist.slice(0, 20),
  });
}
