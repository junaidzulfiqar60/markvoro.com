"use client";

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "green";
  className?: string;
  loading?: boolean;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  green: "btn-green",
};

export default function Button({
  children,
  variant = "primary",
  className,
  loading,
  href,
  ...props
}: ButtonProps) {
  const styles = cn(variantClass[variant], loading && "opacity-80", className);

  if (href) {
    return (
      <a
        href={href}
        className={styles}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </a>
    );
  }

  return (
    <button
      className={styles}
      disabled={loading || (props as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
