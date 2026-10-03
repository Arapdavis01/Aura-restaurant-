import { z } from "zod";
import { todayISO } from "./utils";

export const reservationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Phone number is too long."),
  date: z
    .string()
    .refine((val) => val >= todayISO(), {
      message: "Please choose today or a future date.",
    }),
  time: z.string().min(1, "Please select a time."),
  guests: z.string().min(1, "Please select party size."),
  notes: z.string().max(300, "Notes are too long.").optional().or(z.literal("")),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
