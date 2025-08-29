export default function Header() {
  return (
    <header className="border-border/60 bg-background/70 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1024px] items-center justify-between px-4 lg:px-6">
        <div className="text-section">Project</div>
        <nav className="text-subtext text-body flex items-center gap-4">
          <a className="hover:text-text transition-colors" href="#">
            Docs
          </a>
          <a className="hover:text-text transition-colors" href="#">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
