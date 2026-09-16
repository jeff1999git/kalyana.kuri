import { Navbar } from "@/components/layout/Navbar";
import { StarField } from "@/components/animations/StarField";

export const metadata = { title: "About Us — Kalyana.kuri" };

export default function AboutUsPage() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <StarField />

      <div className="relative z-10 container mx-auto px-6 max-w-2xl pt-32 pb-24">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-2 [text-shadow:0_2px_24px_rgba(0,0,0,0.9),0_0_48px_rgba(0,0,0,0.7)]">
          About Us
        </h1>

        <div className="space-y-6 text-foreground/70 leading-relaxed text-sm [text-shadow:0_1px_10px_rgba(0,0,0,0.95)]">
          <p>
            Kalyana.kuri creates premium digital invitations and interactive experiences
            for weddings, celebrations and life&apos;s special moments.
          </p>
          <p>
            We believe your story deserves more than a printed card or a forwarded PDF.
            Every invitation we build is personal — your names, your photos, your dates,
            your venues — brought to life as one beautiful, shareable link.
          </p>

          <p className="text-foreground/40 text-xs uppercase tracking-widest">Our mission is simple</p>
          <blockquote className="border-l-2 border-accent pl-5 italic text-foreground/80">
            &ldquo;Your Wedding. Your Story. One Beautiful Link.&rdquo;
          </blockquote>

          <p>
            From the first save-the-date to the last thank-you note, we design every
            detail of your celebration&apos;s digital presence — so your guests feel the
            occasion before they even arrive.
          </p>

          <div>
            <p className="text-foreground/40 text-xs uppercase tracking-widest mb-3">What we create</p>
            <ul className="space-y-2">
              {[
                "Personalised wedding invitations",
                "Multi-event celebration experiences",
                "Custom storytelling websites",
                "Photo galleries and countdowns",
                "RSVP and guest management",
                "Venue, maps and event details in one link",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent shrink-0 mt-px">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            Whether it&apos;s a wedding, an engagement, a milestone birthday, or a farewell
            worth remembering — we help you share it beautifully.
          </p>

          <div>
            <p className="text-foreground/40 text-xs uppercase tracking-widest mb-4">Why couples choose us</p>
            <ul className="space-y-2">
              {[
                "Premium, personal design",
                "Every event and detail in one place",
                "Built for sharing on WhatsApp, Instagram and email",
                "No apps, no downloads — just a link",
                "Designed and built by us, start to finish",
                "A keepsake your guests will remember",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-400 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>Our goal isn&apos;t just to build a website. It&apos;s to make your moment unforgettable.</p>

          <p className="text-foreground/50">Because we believe:</p>
          <blockquote className="border-l-2 border-accent pl-5 italic text-foreground/80">
            &ldquo;Your special moments deserve more than a PDF.&rdquo;
          </blockquote>
        </div>
      </div>
    </main>
  );
}
