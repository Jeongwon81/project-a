import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { hero } from "@/data/site";

export default function Hero() {
  return (
    <section className="bg-cream py-16 md:py-section">
      <Container className="grid min-w-0 items-center gap-10 lg:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-4 text-xs font-semibold tracking-eyebrow text-main">
            {hero.eyebrow}
          </p>
          <h1 className="mb-5 max-w-full whitespace-pre-line break-words text-display-sm font-bold leading-tight text-ink md:text-display">
            {hero.title}
          </h1>
          <p className="mb-7 text-base leading-relaxed text-sub">
            {hero.description.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap gap-3">
            {hero.buttons.map((button) => (
              <Button
                key={button.label}
                href={button.href}
                variant={button.variant}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-hero">
          <Image
            src={hero.image}
            alt="파란색과 연한 색이 어우러진 추상 이미지"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
