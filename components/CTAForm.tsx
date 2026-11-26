"use client";

import { useEffect, useRef, useState } from "react";

export default function CTAForm() {
  const container = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let script: HTMLScriptElement | undefined;
    fetch("/flodesk-form.html")
      .then((response) => { if (!response.ok) throw new Error("Form unavailable"); return response.text(); })
      .then((html) => {
        if (cancelled || !container.current) return;
        const doc = new DOMParser().parseFromString(html, "text/html");
        const root = doc.querySelector('[data-ff-el="root"]');
        if (!root) throw new Error("Form not found");
        container.current.replaceChildren(root);
        const w = window as unknown as { fd?: ((...args: unknown[]) => void) & { q?: unknown[][] }; FlodeskObject?: string };
        w.FlodeskObject = "fd";
        if (!w.fd) {
          const queue: unknown[][] = [];
          const fd: ((...args: unknown[]) => void) & { q?: unknown[][] } = (...args: unknown[]) => { queue.push(args); };
          fd.q = queue;
          w.fd = fd;
          script = document.createElement("script");
          script.type = "module";
          script.src = "https://assets.flodesk.com/universal.mjs";
          script.onerror = () => setError(true);
          document.head.appendChild(script);
        }
        w.fd("form:handle", { formId: "6b055761f69c430f0001c442", rootEl: ".ff-6b055761f69c430f0001c442" });
      }).catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="form" className="px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">Book the <span className="text-primary">Call</span></h2>
        <p className="mt-3 text-base text-muted">One-to-one consultation. Advice built around your machine and your situation, not a generic answer.</p>
        <div ref={container} className="flodesk-form mt-8 rounded-3xl border border-slate-100 bg-white p-5 text-left shadow-soft sm:p-8" />
        {error && <p role="alert" className="mt-4 text-red-600">The form could not load. Please contact us on WhatsApp at 9841449957.</p>}
      </div>
    </section>
  );
}
