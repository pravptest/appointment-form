import AppointmentForm from "@/components/AppointmentForm";
import ThemeToggle from "@/components/ThemeToggle";
import {
  ShieldCheck,
  Award,
  Activity,
  Sparkles,
  MapPin,
  Phone,
  Clock,
  Star
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] flex flex-col font-sans transition-colors duration-200">
      {/* Top Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-100 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <span className="font-bold text-lg tracking-tight">L</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-800 dark:text-gray-100 text-lg tracking-tight">Lumora</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs block -mt-1 tracking-wider uppercase">Dental Clinic</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-semibold text-slate-500 dark:text-gray-400 hover:text-slate-950 dark:hover:text-gray-100 transition duration-150">Services</a>
            <a href="#about" className="text-sm font-semibold text-slate-500 dark:text-gray-400 hover:text-slate-950 dark:hover:text-gray-100 transition duration-150">Why Choose Us</a>
            <a href="#testimonials" className="text-sm font-semibold text-slate-500 dark:text-gray-400 hover:text-slate-950 dark:hover:text-gray-100 transition duration-150">Testimonials</a>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <a 
              href="#booking-section" 
              className="hidden sm:inline-flex px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/30 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white rounded-xl text-xs font-bold transition duration-200 active:scale-[0.98]"
            >
              Book Appointment
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Content Section */}
      <main className="flex-grow flex items-center py-12 lg:py-20" id="booking-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Side: Brand Value Proposition & Trust */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50/60 dark:bg-blue-950/40 rounded-full border border-blue-100/40 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Premium Dental Care In India
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-gray-50 tracking-tight leading-[1.1]">
                  Experience a Healthy, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    Brilliant Smile
                  </span>
                </h1>
                <p className="text-slate-500 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Step into Next-Generation Dentistry. Our clinic integrates advanced digital diagnostics, state-of-the-art implant procedures, and bespoke cosmetic transformations to deliver world-class dental solutions customized just for you.
                </p>
              </div>

              {/* Clinic Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
                <div className="flex items-start gap-3.5">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 dark:text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-gray-100 text-sm">ISO Certified Care</h4>
                    <p className="text-slate-400 dark:text-gray-400 text-xs mt-0.5 leading-normal">
                      Exceeding international clinical hygiene and sterilization safety norms.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-500 dark:text-blue-400 flex items-center justify-center">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-gray-100 text-sm">Top Rated Implantology</h4>
                    <p className="text-slate-400 dark:text-gray-400 text-xs mt-0.5 leading-normal">
                      Specialized full-mouth implantologists with 15+ years experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-500 dark:text-amber-400 flex items-center justify-center">
                    <Star className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-gray-100 text-sm">4.9 Star Google Rating</h4>
                    <p className="text-slate-400 dark:text-gray-400 text-xs mt-0.5 leading-normal">
                      Ranked #1 for cosmetic dental procedures and patient satisfaction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-500 dark:text-purple-400 flex items-center justify-center">
                    <Activity className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-gray-100 text-sm">Painless Dental Tech</h4>
                    <p className="text-slate-400 dark:text-gray-400 text-xs mt-0.5 leading-normal">
                      State-of-the-art laser therapies, micro-surgery, and sedation dentistry.
                    </p>
                  </div>
                </div>
              </div>

              {/* Real Metrics/Stats Banner */}
              <div className="pt-6 border-t border-slate-200/60 dark:border-gray-800 max-w-xl flex flex-wrap gap-8">
                <div>
                  <span className="block text-2xl font-extrabold text-slate-800 dark:text-gray-100">12k+</span>
                  <span className="text-slate-400 dark:text-gray-400 text-xs font-semibold">Patients Treated</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-slate-800 dark:text-gray-100">99.7%</span>
                  <span className="text-slate-400 dark:text-gray-400 text-xs font-semibold">Success Rate</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-slate-800 dark:text-gray-100">15+</span>
                  <span className="text-slate-400 dark:text-gray-400 text-xs font-semibold">Specialists Team</span>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Form Wrapper */}
            <div className="lg:col-span-5 w-full">
              <AppointmentForm />
            </div>

          </div>
        </div>
      </main>

      {/* Info Banner Details Footer */}
      <footer className="bg-slate-900 dark:bg-gray-950 text-slate-400 dark:text-gray-400 py-8 border-t border-slate-800 dark:border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Indiranagar, Bangalore, India</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+91 80 4912 3456</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-500 text-center sm:text-right">
              &copy; {new Date().getFullYear()} Lumora Dental Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
