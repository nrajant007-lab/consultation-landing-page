const points = [
  "You can't tell if it's still working properly.",
  "It's louder or hotter than before. Or the alarm goes off now and then.",
  "Nobody told you what maintenance it needs.",
  "You don't know if a service or repair price is fair.",
  "You worry it may stop when you need it most.",
];

export default function Problem() {
  return (
    <section className="bg-primary-soft px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
          It turns on. That doesn&apos;t mean it&apos;s <span className="text-primary">fine.</span>
        </h2>
        <ul className="mt-8 space-y-3 text-left">
          {points.map((p) => (
            <li key={p} className="rounded-2xl bg-white px-5 py-4 text-base shadow-sm">{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
