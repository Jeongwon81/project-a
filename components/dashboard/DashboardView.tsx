"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import {
  inquiries,
  inquiryCategories,
  monthlyInquiryCounts,
  type Inquiry,
  type InquiryCategory,
} from "@/data/dashboard";

type CategoryFilter = "전체" | InquiryCategory;
type InquiryListState =
  | { status: "loading"; items: Inquiry[] }
  | { status: "error"; items: Inquiry[] }
  | { status: "success"; total: number; items: Inquiry[] };

const filters: CategoryFilter[] = ["전체", ...inquiryCategories];

const monthFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "short",
});

function getMonthDate(month: string) {
  return new Date(`${month}-01T00:00:00`);
}

function getMonthLabel(month: string) {
  return monthFormatter.format(getMonthDate(month));
}

function getInquiryMonth(inquiry: Inquiry) {
  return inquiry.receivedAt.slice(0, 7);
}

function getTrend(current: number, previous: number) {
  if (current === previous) return { direction: "same", label: "변동 없음" };
  if (previous === 0) {
    return {
      direction: current > 0 ? "up" : "down",
      label: current > 0 ? "신규" : "0%",
    };
  }

  const percentage = Math.round((Math.abs(current - previous) / previous) * 100);
  return {
    direction: current > previous ? "up" : "down",
    label: `${percentage}%`,
  };
}

function getMonthlyCount(month: string, category: CategoryFilter) {
  const data = monthlyInquiryCounts.find((item) => item.month === month);
  if (!data) return 0;
  if (category !== "전체") return data[category];
  return inquiryCategories.reduce((total, key) => total + data[key], 0);
}

