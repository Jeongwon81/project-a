"use client";

import { useRef, useState } from "react";
import PortfolioCard from "@/components/ui/PortfolioCard";
import Reveal from "@/components/ui/Reveal";
import { portfolio } from "@/data/site";

const categories = ["전체", "브랜딩", "웹 디자인", "대시보드 UI"] as const;
type PortfolioCategory = (typeof categories)[number];

export default function PortfolioTabs() {
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory>("전체");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const filteredPortfolio =
    selectedCategory === "전체"
      ? portfolio
      : portfolio.filter((item) => item.category === selectedCategory);

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % categories.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + categories.length) % categories.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = categories.length - 1;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    setSelectedCategory(categories[nextIndex]);
    tabRefs.current[nextIndex]?.focus();
  };

  const selectedTabIndex = categories.indexOf(selectedCategory);

  return (
    <>
      <div
        role="tablist"
        aria-label="포트폴리오 분류"
        className="mb-8 flex gap-2 overflow-x-auto"
      >
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`portfolio-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls="portfolio-tabpanel"
              tabIndex={isSelected ? 0 : -1}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main ${
                isSelected
                  ? "border-ink bg-ink text-white"
                  : "border-line text-ink hover:border-ink"
              }`}
              onClick={() => setSelectedCategory(category)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div
        id="portfolio-tabpanel"
        role="tabpanel"
        aria-labelledby={`portfolio-tab-${selectedTabIndex}`}
        tabIndex={0}
      >
        <Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPortfolio.map((item) => (
              <PortfolioCard
                key={item.image}
                image={item.image}
                title={item.title}
                category={item.category}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </>
  );
}
