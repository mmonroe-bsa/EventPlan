import * as React from "react";
import { clsx } from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded px-4 py-2 text-sm font-semibold",
        variant === "default" && "bg-slate-900 text-white",
        variant === "outline" && "border border-slate-200 bg-white",
        className
      )}
      {...props}
    />
  );
}
