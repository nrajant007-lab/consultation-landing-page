"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/config";

type Values = { name: string; email: string; whatsapp: string; business: string; url: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: "", email: "", whatsapp: "", business: "", url: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email, like name@example.com.";
  const digits = v.whatsapp.replace(/\D/g, "");
  if (!v.whatsapp.trim()) e.whatsapp = "Please enter your WhatsApp number.";
  else if (digits.length < 7 || digits.length > 15) e.whatsapp = "Please enter a valid WhatsApp number.";
  if (!v.business.trim()) e.business = "Please enter your business name.";
  return e;
}

export default function CTAForm() {
  const router = useRouter();
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const set = (k: keyof Values) => (ev: { target: { value: string } }) => setV({ ...v, [k]: ev.target.value });

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    setFailed(false);
    try {
      if (SITE.formEndpoint) {
        const res = await fetch(SITE.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(v),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        await new Promise((r) => setTimeout(r, 600)); // simulated: no backend connected
      }
      router.push("/thank-you");
    } catch {
      setFailed(true);
      setBusy(false);
    }
  }

  const field = (k: keyof Values, label: string, props: React.InputHTMLAttributes<HTMLInputElement>, optional = false) => (
    <div>
      <label htmlFor={k} className="mb-1.5 block text-sm font-semibold">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      <input id={k} name={k} value={v[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} className="field" {...props} />
      {errors[k] && <p id={`${k}-err`} className="mt-1.5 text-sm text-red-600">{errors[k]}</p>}
    </div>
  );

  return (
    <section id="form" className="px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">Book the <span className="text-primary">Call</span></h2>
        <p className="mt-3 text-base text-muted">One-to-one consultation. Advice built around your machine and your situation, not a generic answer.</p>
        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5 rounded-3xl border border-slate-100 bg-white p-5 text-left shadow-soft sm:p-8">
          {field("name", "Full Name", { type: "text", placeholder: "Your full name", autoComplete: "name" })}
          {field("email", "Active Email", { type: "email", placeholder: "name@example.com", autoComplete: "email" })}
          {field("whatsapp", "WhatsApp Number", { type: "tel", placeholder: "+977 98XXXXXXXX", autoComplete: "tel" })}
          {field("business", "Business Name", { type: "text", placeholder: "Your business name", autoComplete: "organization" })}
          {field("url", "Website or Facebook URL", { type: "url", placeholder: "https://", autoComplete: "url" }, true)}
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">Anything You Want to Say</label>
            <textarea id="message" name="message" rows={4} value={v.message} onChange={set("message")} placeholder="Machine model, and any problem you notice" className="field resize-none" />
          </div>
          {failed && <p role="alert" className="text-sm text-red-600">Something went wrong. Please check your connection and try again.</p>}
          <button type="submit" disabled={busy} className="btn w-full">{busy ? "Sending..." : "Book Free Consultation"}</button>
          <p className="text-center text-sm text-muted">We respect your privacy. No spam.</p>
        </form>
      </div>
    </section>
  );
}
