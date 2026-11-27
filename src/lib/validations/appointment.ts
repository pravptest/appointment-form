import { z } from "zod";

export const SERVICES = [
  "Single Tooth Implant",
  "Multiple Tooth Implants",
  "Full Mouth Implants",
  "Root Canal Treatment",
  "Teeth Whitening",
  "Braces & Aligners",
  "Smile Makeover",
  "General Consultation",
] as const;

export type ServiceType = (typeof SERVICES)[number];

export const TIME_SLOTS = [
  "Morning (9AM–12PM)",
  "Afternoon (12PM–4PM)",
  "Evening (4PM–8PM)",
] as const;

export type TimeSlotType = (typeof TIME_SLOTS)[number];

// Indian Phone Number validation pattern:
// Optional +91, 91 or 0, followed by a 10 digit number starting with 6-9
const indianPhoneRegex = /^(?:\+91|91|0)?[6789]\d{9}$/;

export const appointmentSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters")
    .trim(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .transform((val) => val.replace(/[\s-]/g, "")) // Remove spaces and hyphens for clean processing
    .refine((val) => indianPhoneRegex.test(val), {
      message: "Please enter a valid 10-digit Indian mobile number (e.g., 9876543210)",
    }),
  service: z
    .enum(SERVICES, {
      message: "Please select a service interested in",
    }),
  preferredDate: z
    .string()
    .min(1, "Preferred date is required")
    .refine(
      (dateStr) => {
        // Parse date using local time to avoid timezone offset issues
        const parts = dateStr.split("-").map(Number);
        if (parts.length !== 3) return false;
        const [year, month, day] = parts;
        const selectedDate = new Date(year, month - 1, day);
        selectedDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return selectedDate >= today;
      },
      {
        message: "Preferred date cannot be in the past",
      }
    ),
  preferredTime: z
    .enum(TIME_SLOTS, {
      message: "Please select a preferred time slot",
    }),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
