import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SlideUp } from "@/components/animations/SlideUp";
import { GradientText } from "@/components/ui/GradientText";
import { Badge } from "@/components/ui/Badge";
import { WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/site";

const plans = [
  {
    name: "Essential",
    price: "₹1,499",
    popular: false,
    features: [
      "Digital invitation",
      "One event",
      "Basic customisation",
      "Venue & maps",
      "Photo section",
      "Shareable link",
    ],
  },
  {
    name: "Signature",
    price: "₹2,999",
    popular: true,
    features: [
      "Multiple events",
      "Custom design",
      "Gallery",
      "Countdown",
      "RSVP",
      "Music",
      "Animations",
      "6 months hosting",
    ],
  },
  {
    name: "Custom Experience",
    price: "₹6,999",
    popular: false,
    features: [
      "Fully customised experience",
      "Storytelling",
      "Advanced animations",
      "Multiple sections",
      "Custom interactions",
      "RSVP/guest features",
      "Priority support",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent"
      />

      <div className="container mx-auto px-6">
        <div className="mb-12 md:mb-20 text-center max-w-xl mx-auto">
          <SlideUp>
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
              Pricing
            </p>
          </SlideUp>
          <SlideUp delay={0.05}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Choose the <GradientText>experience</GradientText> that fits your day
            </h2>
          </SlideUp>
        </div>

        <StaggerContainer
          speed="normal"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <RevealOnScroll
              key={plan.name}
              direction="up"
              className={`flex flex-col gap-6 rounded-2xl border bg-surface p-6 md:p-8 ${
                plan.popular ? "border-white/20" : "border-surface-border"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium tracking-widest uppercase text-accent">
                  {plan.name}
                </p>
                {plan.popular && <Badge>Most Popular</Badge>}
              </div>

              <div>
                <p className="text-xs text-foreground/40 mb-1">Starting from</p>
                <p className="text-3xl font-bold text-foreground">{plan.price}</p>
              </div>

              <ul className="flex flex-col gap-2 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-green-400 shrink-0 mt-px">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappUrl(`${WHATSAPP_MESSAGE} Plan: ${plan.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center h-11 rounded-full text-sm font-semibold transition-all duration-normal ease-smooth ${
                  plan.popular
                    ? "bg-white text-black hover:bg-white/90"
                    : "border border-surface-border text-foreground hover:border-white/40 hover:bg-white/5"
                }`}
              >
                Create Yours
              </a>
            </RevealOnScroll>
          ))}
        </StaggerContainer>

        <SlideUp delay={0.15}>
          <p className="text-xs text-foreground/30 text-center mt-8">
            All prices are starting points — tell us about your celebration for an exact quote.
          </p>
        </SlideUp>
      </div>
    </section>
  );
}
