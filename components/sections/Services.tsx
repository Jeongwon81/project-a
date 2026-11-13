import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/data/site";

export default function Services() {
  return (
    <section
      id="service"
      className="py-section-sm md:py-section"
      aria-labelledby="service-title"
    >
      <Container>
        <SectionTitle eyebrow="SERVICE" title="우리가 하는 일" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 100}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                desc={service.desc}
                link={service.link}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
