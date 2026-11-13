import Container from "@/components/ui/Container";
import PortfolioTabs from "@/components/sections/PortfolioTabs";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="pt-section-sm pb-section-sm md:pt-section md:pb-section"
      aria-labelledby="portfolio-title"
    >
      <Container>
        <SectionTitle eyebrow="PORTFOLIO" title="최근 작업" />
        <PortfolioTabs />
      </Container>
    </section>
  );
}
