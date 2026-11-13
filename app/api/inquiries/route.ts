import { neon } from "@neondatabase/serverless";

const allowedTypes = new Set(["브랜딩", "웹 디자인", "대시보드 UI"]);

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type");

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not configured");
    }

    const sql = neon(databaseUrl);
    const includeAll = !type || type === "전체";
    const items = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "receivedAt",
        company,
        owner AS contact,
        type AS category,
        ''::text AS project,
        status
      FROM inquiries
      WHERE ${includeAll} OR type = ${type}
      ORDER BY date ASC, id ASC
    `;

    return Response.json({ total: items.length, items });
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return Response.json(
      { message: "문의 목록을 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "요청 본문이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json(
      { message: "company, type, owner 값을 입력해 주세요." },
      { status: 400 },
    );
  }

  const payload = body as Record<string, unknown>;
  const company =
    typeof payload.company === "string" ? payload.company.trim() : "";
  const type = typeof payload.type === "string" ? payload.type.trim() : "";
  const owner = typeof payload.owner === "string" ? payload.owner.trim() : "";
  const isValidText = (value: string) =>
    value.length > 0 && Array.from(value).length <= 50;

  if (
    !isValidText(company) ||
    !isValidText(type) ||
    !isValidText(owner) ||
    !allowedTypes.has(type)
  ) {
    return Response.json(
      {
        message:
          "회사명과 담당자는 1~50자여야 하며, type은 허용된 분류 중 하나여야 합니다.",
      },
      { status: 400 },
    );
  }

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not configured");
    }

    const sql = neon(databaseUrl);
    const status = "상담 중";
    const [item] = await sql`
      INSERT INTO inquiries (
        date,
        company,
        type,
        owner,
        status
      )
      VALUES (
        (now() AT TIME ZONE 'Asia/Seoul')::date,
        ${company},
        ${type},
        ${owner},
        ${status}
      )
      RETURNING
        id,
        to_char(date, 'YYYY-MM-DD') AS "receivedAt",
        company,
        owner AS contact,
        type AS category,
        ''::text AS project,
        status
    `;

    if (!item) {
      throw new Error("Inquiry insert returned no row");
    }

    return Response.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Failed to create inquiry:", error);
    return Response.json(
      { message: "문의를 저장하지 못했습니다." },
      { status: 500 },
    );
  }
}
