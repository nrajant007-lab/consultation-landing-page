import type { Metadata } from "next";
import Header from "@/components/Header";
import { SITE } from "@/lib/config";

export const metadata: Metadata = { title: "Thank You", robots: { index: false, follow: false } };

export default function ThankYou() {
  const wa = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}` : null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] max-w-[160vw] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <Header />
      <section className="mx-auto max-w-2xl px-5 pb-20 pt-10 text-center">
        <h1 className="text-[2rem] font-extrabold leading-tight tracking-tight sm:text-5xl">
          <span className="text-primary">Thank you for getting in touch!</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-ink">
          Let&apos;s discuss your 5-litre oxygen concentrator and the issues you&apos;ve noticed. Connect with me on WhatsApp to talk through your enquiry and arrange the next steps.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-primary sm:text-3xl">Watch this video</h2>
        <video className="mt-5 w-full rounded-3xl bg-black shadow-soft" controls playsInline preload="metadata">
          <source src="/thank-you-video.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>

        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-[#1ebe5b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:w-auto">
            Connect with me on WhatsApp
          </a>
        ) : (
          <div className="mt-8">
            <button type="button" disabled aria-describedby="whatsapp-status" className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-soft sm:w-auto">
              Message Us on WhatsApp
            </button>
            <p id="whatsapp-status" className="mt-3 text-sm text-muted">WhatsApp contact coming soon.</p>
          </div>
        )}
        {wa && <p className="mt-3 text-sm text-muted">+977 9841449957</p>}
      </section>
    </main>
  );
}
