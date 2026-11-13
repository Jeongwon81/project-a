import Link from "next/link";

type ServiceCardProps = {
  icon: string;
  title: string;
  desc: string;
  link: string;
};

export default function ServiceCard({
  icon,
  title,
  desc,
  link,
}: ServiceCardProps) {
  return (
    <article className="rounded-card border border-line p-6">
      <span
        className="mb-4 flex size-12 items-center justify-center rounded-icon bg-soft text-sm font-semibold text-main"
        aria-hidden="true"
      >
        {icon}
      </span>
      <h3 className="mb-2 text-card font-semibold text-ink">{title}</h3>
      <p className="break-words text-sm leading-relaxed text-sub">{desc}</p>
      <Link
        href={link}
        className="mt-4 inline-block font-semibold text-main hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
      >
        자세히 보기
      </Link>
    </article>
  );
}
