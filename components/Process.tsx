const steps = [
  { t: "Tell us about your machine", d: "Fill the short form. Share your machine model and any problem you notice." },
  { t: "Talk to us", d: "We call you on WhatsApp. One-to-one, in simple language." },
  { t: "Know your next step", d: "You leave knowing if it needs inspection, cleaning, testing, repair, or nothing at all." },
];

export default function Process() {
  return (
    <section className="bg-primary-soft px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
          Three <span className="text-primary">simple</span> steps
        </h2>
        <ol className="mt-8 grid gap-4 text-left sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="rounded-3xl bg-white p-6 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-base text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
