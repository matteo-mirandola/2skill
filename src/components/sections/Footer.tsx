export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-soft/40 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} twoskill. All rights reserved.</p>
        <p>Built for teams that measure what matters.</p>
      </div>
    </footer>
  );
}
