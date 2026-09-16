import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SlideUp } from "@/components/animations/SlideUp";
import { GradientText } from "@/components/ui/GradientText";

const steps = [
  {
    number: "01",
    title: "Share Your Details",
    description: "Send us your names, photos, dates, venues and event details.",
  },
  {
    number: "02",
    title: "We Create",
    description: "We turn your details into a beautiful personalised digital experience.",
  },
  {
    number: "03",
    title: "Share One Link",
    description: "Send your invitation to your guests through WhatsApp, Instagram, email or anywhere you like.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-12 md:mb-20 max-w-2xl">
          <SlideUp>
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
              How it works
            </p>
          </SlideUp>
          <SlideUp delay={0.05}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Three steps to{" "}
              <GradientText>one beautiful link</GradientText>
            </h2>
          </SlideUp>
        </div>

        {/* Steps grid */}
        <StaggerContainer speed="normal" className="grid grid-cols-1 md:grid-cols-3 gap-px bg-surface-border">
          {steps.map((step) => (
            <RevealOnScroll
              key={step.number}
              direction="up"
              className="group relative bg-background p-6 md:p-8 hover:bg-surface transition-colors duration-normal ease-smooth"
            >
              <div className="flex flex-col h-full gap-4">
                <span className="text-xs font-mono text-foreground/20">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed flex-1">
                  {step.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
