import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SlideUp } from "@/components/animations/SlideUp";
import { GradientText } from "@/components/ui/GradientText";
import { WHATSAPP_PARTNER_MESSAGE, whatsappUrl } from "@/lib/site";

const targets = [
  "Wedding photographers",
  "Wedding planners",
  "Wedding venues",
  "Wedding decorators",
  "Bridal boutiques",
  "Jewellery stores",
  "Invitation printing shops",
  "Event companies",
];

const benefits = [
  "Additional revenue",
  "No technical work",
  "Premium add-on for clients",
  "We handle design & development",
  "Commission on every booking",
];

export function Partners() {
  return (
    <section
      id="partners"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Subtle section separator glow */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent"
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <SlideUp>
              <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
                Partners
              </p>
            </SlideUp>
            <SlideUp delay={0.05}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Are you a{" "}
                <GradientText>wedding professional</GradientText>?
              </h2>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-sm text-foreground/50 leading-relaxed mt-4">
                Offer premium digital invitations to your clients and earn a commission on every booking.
              </p>
            </SlideUp>
          </div>
          <SlideUp delay={0.15}>
            <a
              href={whatsappUrl(WHATSAPP_PARTNER_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 text-sm font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-all duration-normal ease-smooth shrink-0"
            >
              Become a Partner
            </a>
          </SlideUp>
        </div>

        {/* Targets + benefits grid */}
        <StaggerContainer
          speed="normal"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <RevealOnScroll
            direction="up"
            className="rounded-2xl border border-surface-border bg-surface p-6 md:p-8"
          >
            <p className="text-xs text-foreground/30 font-medium tracking-wide uppercase mb-4">
              Who we partner with
            </p>
            <div className="flex flex-wrap gap-2">
              {targets.map((target) => (
                <span
                  key={target}
                  className="text-xs px-2 py-1 rounded-md bg-background border border-surface-border text-foreground/50"
                >
                  {target}
                </span>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            direction="up"
            className="rounded-2xl border border-surface-border bg-surface p-6 md:p-8"
          >
            <p className="text-xs text-foreground/30 font-medium tracking-wide uppercase mb-4">
              Why partner with us
            </p>
            <ul className="flex flex-col gap-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm text-foreground/70">
                  <span className="text-green-400 shrink-0 mt-px">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </StaggerContainer>
      </div>
    </section>
  );
}
