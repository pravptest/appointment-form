import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book a Consultation | Lumora Dental Clinic",
  description: "Schedule your professional dental consultation at Lumora Dental Clinic. Specializing in implants, root canals, teeth whitening, smile makeover, braces, and general dental care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-800 bg-slate-50 selection:bg-blue-100 selection:text-blue-900`}
      >
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 5000,
            style: {
              background: "#ffffff",
              color: "#1e293b",
              borderRadius: "12px",
              boxShadow: "0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -4px rgba(15, 23, 42, 0.05)",
              border: "1px solid #f1f5f9",
              padding: "12px 16px",
              fontSize: "14px",
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }} 
        />
        {children}
      </body>
    </html>
  );
}
