"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import Button from "@/components/ui/Button";
import { FieldWrapper, Input, Select, Textarea } from "@/components/ui/Input";
import { reservationSchema, type ReservationInput } from "@/lib/validations";
import {
  GUEST_OPTIONS,
  RESERVATION_ACCESS_KEY,
  RESERVATION_ENDPOINT,
  RESERVATION_TIMES,
} from "@/lib/constants";
import { formatTime24to12, maxReservationDateISO, todayISO } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export default function ReservationForm() {
  const [submitted, setSubmitted] = useState<ReservationInput | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: "2",
      time: "",
      notes: "",
    },
  });

  const onSubmit = async (data: ReservationInput) => {
    setStatus("submitting");
    setServerError(null);

    if (!RESERVATION_ACCESS_KEY) {
      setStatus("error");
      setServerError(
        "Reservation service is not configured. Please call us directly.",
      );
      return;
    }

    try {
      const response = await fetch(RESERVATION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: RESERVATION_ACCESS_KEY,
          subject: `New Reservation — ${data.name}`,
          from_name: "AURA Reservations",
          replyto: data.email,
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: formatTime24to12(data.time),
          guests: data.guests,
          notes: data.notes || "—",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Submission failed.");
      }

      setSubmitted(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or call us.",
      );
    }
  };

  const handleReset = () => {
    setSubmitted(null);
    setStatus("idle");
    setServerError(null);
    reset();
  };

  if (status === "success" && submitted) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-[var(--border-color)] bg-[var(--card-bg)] p-10 text-center">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-[3rem] text-[var(--success)]"
        />
        <h3 className="mt-4 font-serif text-[var(--fs-2xl)]">
          Reservation Confirmed
        </h3>
        <p className="mt-2 text-[var(--text-muted)]">
          Thank you, {submitted.name.split(" ")[0]}. We look forward to
          welcoming you to Aura.
        </p>
        <p className="mt-4 text-[var(--fs-sm)] text-[var(--text-dim)]">
          Our team has received your request and will contact you at{" "}
          {submitted.email} if anything changes.
        </p>
        <dl className="mx-auto mt-8 grid max-w-sm gap-3 text-left text-[var(--fs-sm)]">
          <Row label="Date" value={submitted.date} />
          <Row label="Time" value={formatTime24to12(submitted.time)} />
          <Row label="Guests" value={submitted.guests} />
        </dl>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={handleReset}>
            Book Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[var(--radius-lg)] border border-[var(--border-color)] bg-[var(--card-bg)] p-8 lg:p-10"
    >
      <div className="grid gap-6">
        <FieldWrapper label="Full Name" htmlFor="name" error={errors.name?.message}>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            invalid={!!errors.name}
            {...register("name")}
          />
        </FieldWrapper>

        <div className="grid gap-6 sm:grid-cols-2">
          <FieldWrapper label="Email" htmlFor="email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              invalid={!!errors.email}
              {...register("email")}
            />
          </FieldWrapper>

          <FieldWrapper label="Phone" htmlFor="phone" error={errors.phone?.message}>
            <Input
              id="phone"
              type="tel"
              placeholder="+254 700 000 000"
              autoComplete="tel"
              invalid={!!errors.phone}
              {...register("phone")}
            />
          </FieldWrapper>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <FieldWrapper label="Date" htmlFor="date" error={errors.date?.message}>
            <Input
              id="date"
              type="date"
              min={todayISO()}
              max={maxReservationDateISO(90)}
              invalid={!!errors.date}
              {...register("date")}
            />
          </FieldWrapper>

          <FieldWrapper label="Time" htmlFor="time" error={errors.time?.message}>
            <Select id="time" invalid={!!errors.time} {...register("time")}>
              <option value="">Select time</option>
              {RESERVATION_TIMES.map((t) => (
                <option key={t} value={t}>
                  {formatTime24to12(t)}
                </option>
              ))}
            </Select>
          </FieldWrapper>

          <FieldWrapper label="Guests" htmlFor="guests" error={errors.guests?.message}>
            <Select id="guests" invalid={!!errors.guests} {...register("guests")}>
              {GUEST_OPTIONS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </Select>
          </FieldWrapper>
        </div>

        <FieldWrapper
          label="Special Requests"
          htmlFor="notes"
          error={errors.notes?.message}
          hint="Optional. Allergies, occasions, seating preferences."
        >
          <Textarea
            id="notes"
            placeholder="Anything we should know?"
            invalid={!!errors.notes}
            {...register("notes")}
          />
        </FieldWrapper>

        {status === "error" && serverError && (
          <div
            role="alert"
            className="rounded-[var(--radius-sm)] border border-[var(--error)] bg-[rgba(229,72,77,0.1)] px-4 py-3 text-[var(--fs-sm)] text-[var(--error)]"
          >
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Confirm Reservation"}
        </Button>

        <p className="text-center text-[var(--fs-xs)] text-[var(--text-dim)]">
          Your request is sent directly to our reservations inbox.
        </p>
      </div>
    </form>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--border-color)] pb-2">
      <dt className="text-[var(--text-muted)]">{label}</dt>
      <dd className="font-medium text-[var(--text-main)]">{value}</dd>
    </div>
  );
}
