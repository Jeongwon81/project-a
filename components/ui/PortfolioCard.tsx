import Image from "next/image";

type PortfolioCardProps = {
  image: string;
  title: string;
  category: string;
};

export default function PortfolioCard({
  image,
  title,
  category,
}: PortfolioCardProps) {
  return (
    <article className="group transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1">
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-media">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
        />
      </div>
      <h3 className="mb-1 text-card font-semibold text-ink">{title}</h3>
      <p className="text-sm text-sub">{category}</p>
    </article>
  );
}
