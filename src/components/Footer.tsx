import Link from "next/link";
import { Logo } from "@/components/Logo";
import { BeehiivEmbed } from "@/components/BeehiivEmbed";

const siteLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/stays", label: "Stays" },
  { href: "/plan", label: "Plan trip" },
  { href: "/journal", label: "Journal" },
  { href: "/voices", label: "Voices" },
  { href: "/shop", label: "Shop" },
];

const aboutLinks = [
  { href: "/about", label: "About" },
  { href: "/about#contact", label: "Contact" },
  { href: "/partners", label: "Partners" },
  { href: "/subscribe", label: "Newsletter" },
];

const legalLinks = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/disclosure", label: "Affiliate disclosure" },
  { href: "/legal/property-removal", label: "Property removal request" },
];

const socials = [
  { href: "https://instagram.com/maldivesnavigator", label: "Instagram" },
  { href: "https://pinterest.com/maldivesnavigator", label: "Pinterest" },
  { href: "https://youtube.com/@maldivesnavigator", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ocean-deep text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo mark="white" />
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-white/70">
              An independent editorial guide to the 1,192 islands of the Maldives.
              From $30/night guesthouses to private islands. 
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-4 py-1.5 text-[12px] uppercase tracking-[0.18em] text-white/80 transition hover:border-white hover:text-white"
                >
                  {s.label}
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <BeehiivEmbed variant="compact" />
            </div>
          </div>

          <div className="grid gap-8 md:col-span-7 md:grid-cols-3">
            <FooterCol title="Site" links={siteLinks} />
            <FooterCol title="About" links={aboutLinks} />
            <FooterCol title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-[12px] uppercase tracking-[0.18em] text-white/50">
          Maldives Navigator is published by Safarokahdha LLC. 
          © {new Date().getFullYear()}.
        </div>
      </div>
    </footer>
  );
}

type FooterColProps = {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
};

function FooterCol({ title, links }: FooterColProps) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="text-[14px] text-white/80 transition hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
