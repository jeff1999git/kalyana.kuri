import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SlideUp } from "@/components/animations/SlideUp";
import { GradientText } from "@/components/ui/GradientText";
import { Badge } from "@/components/ui/Badge";

const OCCASIONS = [
  "Weddings",
  "Engagements",
  "Birthdays",
  "Anniversaries",
  "Baby Showers",
  "Farewells",
  "Housewarmings",
  "Parties",
  "Corporate Events",
  "Custom Experiences",
];

export function Occasions() {
  return (
    <section
      id="occasions"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent"
      />

      <div className="container mx-auto px-6">
        <div className="mb-12 md:mb-16 text-center max-w-xl mx-auto">
          <SlideUp>
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
              Occasions
            </p>
          </SlideUp>
          <SlideUp delay={0.05}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Made for every <GradientText>celebration</GradientText>.
            </h2>
          </SlideUp>
          <SlideUp delay={0.1}>
            <p className="text-sm text-foreground/50 leading-relaxed mt-4">
              From the biggest day of your life to the small moments worth remembering.
            </p>
          </SlideUp>
        </div>

        <StaggerContainer
          speed="fast"
          className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto"
        >
          {OCCASIONS.map((occasion) => (
            <RevealOnScroll key={occasion} direction="scale">
              <Badge className="text-sm px-4 py-2">{occasion}</Badge>
            </RevealOnScroll>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
