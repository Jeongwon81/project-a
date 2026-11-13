import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import MobileMenu from "@/components/layout/MobileMenu";
import { company, cta, menus } from "@/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-ink"
          aria-label={`${company.name} 홈`}
        >
          <span className="size-4 rounded-full bg-main" aria-hidden="true" />
          <span>{company.name}</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-8 lg:flex">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="text-sm text-ink transition-colors hover:text-main focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
            >
              {menu.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={cta.href} className="px-5 py-2.5">
            {cta.label}
          </Button>
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
