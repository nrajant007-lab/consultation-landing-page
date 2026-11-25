"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Values = { name: string; email: string; whatsapp: string; machine: string; location: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: "", email: "", whatsapp: "", machine: "", location: "", message: "" };
const FLODESK_ACTION = "https://form.flodesk.com/forms/6b055761f69c430f0001c442/submit";

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email, like name@example.com.";
  const digits = v.whatsapp.replace(/\D/g, "");
  if (!v.whatsapp.trim()) e.whatsapp = "Please enter your WhatsApp number.";
  else if (digits.length < 7 || digits.length > 15) e.whatsapp = "Please enter a valid WhatsApp number.";
  if (!v.machine.trim()) e.machine = "Please enter your concentrator brand or model.";
  if (!v.location.trim()) e.location = "Please enter your city or area.";
  return e;
}

export default function CTAForm() {
  const router = useRouter();
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const detailsRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Values) => (ev: { target: { value: string } }) => setV({ ...v, [k]: ev.target.value });

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    setFailed(false);
    try {
      if (detailsRef.current) {
        detailsRef.current.value = [
          `WhatsApp: ${v.whatsapp}`,
          `Machine: ${v.machine}`,
          `Location: ${v.location}`,
          v.message.trim() ? `Message: ${v.message.trim()}` : "",
        ].filter(Boolean).join(" | ");
      }

      // Submit to the Flodesk form in the background. Its segment membership
      // activates the workflow configured in the user's Flodesk account.
      form.submit();
      window.setTimeout(() => router.push("/thank-you"), 700);
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
        <form action={FLODESK_ACTION} method="post" target="flodesk-submission" onSubmit={onSubmit} noValidate className="mt-8 space-y-5 rounded-3xl border border-slate-100 bg-white p-5 text-left shadow-soft sm:p-8">
          {field("name", "Full Name", { type: "text", name: "firstName", placeholder: "Your full name", autoComplete: "name" })}
          <input type="hidden" name="lastName" value="" />
          {field("email", "Active Email", { type: "email", name: "email", placeholder: "name@example.com", autoComplete: "email" })}
          {field("whatsapp", "WhatsApp Number", { type: "tel", name: "fields.", placeholder: "+977 98XXXXXXXX", autoComplete: "tel" })}
          {field("machine", "Oxygen Concentrator Brand / Model", { type: "text", placeholder: "For example: VisionAire 5", autoComplete: "off" })}
          {field("location", "City or Area", { type: "text", placeholder: "Your city or area", autoComplete: "address-level2" })}
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">Anything You Want to Say</label>
            <textarea id="message" name="message" rows={4} value={v.message} onChange={set("message")} placeholder="Machine model, and any problem you notice" className="field resize-none" />
          </div>
          {failed && <p role="alert" className="text-sm text-red-600">Something went wrong. Please check your connection and try again.</p>}
          <input ref={detailsRef} type="hidden" name="fields." />
          <input type="text" name="confirm_email_address" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button type="submit" disabled={busy} className="btn w-full">{busy ? "Sending..." : "Book Free Consultation"}</button>
          <p className="text-center text-sm text-muted">We respect your privacy. No spam.</p>
        </form>
        <iframe title="Flodesk form submission" name="flodesk-submission" className="hidden" />
      </div>
    </section>
  );
}
