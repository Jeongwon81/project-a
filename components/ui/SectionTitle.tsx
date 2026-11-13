type SectionTitleProps = {
  eyebrow: string;
  title: string;
};

export default function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-xs font-semibold tracking-eyebrow text-main">
        {eyebrow}
      </p>
      <h2
        id={`${eyebrow.toLowerCase()}-title`}
        className="text-title-sm font-bold text-ink md:text-title"
      >
        {title}
      </h2>
    </div>
  );
}
