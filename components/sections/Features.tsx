import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SlideUp } from "@/components/animations/SlideUp";
import { GradientText } from "@/components/ui/GradientText";

const features = [
  {
    number: "01",
    title: "Wedding Details",
    description: "Everything your guests need to know.",
    tags: ["Dates", "Timings", "Dress code"],
  },
  {
    number: "02",
    title: "Multiple Events",
    description: "Engagement, Mehndi, Haldi, Wedding, Reception and more.",
    tags: ["Engagement", "Haldi", "Reception"],
  },
  {
    number: "03",
    title: "Photo Gallery",
    description: "Share your favourite memories.",
    tags: ["Couple", "Family", "Memories"],
  },
  {
    number: "04",
    title: "Countdown",
    description: "Build anticipation for the big day.",
    tags: ["Live timer", "Save the date"],
  },
  {
    number: "05",
    title: "Venue & Maps",
    description: "Make finding your celebration effortless.",
    tags: ["Google Maps", "Directions"],
  },
  {
    number: "06",
    title: "RSVP",
    description: "Let guests respond directly from your invitation.",
    tags: ["Guest replies", "Headcount"],
  },
  {
    number: "07",
    title: "Music & Animations",
    description: "Bring your invitation to life.",
    tags: ["Background music", "Motion"],
  },
  {
    number: "08",
    title: "Personalised Story",
    description: "Tell your story your way.",
    tags: ["How we met", "Your words"],
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-12 md:mb-20 max-w-2xl">
          <SlideUp>
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
              What&apos;s included
            </p>
          </SlideUp>
          <SlideUp delay={0.05}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Every detail,{" "}
              <GradientText>beautifully in place</GradientText>
            </h2>
          </SlideUp>
        </div>

        {/* Features grid */}
        <StaggerContainer speed="normal" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-border">
          {features.map((feature) => (
            <RevealOnScroll
              key={feature.number}
              direction="up"
              className="group relative bg-background p-6 md:p-8 hover:bg-surface transition-colors duration-normal ease-smooth"
            >
              <div className="flex flex-col h-full gap-4">
                <span className="text-xs font-mono text-foreground/20">
                  {feature.number}
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed flex-1">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-md bg-surface border border-surface-border text-foreground/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
