"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import Button from "@/components/ui/Button";
import { FieldWrapper, Input, Select, Textarea } from "@/components/ui/Input";
import { reservationSchema, type ReservationInput } from "@/lib/validations";
import { GUEST_OPTIONS, RESERVATION_TIMES } from "@/lib/constants";
import { formatTime24to12, maxReservationDateISO, todayISO } from "@/lib/utils";

export default function ReservationForm() {
  const [submitted, setSubmitted] = useState<ReservationInput | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: "2",
      time: "",
      notes: "",
    },
  });

  const onSubmit = async (data: ReservationInput) => {
    // Phase 1 — frontend only. Log + simulate success.
    // Phase 2 will POST this payload to /api/reservations.
    await new Promise((r) => setTimeout(r, 600));
    console.log("Reservation submitted:", data);
    setSubmitted(data);
  };

  const handleReset = () => {
    setSubmitted(null);
    reset();
  };

  if (submitted) {
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
              placeholder="+1 555 000 0000"
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

        <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Confirming..." : "Confirm Reservation"}
        </Button>

        <p className="text-center text-[var(--fs-xs)] text-[var(--text-dim)]">
          Demo mode — no data leaves your browser.
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
