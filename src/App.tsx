import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthScreen } from "./components/AuthScreen";
import { HeroSection } from "./components/HeroSection";
import { WorksSection } from "./components/WorksSection";
import { TributeSection } from "./components/TributeSection";
import { PrayerSection } from "./components/PrayerSection";
import { Navigation } from "./components/Navigation";
import { useQuery, useAction } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const [activeSection, setActiveSection] = useState("home");

  // Fetch works on mount
  const works = useQuery(api.works.list, {});
  const fetchWorks = useAction(api.works.fetchFromFirecrawl);

  useEffect(() => {
    if (isAuthenticated && works !== undefined && works.length === 0) {
      fetchWorks({});
    }
  }, [isAuthenticated, works]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-2 border-amber-600/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-400 font-serif italic">Preparing the sanctuary...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />

      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onSignOut={signOut}
      />

      <main className="relative">
        <AnimatePresence mode="wait">
          {activeSection === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection />
            </motion.div>
          )}
          {activeSection === "works" && (
            <motion.div
              key="works"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WorksSection />
            </motion.div>
          )}
          {activeSection === "tributes" && (
            <motion.div
              key="tributes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TributeSection />
            </motion.div>
          )}
          {activeSection === "prayer" && (
            <motion.div
              key="prayer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PrayerSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-stone-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-stone-600 text-xs font-light tracking-wide">
            "Obey God and leave all the consequences to Him." — Dr. Charles Stanley
          </p>
          <p className="text-stone-700 text-[10px] mt-4 tracking-wider">
            Requested by @stringer_kade · Built by @clonkbot
          </p>
        </div>
      </footer>
    </div>
  );
}
