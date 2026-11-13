export const inquiryCategories = [
  "브랜딩",
  "웹 디자인",
  "대시보드 UI",
] as const;

export type InquiryCategory = (typeof inquiryCategories)[number];
export type InquiryStatus = "신규" | "진행 중" | "완료";

export type Inquiry = {
  id: number;
  receivedAt: string;
  company: string;
  contact: string;
  category: InquiryCategory;
  project: string;
  status: InquiryStatus;
};

export const monthlyInquiryCounts = [
  { month: "2026-04", "브랜딩": 2, "웹 디자인": 3, "대시보드 UI": 1 },
  { month: "2026-05", "브랜딩": 3, "웹 디자인": 2, "대시보드 UI": 2 },
  { month: "2026-06", "브랜딩": 2, "웹 디자인": 4, "대시보드 UI": 1 },
  { month: "2026-07", "브랜딩": 4, "웹 디자인": 3, "대시보드 UI": 2 },
  { month: "2026-08", "브랜딩": 3, "웹 디자인": 4, "대시보드 UI": 2 },
  { month: "2026-09", "브랜딩": 4, "웹 디자인": 3, "대시보드 UI": 3 },
  { month: "2026-10", "브랜딩": 3, "웹 디자인": 3, "대시보드 UI": 2 },
  { month: "2026-11", "브랜딩": 3, "웹 디자인": 2, "대시보드 UI": 2 },
] satisfies {
  month: string;
  [category: string]: number | string;
}[];

export const inquiries: Inquiry[] = [
  {
    id: 1,
    receivedAt: "2026-11-05",
    company: "온유 라이프",
    contact: "김민지",
    category: "브랜딩",
    project: "브랜드 아이덴티티 리뉴얼",
    status: "신규",
  },
  {
    id: 2,
    receivedAt: "2026-11-04",
    company: "모노랩",
    contact: "이준호",
    category: "웹 디자인",
    project: "기업 웹사이트 제작",
    status: "진행 중",
  },
  {
    id: 3,
    receivedAt: "2026-11-03",
    company: "데이터웨이브",
    contact: "박서연",
    category: "대시보드 UI",
    project: "운영 데이터 대시보드",
    status: "신규",
  },
  {
    id: 4,
    receivedAt: "2026-11-02",
    company: "담소당",
    contact: "최현우",
    category: "브랜딩",
    project: "신규 카페 브랜드 개발",
    status: "완료",
  },
  {
    id: 5,
    receivedAt: "2026-11-01",
    company: "플로우웍스",
    contact: "정유진",
    category: "웹 디자인",
    project: "서비스 소개 페이지",
    status: "진행 중",
  },
  {
    id: 14,
    receivedAt: "2026-11-01",
    company: "봄결 스튜디오",
    contact: "강예린",
    category: "브랜딩",
    project: "라이프스타일 브랜드 개발",
    status: "신규",
  },
  {
    id: 15,
    receivedAt: "2026-11-01",
    company: "클라우드나인",
    contact: "조은우",
    category: "대시보드 UI",
    project: "구독 서비스 운영 화면",
    status: "진행 중",
  },
  {
    id: 6,
    receivedAt: "2026-10-29",
    company: "그린픽",
    contact: "윤지호",
    category: "브랜딩",
    project: "친환경 식품 브랜드",
    status: "신규",
  },
  {
    id: 7,
    receivedAt: "2026-10-26",
    company: "에이블헬스",
    contact: "한수빈",
    category: "대시보드 UI",
    project: "헬스케어 관리 화면",
    status: "진행 중",
  },
  {
    id: 8,
    receivedAt: "2026-10-23",
    company: "스튜디오 느린",
    contact: "오민석",
    category: "웹 디자인",
    project: "공방 예약 웹사이트",
    status: "완료",
  },
  {
    id: 9,
    receivedAt: "2026-10-20",
    company: "루트앤코",
    contact: "임다은",
    category: "브랜딩",
    project: "브랜드 전략 및 로고",
    status: "진행 중",
  },
  {
    id: 10,
    receivedAt: "2026-10-16",
    company: "비트포지",
    contact: "장도윤",
    category: "웹 디자인",
    project: "B2B 플랫폼 리뉴얼",
    status: "신규",
  },
  {
    id: 11,
    receivedAt: "2026-10-12",
    company: "웰니스온",
    contact: "문하린",
    category: "대시보드 UI",
    project: "회원 분석 대시보드",
    status: "완료",
  },
  {
    id: 12,
    receivedAt: "2026-10-08",
    company: "어반플랜",
    contact: "송태경",
    category: "웹 디자인",
    project: "공간 소개 웹사이트",
    status: "신규",
  },
  {
    id: 13,
    receivedAt: "2026-10-03",
    company: "오후의 식탁",
    contact: "배지은",
    category: "브랜딩",
    project: "브랜드 패키지 디자인",
    status: "신규",
  },
];
