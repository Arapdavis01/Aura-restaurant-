"use client";

import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function FieldWrapper({ label, htmlFor, error, hint, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-[var(--fs-sm)] font-medium text-[var(--text-muted)]"
      >
        {label}
      </label>
      {children}
      {hint && !error && (
        <span className="text-[var(--fs-xs)] text-[var(--text-dim)]">{hint}</span>
      )}
      {error && (
        <span role="alert" className="text-[var(--fs-xs)] text-[var(--error)]">
          {error}
        </span>
      )}
    </div>
  );
}

const baseField =
  "w-full rounded-[var(--radius-sm)] border bg-[var(--bg-color)] px-4 py-3 text-[var(--text-main)] transition-colors duration-[var(--dur-base)] placeholder:text-[var(--text-dim)] focus:outline-none";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(function Input({ className, invalid, ...rest }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        baseField,
        invalid
          ? "border-[var(--error)]"
          : "border-[var(--border-color)] focus:border-[var(--accent)]",
        className,
      )}
      {...rest}
    />
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }
>(function Select({ className, invalid, children, ...rest }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        baseField,
        "cursor-pointer appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10",
        invalid
          ? "border-[var(--error)]"
          : "border-[var(--border-color)] focus:border-[var(--accent)]",
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='%23a0a0a0'><path d='M6 9L1 4h10z'/></svg>\")",
      }}
      {...rest}
    >
      {children}
    </select>
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(function Textarea({ className, invalid, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      rows={4}
      className={cn(
        baseField,
        "resize-y",
        invalid
          ? "border-[var(--error)]"
          : "border-[var(--border-color)] focus:border-[var(--accent)]",
        className,
      )}
      {...rest}
    />
  );
});
