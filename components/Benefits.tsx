const benefits = [
  "Find out if your machine needs service or is fine",
  "Understand what a noise, alarm, or weak flow may mean",
  "Know what you can safely clean and what needs a professional",
  "Know when your next service is due",
  "Know what a professional service includes before you decide",
];

export default function Benefits() {
  return (
    <section className="px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
          How you <span className="text-primary">benefit</span> from this consultation
        </h2>
        <ul className="mt-8 space-y-3 text-left">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
              <svg aria-hidden viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 fill-primary"><path d="M10 0a10 10 0 100 20 10 10 0 000-20zm4.7 7.7l-5.5 5.5a1 1 0 01-1.4 0L5.3 10.7a1 1 0 111.4-1.4l1.8 1.8 4.8-4.8a1 1 0 111.4 1.4z" /></svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
