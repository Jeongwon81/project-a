# STUDIO ONDO

브랜딩과 웹 디자인 서비스를 소개하는 반응형 스튜디오 웹사이트입니다. Next.js App Router와 Tailwind CSS로 구성되어 있습니다.

## 주요 기능

- 서비스 카드와 포트폴리오 섹션
- 포트폴리오 분류 탭 및 카테고리별 카드 필터링
- 모바일 햄버거 메뉴: 슬라이드 패널, 바깥 영역·ESC로 닫기, 키보드 접근성 지원
- 서비스 카드와 포트폴리오 목록의 화면 진입 애니메이션
- `prefers-reduced-motion` 설정 사용자를 위한 애니메이션 비활성화
- 연락처 섹션의 이메일·전화 연결

## 기술 스택

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## 시작하기

Node.js와 npm이 설치되어 있어야 합니다.

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 명령어

```bash
npm run dev    # 개발 서버
npm run lint   # ESLint 검사
npm run build  # 프로덕션 빌드
npm run start  # 프로덕션 서버
```

## 프로젝트 구조

```text
app/                    앱 라우트와 전역 스타일
components/layout/      헤더, 모바일 메뉴, 푸터
components/sections/    페이지 섹션
components/ui/          재사용 UI 컴포넌트
data/site.ts            사이트 문구, 메뉴, 서비스, 포트폴리오 데이터
public/images/          사이트 이미지
```

사이트 콘텐츠와 연락처를 수정하려면 `data/site.ts`를 편집하세요. 현재 주소와 연락처는 예시 값이므로 배포 전에 실제 정보로 교체해야 합니다.