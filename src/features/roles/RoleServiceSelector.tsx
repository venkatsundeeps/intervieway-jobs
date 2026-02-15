"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton, Select } from "@/src/components/ui";
import { SERVICE_OPTIONS } from "@/src/lib/utils/constants";

export function RoleServiceSelector({
  roles,
}: {
  roles: Array<{ roleTitle: string }>;
}) {
  const router = useRouter();
  const [role, setRole] = useState(roles[0]?.roleTitle ?? "");
  const [service, setService] = useState<string>(SERVICE_OPTIONS[0]);

  const isAvailable = useMemo(() => roles.some((item) => item.roleTitle === role), [roles, role]);

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <Select value={role} onChange={(e) => setRole(e.target.value)}>
        {[...new Set([...roles.map((item) => item.roleTitle), "Marketing", "Mechanical Engineer", "Data Analyst"])].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
      <Select value={service} onChange={(e) => setService(e.target.value)}>
        {SERVICE_OPTIONS.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
      <PrimaryButton
        className="w-full"
        onClick={() => router.push(`/book?role=${encodeURIComponent(role)}&service=${encodeURIComponent(service)}`)}
      >
        {isAvailable ? "Book Now" : "Join Waitlist"}
      </PrimaryButton>
    </div>
  );
}
