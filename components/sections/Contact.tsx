import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { company, contact } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="bg-dark py-16 text-white md:py-band">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="mb-6 whitespace-pre-line text-title-sm font-bold md:text-title">
            {contact.title}
          </h2>
          <div className="flex flex-col gap-2 text-sm text-white/70 sm:flex-row sm:gap-6">
            <a
              href={`mailto:${company.email}`}
              className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {company.email}
            </a>
            <a
              href={`tel:${company.phone}`}
              className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {company.phone}
            </a>
          </div>
        </div>
        <Button href={`mailto:${company.email}`}>{contact.buttonLabel}</Button>
      </Container>
    </section>
  );
}
