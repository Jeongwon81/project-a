export const company = {
  name: "STUDIO ONDO",
  address: "서울시 ○○구 ○○로 00",
  email: "hello@studio-ondo.example",
  phone: "02-000-0000",
};

export const menus = [
  { label: "소개", href: "/" },
  { label: "서비스", href: "/services" },
  { label: "포트폴리오", href: "/portfolio" },
  { label: "문의", href: "/contact" },
];

export const cta = {
  label: "프로젝트 문의",
  href: "/contact",
};

export const hero = {
  eyebrow: "DESIGN STUDIO",
  title: "브랜드의 온도를\n디자인합니다",
  description: [
    "브랜딩부터 웹사이트, 대시보드까지.",
    "사용자가 기억하는 경험을 만듭니다.",
  ],
  image: "/images/hero-main.jpg",
  buttons: [
    { label: "프로젝트 문의", href: "/contact", variant: "primary" as const },
    {
      label: "포트폴리오 보기",
      href: "/portfolio",
      variant: "outline" as const,
    },
  ],
};

export const services = [
  {
    icon: "B",
    title: "브랜딩",
    desc: "로고, 컬러, 서체까지 브랜드의 기준을 정리합니다.",
    link: "/contact",
  },
  {
    icon: "W",
    title: "웹 디자인",
    desc: "기업 홈페이지와 랜딩 페이지를 반응형으로 설계합니다.",
    link: "/contact",
  },
  {
    icon: "D",
    title: "대시보드 UI",
    desc: "복잡한 데이터를 한눈에 읽히는 화면으로 바꿉니다.",
    link: "/contact",
  },
  {
    icon: "V",
    title: "브랜드 영상",
    desc: "브랜드 이야기를 짧은 영상으로 만듭니다.",
    link: "/contact",
  },
] as const;

export const portfolio = [
  {
    image: "/images/pf-01.jpg",
    title: "A사 브랜드 리뉴얼",
    category: "브랜딩",
  },
  {
    image: "/images/pf-02.jpg",
    title: "B사 기업 홈페이지",
    category: "웹 디자인",
  },
  {
    image: "/images/pf-03.jpg",
    title: "C사 매출 대시보드",
    category: "대시보드 UI",
  },
  {
    image: "/images/pf-04.jpg",
    title: "D 카페 브랜딩",
    category: "브랜딩",
  },
  {
    image: "/images/pf-05.jpg",
    title: "E사 채용 사이트",
    category: "웹 디자인",
  },
  {
    image: "/images/pf-06.jpg",
    title: "F사 캠페인 페이지",
    category: "웹 디자인",
  },
] as const;

export const contact = {
  title: "새 프로젝트를\n함께 시작해 보세요",
  buttonLabel: "프로젝트 문의",
} as const;
