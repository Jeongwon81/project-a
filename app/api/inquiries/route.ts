import { inquiries } from "@/data/dashboard";

export function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type");
  const items =
    type && type !== "전체"
      ? inquiries.filter((inquiry) => inquiry.category === type)
      : inquiries;

  return Response.json({ total: items.length, items });
}
