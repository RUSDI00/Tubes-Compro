import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          {/* Logo */}
          <div className="mb-8 md:mb-12">
            <img
              src="/assets/images/logo-aira-large.png"
              alt="AIRA - Recommendation Assistant"
              className="w-full max-w-md mx-auto"
            />
          </div>

          {/* Tagline */}
          <p className="text-aira-gray-dark text-xl md:text-2xl font-medium mb-4">
            Empowering Intelligence Through Innovation
          </p>

          {/* Carousel dots */}
          <div className="flex justify-center gap-3 mb-12">
            <div className="w-3 h-2 rounded-full bg-aira-gray-dark" />
            <div className="w-3 h-2 rounded-full bg-aira-gray-light" />
            <div className="w-3 h-2 rounded-full bg-aira-gray-light" />
          </div>

          {/* Start Button */}
          <Link
            to="/login"
            className="inline-block bg-aira-primary hover:bg-aira-secondary transition-colors text-white font-bold text-2xl px-24 py-6 rounded-[40px] shadow-lg"
          >
            start
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
