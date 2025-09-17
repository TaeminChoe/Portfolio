"use client";
import React from "react";

import { cx } from "@/utils";

type ButtonColor = "primary" | "secondary";

export interface AlertButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
}

export default function AlertButton({
  color = "primary",
  className,
  children,
  ...rest
}: AlertButtonProps) {
  const base = `px-4 py-2 rounded-2xl border transition-transform transition-colors duration-200 cursor-pointer`;

  const colorClass =
    color === "primary"
      ? "bg-primary text-background border-border"
      : "bg-surface text-text border-border";

  return (
    <button className={cx(base, colorClass, className)} {...rest}>
      {children}
    </button>
  );
}
