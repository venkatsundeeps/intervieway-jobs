"use client";

import Link from "next/link";
import { useState } from "react";
import { EXPERIENCE_LEVELS } from "@/src/lib/utils/constants";
import { Input, PrimaryButton, Textarea } from "@/src/components/ui";

export function BookingForm({
  role,
  service,
  available,
}: {
  role: string;
  service: string;
  available: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong.");
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        Request received. We will contact you soon.
        <Link href="/roles" className="ml-2 font-semibold underline">Browse available roles</Link>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-3">
      <input type="hidden" name="targetRole" value={role} />
      <input type="hidden" name="selectedService" value={service} />
      <Input name="fullName" placeholder="Full name" required />
      <Input name="email" type="email" placeholder="Email" required />

      {available ? (
        <>
          <Input name="preferredDate" type="date" />
          <Input name="preferredTime" type="time" />
        </>
      ) : (
        <>
          <select
            name="experienceLevel"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            defaultValue=""
          >
            <option value="" disabled>
              Select experience level
            </option>
            {EXPERIENCE_LEVELS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Textarea name="notes" placeholder="Notes (optional)" rows={4} />
        </>
      )}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <PrimaryButton type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : available ? "Confirm Booking" : "Join Waitlist"}
      </PrimaryButton>
    </form>
  );
}
