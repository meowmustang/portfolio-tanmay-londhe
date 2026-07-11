import Link from "next/link";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-seam bg-graphite py-10">
      <div className="wrap flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-display text-sm font-semibold text-paper">{site.name}</p>
          <p className="mt-1 font-label text-xs text-mist">
            {site.role} · {site.location}
          </p>
        </div>
        <nav className="flex flex-wrap gap-6" aria-label="Footer">
          <Link href="/#solutions" className="focus-ring rounded-sm font-label text-xs font-semibold text-mist hover:text-paper">
            Solutions
          </Link>
          <Link href="/#process" className="focus-ring rounded-sm font-label text-xs font-semibold text-mist hover:text-paper">
            How I work
          </Link>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring rounded-sm font-label text-xs font-semibold text-mist hover:text-paper">
            LinkedIn
          </a>
          <Link href="/#contact" className="focus-ring rounded-sm font-label text-xs font-semibold text-mist hover:text-paper">
            Contact
          </Link>
        </nav>
        <p className="font-label text-xs text-mist/60">
          © {new Date().getFullYear()} {site.name}. Built with intent.
        </p>
      </div>
    </footer>
  );
}
