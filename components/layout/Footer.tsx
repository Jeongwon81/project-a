import Container from "@/components/ui/Container";
import { company } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line py-6 text-sm text-sub">
      <Container className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>
          {company.name} · {company.address}
        </p>
        <p>© {company.name}</p>
      </Container>
    </footer>
  );
}
