import Link from "next/link";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-white/[0.07] py-10">
      <div className="wrap flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-display text-sm font-semibold text-paper">{site.name}</p>
          <p className="mt-1 font-label text-xs text-mist">
            {site.role} · {site.location}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Footer">
          <Link href="/#solutions" className="focus-ring inline-flex min-h-[24px] items-center rounded-sm font-label text-xs font-semibold text-mist hover:text-paper">
            Solutions
          </Link>
          <Link href="/#process" className="focus-ring inline-flex min-h-[24px] items-center rounded-sm font-label text-xs font-semibold text-mist hover:text-paper">
            How I work
          </Link>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-[24px] items-center rounded-sm font-label text-xs font-semibold text-mist hover:text-paper">
            LinkedIn
          </a>
          <Link href="/#contact" className="focus-ring inline-flex min-h-[24px] items-center rounded-sm font-label text-xs font-semibold text-mist hover:text-paper">
            Contact
          </Link>
        </nav>
        <p className="font-label text-xs text-mist">
          © {new Date().getFullYear()} {site.name}. Built with intent.
        </p>
      </div>
    </footer>
  );
}
