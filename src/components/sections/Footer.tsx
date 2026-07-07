import Image from "next/image";

const cols = [
  {
    title: "Product",
    links: ["How it works", "The proof", "Platform", "Book a pilot"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Data handling"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-soft/40 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/logo.png"
              alt="2Skill"
              width={845}
              height={201}
              className="h-7 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Measure how well your team uses AI on real work — then prove it
              improved.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} 2Skill. All rights reserved.</p>
          <p>Built for teams that measure what matters.</p>
        </div>
      </div>
    </footer>
  );
}
