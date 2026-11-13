import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: "primary" | "outline";
};

export default function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-main text-white hover:bg-main-dark"
      : "border border-ink bg-white text-ink hover:bg-cream";

  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-btn font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main ${variantClass} ${className}`}
      {...props}
    />
  );
}