export default function DashboardView() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("전체");
  const [inquiryList, setInquiryList] = useState<InquiryListState>({
    status: "loading",
    items: [],
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadInquiries() {
      setInquiryList({ status: "loading", items: [] });

      try {
        const params = new URLSearchParams({ type: selectedCategory });
        const response = await fetch(`/api/inquiries?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`문의 목록 요청 실패: ${response.status}`);
        }

        const result: { total: number; items: Inquiry[] } =
          await response.json();
        setInquiryList({
          status: "success",
          total: result.total,
          items: result.items,
        });
      } catch {
        if (!controller.signal.aborted) {
          setInquiryList({ status: "error", items: [] });
        }
      }
    }

    void loadInquiries();
    return () => controller.abort();
  }, [selectedCategory]);

  const currentMonth = monthlyInquiryCounts.at(-1)?.month ?? "";
  const previousMonth = monthlyInquiryCounts.at(-2)?.month ?? "";
  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      selectedCategory === "전체" || inquiry.category === selectedCategory,
  );
  const currentInquiries = filteredInquiries.filter(
    (inquiry) => getInquiryMonth(inquiry) === currentMonth,
  );
  const previousInquiries = filteredInquiries.filter(
    (inquiry) => getInquiryMonth(inquiry) === previousMonth,
  );

  const summaryCards = [
    { label: "전체 문의", status: null },
    { label: "신규 문의", status: "신규" },
    { label: "진행 중", status: "진행 중" },
    { label: "완료", status: "완료" },
  ] as const;

  const chartData = monthlyInquiryCounts.map((item) => ({
    month: item.month,
    count: getMonthlyCount(item.month, selectedCategory),
  }));
  const maxCount = Math.max(...chartData.map((item) => item.count), 1);
  const visibleInquiries = inquiryList.items.toSorted((a, b) =>
    b.receivedAt.localeCompare(a.receivedAt),
  );

  return (
    <main className="flex-1 py-section-sm md:py-section">
      <Container>
        <header className="mb-8">
          <p className="mb-2 text-xs font-semibold tracking-eyebrow text-main">
            DASHBOARD
          </p>
          <h1 className="text-title-sm font-bold text-ink md:text-title">
            문의 현황
          </h1>
        </header>

        <div
          className="mb-8 flex flex-wrap gap-2 rounded-media bg-cream p-3"
          aria-label="문의 분류 필터"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={selectedCategory === filter}
              onClick={() => {
                setInquiryList({ status: "loading", items: [] });
                setSelectedCategory(filter);
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main ${
                selectedCategory === filter
                  ? "bg-ink text-white"
                  : "text-sub hover:bg-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <section
          className="mb-12"
          aria-label="요약 현황"
        >
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {summaryCards.map((card) => {
              const currentCount = currentInquiries.filter(
                (inquiry) => card.status === null || inquiry.status === card.status,
              ).length;
              const previousCount = previousInquiries.filter(
                (inquiry) => card.status === null || inquiry.status === card.status,
              ).length;
              const trend = getTrend(currentCount, previousCount);

              return (
                <article
                  key={card.label}
                  className="rounded-media border border-line bg-white p-5 md:p-6"
                >
                  <h2 className="mb-4 text-sm font-medium text-sub">
                    {card.label}
                  </h2>
                  <p className="mb-3 text-card font-bold text-ink md:text-title-sm">
                    {currentCount}
                    <span className="ml-1 text-sm font-normal text-sub">건</span>
                  </p>
                  <p className="text-xs text-sub">
                    <span
                      className={
                        trend.direction === "up"
                          ? "font-semibold text-main"
                          : trend.direction === "down"
                            ? "font-semibold text-sub"
                            : ""
                      }
                    >
                      {trend.direction === "up"
                        ? "▲ "
                        : trend.direction === "down"
                          ? "▼ "
                          : ""}
                      {trend.label}
                    </span>{" "}
                    지난달 대비
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-12" aria-labelledby="monthly-inquiries-title">
          <div className="mb-5 flex items-end justify-between">
            <h2
              id="monthly-inquiries-title"
              className="text-card font-bold text-ink"
            >
              월별 문의 수
            </h2>
          </div>
          <div
            className="rounded-media border border-line bg-white p-5 md:p-6"
            role="img"
            aria-label={`월별 문의 수: ${chartData
              .map((item) => `${getMonthLabel(item.month)} ${item.count}건`)
              .join(", ")}`}
          >
            <div className="grid h-56 grid-cols-8 gap-3 md:h-64 md:gap-6">
              {chartData.map((item, index) => {
                const isLatest = index === chartData.length - 1;
                const barHeight = Math.max((item.count / maxCount) * 100, 4);

                return (
                  <div key={item.month} className="flex h-full flex-col items-center">
                    <div className="relative flex w-full flex-1 items-end">
                      <span
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-2 text-xs font-medium text-sub"
                        style={{ bottom: `${barHeight}%` }}
                      >
                        {item.count}
                      </span>
                      <div
                        className={`w-full rounded-t-md ${
                          isLatest ? "bg-main" : "bg-soft"
                        }`}
                        style={{ height: `${barHeight}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="mt-2 text-xs text-sub">
                      {getMonthLabel(item.month)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section aria-labelledby="inquiry-list-title">
          <div className="mb-5 flex items-end justify-between">
            <h2 id="inquiry-list-title" className="text-card font-bold text-ink">
              문의 목록
            </h2>
            <p className="text-sm text-sub">
              {inquiryList.status === "success"
                ? `${inquiryList.total}건`
                : ""}
            </p>
          </div>
          <div className="overflow-x-auto rounded-media border border-line">
            {inquiryList.status === "loading" ? (
              <p className="bg-white px-5 py-12 text-center text-sm text-sub">
                불러오는 중입니다
              </p>
            ) : inquiryList.status === "error" ? (
              <p className="bg-white px-5 py-12 text-center text-sm text-sub">
                데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요
              </p>
            ) : visibleInquiries.length > 0 ? (
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead className="bg-cream text-sub">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-medium">
                      접수일
                    </th>
                    <th scope="col" className="px-5 py-4 font-medium">
                      회사 / 담당자
                    </th>
                    <th scope="col" className="px-5 py-4 font-medium">
                      분류
                    </th>
                    <th scope="col" className="px-5 py-4 font-medium">
                      프로젝트
                    </th>
                    <th scope="col" className="px-5 py-4 font-medium">
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-white">
                  {visibleInquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td className="whitespace-nowrap px-5 py-4 text-sub">
                        {inquiry.receivedAt.replaceAll("-", ".")}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="font-medium text-ink">
                          {inquiry.company}
                        </span>
                        <span className="ml-2 text-sub">{inquiry.contact}</span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sub">
                        {inquiry.category}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-ink">
                        {inquiry.project}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            inquiry.status === "신규"
                              ? "bg-soft text-main"
                              : inquiry.status === "완료"
                                ? "bg-cream text-sub"
                                : "bg-line text-ink"
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="bg-white px-5 py-12 text-center text-sm text-sub">
                표시할 데이터가 없습니다
              </p>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
}
