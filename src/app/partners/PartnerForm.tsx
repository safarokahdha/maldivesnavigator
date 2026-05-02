"use client";

import { useState, useTransition } from "react";
import { submitPartner, type SubmitResult } from "./actions";

const KINDS = [
  { value: "guesthouse", label: "Guesthouse" },
  { value: "resort", label: "Resort" },
  { value: "villa", label: "Private villa" },
  { value: "airbnb", label: "Airbnb / apartment" },
  { value: "liveaboard", label: "Liveaboard" },
  { value: "dive-centre", label: "Dive centre" },
  { value: "excursion-operator", label: "Excursion operator" },
  { value: "restaurant", label: "Restaurant / café" },
  { value: "other", label: "Something else" },
];

const TIER_INTERESTS = [
  { value: "free", label: "Free directory listing" },
  { value: "verified", label: "Verified — $99 / yr" },
  { value: "featured", label: "Featured — $299 / yr" },
  { value: "sponsor", label: "Sponsor — let's talk" },
  { value: "unsure", label: "Not sure yet" },
];

export function PartnerForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<SubmitResult | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    startTransition(async () => {
      const res = await submitPartner(fd);
      setResult(res);
      if (res.ok) form.reset();
    });
  }

  if (result?.ok) {
    return (
      <div className="rounded-[28px] border border-lagoon/30 bg-lagoon/10 p-8 text-ocean">
        <div className="eyebrow text-lagoon">Submission received</div>
        <h3 className="mt-3 font-display text-3xl font-semibold">You're on the shortlist. ⚓</h3>
        <p className="mt-4 text-[15px] leading-relaxed">
          We review every submission by hand and publish the ones that fit our journal voice —
          honest, welcoming, Maldives-first. Expect to hear from us within 5–7 days.
        </p>
        {result.mailtoHref && (
          <p className="mt-4 text-[14px]">
            Our server storage is still being set up — please also email us a copy so nothing is
            lost:{" "}
            <a href={result.mailtoHref} className="font-semibold underline">
              email your submission
            </a>
            .
          </p>
        )}
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-6 rounded-full border border-ocean/20 px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-ocean hover:bg-ocean/5"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className="rounded-[28px] border border-ocean/10 bg-white p-6 shadow-[0_1px_0_rgba(10,42,51,0.05)] md:p-10"
    >
      {/* Honeypot */}
      <label className="sr-only" aria-hidden>
        Company (leave blank)
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="eyebrow">Listing application</div>
      <h2 className="mt-2 font-display text-3xl font-semibold text-ocean md:text-4xl">
        Tell us about your place
      </h2>
      <p className="mt-2 text-[14px] text-muted">
        Takes 2 minutes. Fields marked <span className="text-coral">*</span> are required.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Field label="Property type *" name="kind" type="select" options={KINDS} required />
        <Field label="Property name *" name="business" placeholder="Arena Beach Hotel" required />
        <Field label="Owner name *" name="contactName" placeholder="Ibrahim N." required />
        <Field label="Email *" name="email" type="email" placeholder="you@business.com" required />
        <Field label="WhatsApp" name="phone" placeholder="+960 ..." />
        <Field label="Website / Instagram" name="website" placeholder="https://" />
        <Field label="Island *" name="island" placeholder="Maafushi" required />
        <Field label="Atoll" name="atoll" placeholder="Kaafu" />
        <Field
          label="Tier interest *"
          name="tierInterest"
          type="select"
          options={TIER_INTERESTS}
          required
        />
        <Field
          label="Starting price / night (USD)"
          name="priceFrom"
          placeholder="$55"
        />
      </div>

      <label className="mt-5 block">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-ocean">
          Notes <span className="text-coral">*</span>
        </span>
        <textarea
          name="pitch"
          rows={5}
          placeholder="What makes your place worth a feature? Vibe, house reef, breakfast, why a Navigator reader would book it."
          className="mt-2 w-full rounded-xl border border-ocean/15 bg-white p-3 text-[14px] text-ocean outline-none focus:border-ocean"
          required
          minLength={20}
          maxLength={1200}
        />
      </label>

      <label className="mt-5 block">
        <span className="text-[12px] font-semibold uppercase tracking-widest text-ocean">
          Photos (up to 8)
        </span>
        <input
          type="file"
          name="photos"
          accept="image/*"
          multiple
          className="mt-2 block w-full rounded-xl border border-dashed border-ocean/25 bg-white p-3 text-[13px] text-muted file:mr-3 file:rounded-full file:border-0 file:bg-ocean file:px-4 file:py-1.5 file:text-[12px] file:font-semibold file:uppercase file:tracking-[0.18em] file:text-white"
        />
        <span className="mt-1 block text-[12px] text-muted">
          Optional. JPGs/PNGs only. Big files? Email them after we get back to you.
        </span>
      </label>

      {result && !result.ok && (
        <div className="mt-5 rounded-xl bg-coral/10 p-4 text-[13px] font-medium text-coral">
          {result.error}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ocean px-6 py-3 text-[12px] font-semibold uppercase tracking-widest text-white transition hover:bg-ocean-deep disabled:opacity-50"
        >
          {pending ? "Sending…" : "List my property →"}
        </button>
        <p className="text-[12px] text-muted">
          Free. No commission. Editorial review only.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  options,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold uppercase tracking-widest text-ocean">{label}</span>
      {type === "select" && options ? (
        <select
          name={name}
          required={required}
          defaultValue=""
          className="mt-2 w-full rounded-xl border border-ocean/15 bg-white p-3 text-[14px] text-ocean outline-none focus:border-ocean"
        >
          <option value="" disabled>
            Pick one…
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className="mt-2 w-full rounded-xl border border-ocean/15 bg-white p-3 text-[14px] text-ocean outline-none focus:border-ocean"
        />
      )}
    </label>
  );
}
