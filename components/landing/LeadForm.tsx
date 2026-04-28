"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { AppTranslations } from "@/lib/site-data";

type Props = {
  t: AppTranslations["landing"]["form"];
};

type FieldErrors = Partial<Record<"name" | "phone", string>>;

type Status = "idle" | "submitting" | "success" | "error";

const LEADS_ENDPOINT =
  "https://yuboraman.uz/api/v1/sites/webhook/a9c74578-0e23-4001-a233-efc32b155eeb-1777371930/";

const SOURCE = "landing";

const PHONE_LOCAL_REGEX = /^\d{9}$/;
const PHONE_PREFIX = "+998";

const RequiredMark = () => (
  <span aria-hidden="true" className="ml-0.5 text-white">*</span>
);

const formatPhone = (input: string): string => {
  const digits = input.replace(/\D/g, "").slice(0, 9);
  const parts: string[] = [];
  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 5));
  if (digits.length > 5) parts.push(digits.slice(5, 7));
  if (digits.length > 7) parts.push(digits.slice(7, 9));
  return parts.join(" ");
};

export function LeadForm({ t }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setStatus("idle"), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = t.nameError;
    if (!PHONE_LOCAL_REGEX.test(phone.replace(/\D/g, ""))) next.phone = t.phoneError;
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");

    try {
      const response = await fetch(LEADS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          source: SOURCE,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("success");
      setName("");
      setPhone("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[20px] border border-secondary/40 bg-secondary/15 p-5 text-mist"
      >
        <p className="text-lg font-semibold text-white">{t.successTitle}</p>
        <p className="mt-1.5 text-sm leading-6 text-white/80">{t.successText}</p>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  const inputBaseClass =
    "h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/45 focus:border-secondary focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-[520px] space-y-3">
      <div>
        <label htmlFor="lead-name" className="mb-1.5 block text-xs font-medium text-white/70">
          {t.nameLabel}
          <RequiredMark />
        </label>
        <input
          id="lead-name"
          type="text"
          autoComplete="given-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          className={`${inputBaseClass} ${errors.name ? "border-danger-soft/60" : ""}`}
          aria-invalid={Boolean(errors.name)}
          disabled={isSubmitting}
          required
        />
        {errors.name && (
          <p className="mt-1 text-xs text-danger-soft">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="lead-phone" className="mb-1.5 block text-xs font-medium text-white/70">
          {t.phoneLabel}
          <RequiredMark />
        </label>
        <div
          className={`flex h-12 w-full overflow-hidden rounded-xl border bg-white/[0.04] transition-colors focus-within:border-secondary ${
            errors.phone ? "border-danger-soft/60" : "border-white/15"
          }`}
        >
          <span
            aria-hidden="true"
            className="flex select-none items-center border-r border-white/15 px-3 text-sm text-white/85"
          >
            {PHONE_PREFIX}
          </span>
          <input
            id="lead-phone"
            type="tel"
            autoComplete="tel-national"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder={t.phonePlaceholder}
            maxLength={12}
            className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/45 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            aria-invalid={Boolean(errors.phone)}
            disabled={isSubmitting}
            required
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-xs text-danger-soft">{errors.phone}</p>
        )}
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-danger-soft/50 bg-danger-soft/10 p-3 text-sm text-muted-danger">
          <p className="font-semibold">{t.errorTitle}</p>
          <p className="mt-0.5 text-xs leading-5">{t.errorText}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-secondary px-6 text-sm font-semibold text-white transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[180px]"
      >
        {isSubmitting ? t.submittingLabel : t.submitLabel}
      </button>
    </form>
  );
}
