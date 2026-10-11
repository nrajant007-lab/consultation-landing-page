export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 text-center sm:pb-24 sm:pt-16">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] max-w-[160vw] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <h1 className="mx-auto max-w-3xl text-[2rem] font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
        Is Your 5-Litre Oxygen Concentrator <span className="text-primary">Really Working Properly?</span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-ink sm:text-xl">
        Book a free one-to-one call. Tell us your machine&apos;s symptoms. We&apos;ll tell you honestly if it needs service.
      </p>
      <div className="mx-auto mt-5 max-w-md space-y-1 text-base text-muted">
        <p>Your machine turns on. But is it still giving the right oxygen?</p>
        <p>This free call is for families who use a 5-litre oxygen concentrator at home.</p>
        <p>You explain what you see and hear. We help you understand what to do next.</p>
      </div>
      <a href="#form" className="btn mt-8">Book Free Consultation</a>
    </section>
  );
}
