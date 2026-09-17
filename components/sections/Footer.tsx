import Link from "next/link";
import { PiInstagramLogo } from "react-icons/pi";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, SITE } from "@/lib/site";

const footerLinks = [
  { label: "Work", href: "/#work" },
  { label: "Features", href: "/#features" },
  { label: "Occasions", href: "/#occasions" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Partners", href: "/#partners" },
  { label: "Contact", href: "/#contact" },
  { label: "About Us", href: "/about-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
];

export function Footer() {
  return (
    <footer id="footer" className="relative border-t border-surface-border">
      <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <Link href="/" className="text-sm font-bold tracking-tight text-foreground">
            {SITE.name}
          </Link>
          <p className="text-xs text-foreground/40 mt-1 max-w-xs">
            {SITE.description}
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${SITE.name} on Instagram`}
            className="inline-flex items-center gap-1.5 mt-2 text-xs text-foreground/40 hover:text-foreground/80 transition-colors duration-fast"
          >
            <PiInstagramLogo size={14} aria-hidden />
            @{INSTAGRAM_HANDLE}
          </a>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-1">
          {footerLinks.map((link, i) => (
            <span key={link.href} className="flex items-center gap-1">
              {i > 0 && <span className="text-foreground/20 text-xs select-none">·</span>}
              <Link
                href={link.href}
                className="text-xs text-foreground/40 hover:text-foreground/80 transition-colors duration-fast"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        <p className="text-xs text-foreground/25">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
