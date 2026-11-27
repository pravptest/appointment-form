"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { 
  User, 
  Phone, 
  Stethoscope, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  CalendarCheck2 
} from "lucide-react";
import { 
  appointmentSchema, 
  SERVICES, 
  TIME_SLOTS, 
  type AppointmentFormValues 
} from "@/lib/validations/appointment";

export default function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<AppointmentFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      service: undefined,
      preferredDate: "",
      preferredTime: undefined,
    },
  });

  // Get today's date in local time YYYY-MM-DD to restrict past dates in date picker UI
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const onSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true);
    const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("NEXT_PUBLIC_MAKE_WEBHOOK_URL is not set.");
      toast.error("Configuration error: Webhook URL is missing. Check .env.local file.");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        fullName: data.fullName,
        phone: data.phone,
        service: data.service,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          fullName: data.fullName,
          phone: data.phone,
          service: data.service,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          submittedAt: new Date().toISOString(),
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      
      toast.success("Consultation request sent!");
      setSubmittedData(data);
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Something went wrong. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && submittedData) {
    return (
      <div 
        className="w-full bg-white dark:bg-[#1F2937] rounded-3xl p-8 md:p-10 border border-slate-100 dark:border-gray-700 shadow-xl shadow-slate-100/50 dark:shadow-black/40 flex flex-col items-center text-center animate-fade-in transition-colors duration-200"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mb-6 text-emerald-500 dark:text-emerald-400 animate-scale-up">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h3 className="text-2xl font-bold text-slate-800 dark:text-[#F9FAFB] tracking-tight mb-3">
          Appointment Requested!
        </h3>
        
        <p className="text-sm leading-relaxed text-slate-500 dark:text-[#D1D5DB] max-w-md mb-8">
          Thank you! Your consultation request has been received. Our team will contact you within 30 minutes.
        </p>

        <div className="w-full bg-slate-50 dark:bg-[#111827] rounded-2xl p-5 mb-8 text-left border border-slate-100/60 dark:border-gray-700 divide-y divide-slate-100 dark:divide-gray-700/60">
          <div className="pb-3 flex justify-between items-center text-sm">
            <span className="text-slate-400 dark:text-[#9CA3AF] font-medium">Patient Name</span>
            <span className="text-slate-700 dark:text-[#F9FAFB] font-semibold">{submittedData.fullName}</span>
          </div>
          <div className="py-3 flex justify-between items-center text-sm">
            <span className="text-slate-400 dark:text-[#9CA3AF] font-medium">Selected Service</span>
            <span className="text-slate-700 dark:text-[#F9FAFB] font-semibold">{submittedData.service}</span>
          </div>
          <div className="py-3 flex justify-between items-center text-sm">
            <span className="text-slate-400 dark:text-[#9CA3AF] font-medium">Preferred Date</span>
            <span className="text-slate-700 dark:text-[#F9FAFB] font-semibold">
              {new Date(submittedData.preferredDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="pt-3 flex justify-between items-center text-sm">
            <span className="text-slate-400 dark:text-[#9CA3AF] font-medium">Preferred Time</span>
            <span className="text-slate-700 dark:text-[#F9FAFB] font-semibold">{submittedData.preferredTime}</span>
          </div>
        </div>

        <button
          onClick={() => setIsSuccess(false)}
          className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:focus:ring-blue-500/20 active:scale-[0.98]"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-[#1F2937] rounded-3xl p-8 md:p-10 border border-slate-100 dark:border-gray-700 shadow-2xl shadow-slate-200/50 dark:shadow-black/40 transition-colors duration-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
          <CalendarCheck2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-[#F9FAFB] tracking-tight">Book a Consultation</h3>
          <p className="text-xs text-slate-400 dark:text-[#9CA3AF] font-medium">Secure your slot in just 60 seconds</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label 
            htmlFor="fullName" 
            className="block text-xs font-bold text-slate-500 dark:text-[#D1D5DB] uppercase tracking-wider mb-2"
          >
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-[#9CA3AF] group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200">
              <User className="w-4 h-4" />
            </div>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. Rahul Sharma"
              aria-invalid={errors.fullName ? "true" : "false"}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              {...register("fullName")}
              disabled={isSubmitting}
              className={`w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#374151] border ${
                errors.fullName 
                  ? "border-red-300 dark:border-red-500/70 focus:ring-red-100 dark:focus:ring-red-900/30 focus:border-red-400 dark:focus:border-red-400" 
                  : "border-slate-200/80 dark:border-[#4B5563] focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400"
              } text-slate-800 dark:text-[#F9FAFB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF] rounded-xl text-sm focus:outline-none focus:ring-4 transition duration-200`}
            />
          </div>
          {errors.fullName && (
            <span 
              id="fullName-error" 
              role="alert" 
              className="block mt-1.5 text-xs font-semibold text-red-500 dark:text-red-400 pl-1"
            >
              {errors.fullName.message}
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label 
            htmlFor="phone" 
            className="block text-xs font-bold text-slate-500 dark:text-[#D1D5DB] uppercase tracking-wider mb-2"
          >
            Phone Number
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-[#9CA3AF] group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. +91 98765 43210"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone")}
              disabled={isSubmitting}
              className={`w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#374151] border ${
                errors.phone 
                  ? "border-red-300 dark:border-red-500/70 focus:ring-red-100 dark:focus:ring-red-900/30 focus:border-red-400 dark:focus:border-red-400" 
                  : "border-slate-200/80 dark:border-[#4B5563] focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400"
              } text-slate-800 dark:text-[#F9FAFB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF] rounded-xl text-sm focus:outline-none focus:ring-4 transition duration-200`}
            />
          </div>
          {errors.phone && (
            <span 
              id="phone-error" 
              role="alert" 
              className="block mt-1.5 text-xs font-semibold text-red-500 dark:text-red-400 pl-1"
            >
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Service Interested In */}
        <div>
          <label 
            htmlFor="service" 
            className="block text-xs font-bold text-slate-500 dark:text-[#D1D5DB] uppercase tracking-wider mb-2"
          >
            Service Interested In
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-[#9CA3AF] group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200">
              <Stethoscope className="w-4 h-4" />
            </div>
            <select
              id="service"
              defaultValue=""
              aria-invalid={errors.service ? "true" : "false"}
              aria-describedby={errors.service ? "service-error" : undefined}
              {...register("service")}
              disabled={isSubmitting}
              className={`w-full pl-11 pr-10 py-3 bg-slate-50 dark:bg-[#374151] border ${
                errors.service 
                  ? "border-red-300 dark:border-red-500/70 focus:ring-red-100 dark:focus:ring-red-900/30 focus:border-red-400 dark:focus:border-red-400" 
                  : "border-slate-200/80 dark:border-[#4B5563] focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400"
              } text-slate-700 dark:text-[#F9FAFB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF] rounded-xl text-sm focus:outline-none focus:ring-4 transition duration-200 appearance-none`}
            >
              <option value="" disabled className="bg-white dark:bg-gray-800 text-slate-500 dark:text-gray-400">Select dental service</option>
              {SERVICES.map((option) => (
                <option key={option} value={option} className="bg-white dark:bg-gray-800 text-slate-800 dark:text-[#F9FAFB]">
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 dark:text-[#9CA3AF]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.service && (
            <span 
              id="service-error" 
              role="alert" 
              className="block mt-1.5 text-xs font-semibold text-red-500 dark:text-red-400 pl-1"
            >
              {errors.service.message}
            </span>
          )}
        </div>

        {/* Date and Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Preferred Date */}
          <div>
            <label 
              htmlFor="preferredDate" 
              className="block text-xs font-bold text-slate-500 dark:text-[#D1D5DB] uppercase tracking-wider mb-2"
            >
              Preferred Date
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-[#9CA3AF] group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                id="preferredDate"
                type="date"
                min={getTodayString()}
                aria-invalid={errors.preferredDate ? "true" : "false"}
                aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
                {...register("preferredDate")}
                disabled={isSubmitting}
                className={`w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#374151] border ${
                  errors.preferredDate 
                    ? "border-red-300 dark:border-red-500/70 focus:ring-red-100 dark:focus:ring-red-900/30 focus:border-red-400 dark:focus:border-red-400" 
                    : "border-slate-200/80 dark:border-[#4B5563] focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400"
                } text-slate-700 dark:text-[#F9FAFB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF] rounded-xl text-sm focus:outline-none focus:ring-4 transition duration-200 [color-scheme:light] dark:[color-scheme:dark]`}
              />
            </div>
            {errors.preferredDate && (
              <span 
                id="preferredDate-error" 
                role="alert" 
                className="block mt-1.5 text-xs font-semibold text-red-500 dark:text-red-400 pl-1"
              >
                {errors.preferredDate.message}
              </span>
            )}
          </div>

          {/* Preferred Time */}
          <div>
            <label 
              htmlFor="preferredTime" 
              className="block text-xs font-bold text-slate-500 dark:text-[#D1D5DB] uppercase tracking-wider mb-2"
            >
              Preferred Time
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-[#9CA3AF] group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200">
                <Clock className="w-4 h-4" />
              </div>
              <select
                id="preferredTime"
                defaultValue=""
                aria-invalid={errors.preferredTime ? "true" : "false"}
                aria-describedby={errors.preferredTime ? "preferredTime-error" : undefined}
                {...register("preferredTime")}
                disabled={isSubmitting}
                className={`w-full pl-11 pr-10 py-3 bg-slate-50 dark:bg-[#374151] border ${
                  errors.preferredTime 
                    ? "border-red-300 dark:border-red-500/70 focus:ring-red-100 dark:focus:ring-red-900/30 focus:border-red-400 dark:focus:border-red-400" 
                    : "border-slate-200/80 dark:border-[#4B5563] focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400"
                } text-slate-700 dark:text-[#F9FAFB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF] rounded-xl text-sm focus:outline-none focus:ring-4 transition duration-200 appearance-none`}
              >
                <option value="" disabled className="bg-white dark:bg-gray-800 text-slate-500 dark:text-gray-400">Select time slot</option>
                {TIME_SLOTS.map((option) => (
                  <option key={option} value={option} className="bg-white dark:bg-gray-800 text-slate-800 dark:text-[#F9FAFB]">
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 dark:text-[#9CA3AF]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.preferredTime && (
              <span 
                id="preferredTime-error" 
                role="alert" 
                className="block mt-1.5 text-xs font-semibold text-red-500 dark:text-red-400 pl-1"
              >
                {errors.preferredTime.message}
              </span>
            )}
          </div>
        </div>

        {/* CTA Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 py-4 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:bg-blue-400 dark:disabled:bg-blue-800/60 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-600/10 dark:shadow-blue-900/30 hover:shadow-blue-600/25 transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Scheduling Consultation...
            </>
          ) : (
            "Book Free Consultation"
          )}
        </button>
      </form>
    </div>
  );
}
