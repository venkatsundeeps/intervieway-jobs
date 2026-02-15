import { cn } from "@/src/lib/utils/helpers";
import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900", props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn("w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900", props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn("w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900", props.className)} />;
}

export function PrimaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50",
        props.className,
      )}
    >
      {children}
    </button>
  );
}
