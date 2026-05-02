"use client";

import { useState, useTransition } from "react";
import { submitRemovalRequest } from "./actions";

export function RemovalForm() {
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "ok" }
    | { kind: "error"; msg: string }
  >({ kind: "idle" });
  const [pending, start] = useTransition();

  if (status.kind === "ok") {
    return (
      <div className="text-center">
        <p className="font-display text-2xl text-ocean">Got it.</p>
        <p className="mt-3 text-[14px] text-muted">
          We&apos;ll verify your request and remove the listing within 24
          hours. We&apos;ll email you a confirmation when it&apos;s done.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        start(async () => {
          const res = await submitRemovalRequest(fd);
          if (res.ok) setStatus({ kind: "ok" });
          else setStatus({ kind: "error", msg: res.error });
        });
      }}
      className="space-y-4"
    >
      <div className="space-y-1.5">
        <label htmlFor="property" className="text-[12px] uppercase tracking-[0.18em] text-muted">
          Property name
        </label>
        <input
          id="property"
          name="property"
          required
          maxLength={200}
          className="w-full rounded-md border border-ocean/15 bg-white px-3 py-2 text-[15px] focus:border-lagoon focus:outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="role" className="text-[12px] uppercase tracking-[0.18em] text-muted">
          Your role at the property
        </label>
        <select
          id="role"
          name="role"
          required
          className="w-full rounded-md border border-ocean/15 bg-white px-3 py-2 text-[15px] focus:border-lagoon focus:outline-none"
        >
          <option value="">Select…</option>
          <option value="owner">Owner</option>
          <option value="manager">Manager</option>
          <option value="authorized">Authorized representative</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-[12px] uppercase tracking-[0.18em] text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          className="w-full rounded-md border border-ocean/15 bg-white px-3 py-2 text-[15px] focus:border-lagoon focus:outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-[12px] uppercase tracking-[0.18em] text-muted">
          Notes (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          className="w-full rounded-md border border-ocean/15 bg-white px-3 py-2 text-[15px] focus:border-lagoon focus:outline-none"
        />
      </div>

      {status.kind === "error" && (
        <p className="text-[13px] text-coral">{status.msg}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ocean px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-lagoon disabled:opacity-60"
      >
        {pending ? "Sending…" : "Submit removal request"}
      </button>

      <p className="text-[12px] text-muted">
        Verified requests are honoured within 24 hours.
      </p>
    </form>
  );
}
