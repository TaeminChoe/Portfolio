export default function Footer() {
  return (
    <footer className="border-border flex-1 border-t">
      <div className="text-subtext text-description mx-auto flex h-16 max-w-[1024px] items-center justify-between px-4 lg:px-6">
        <span>© {new Date().getFullYear()} Project</span>
        <span className="text-subtext/80">Made with Next.js & Tailwind</span>
      </div>
    </footer>
  );
}
