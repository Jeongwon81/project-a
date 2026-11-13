"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { company, cta, menus } from "@/data/site";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = buttonRef.current;
    const panel = panelRef.current;
    const firstItem = panel?.querySelector<HTMLElement>("a");
    const mediaQuery = window.matchMedia("(min-width: 64rem)");

    document.body.style.overflow = "hidden";
    firstItem?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusableItems = panel.querySelectorAll<HTMLElement>("a[href]");
      const firstFocusable = focusableItems[0];
      const lastFocusable = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable?.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    };

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleBreakpointChange);
      trigger?.focus();
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="relative z-50 flex size-11 flex-col items-center justify-center gap-1 rounded-md transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main lg:hidden"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span
          className={`h-0.5 w-5 bg-ink transition-all duration-300 ${
            isOpen ? "translate-y-1.5 rotate-45" : ""
          }`}
          aria-hidden="true"
        />
        <span
          className={`h-0.5 w-5 bg-ink transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
          aria-hidden="true"
        />
        <span
          className={`h-0.5 w-5 bg-ink transition-all duration-300 ${
            isOpen ? "-translate-y-1.5 -rotate-45" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <button
        type="button"
        tabIndex={-1}
        aria-label="메뉴 닫기"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      <aside
        ref={panelRef}
        id="mobile-menu-panel"
        role="dialog"
        aria-label={`${company.name} 메뉴`}
        aria-modal={isOpen}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed right-0 top-0 z-40 flex h-dvh w-72 flex-col bg-white px-6 pb-8 pt-20 shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav aria-label="모바일 메뉴" className="flex flex-col gap-6">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="text-sm text-ink transition-colors hover:text-main focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
              onClick={closeMenu}
            >
              {menu.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-main px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-main-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
            onClick={closeMenu}
          >
            {cta.label}
          </Link>
        </nav>
      </aside>
    </>
  );
}
