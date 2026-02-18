import { motion } from "framer-motion";
import { Home, BookOpen, Heart, HandHeart, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onSignOut: () => void;
}

export function Navigation({ activeSection, setActiveSection, onSignOut }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Memorial", icon: Home },
    { id: "works", label: "His Works", icon: BookOpen },
    { id: "tributes", label: "Tributes", icon: Heart },
    { id: "prayer", label: "Prayer", icon: HandHeart },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-700/30 to-amber-900/30 border border-amber-700/40 flex items-center justify-center">
              <span className="text-amber-500 font-serif text-sm">CS</span>
            </div>
            <span className="hidden sm:block font-serif text-stone-300 text-lg">
              Dr. Charles Stanley
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                  activeSection === id
                    ? "text-amber-500"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {activeSection === id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-amber-500/10 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" strokeWidth={1.5} />
                <span className="text-sm relative z-10">{label}</span>
              </button>
            ))}
          </div>

          {/* Sign Out & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSignOut}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-stone-400 hover:text-stone-200 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              Sign Out
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-400 hover:text-stone-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 border-t border-stone-800/50 mt-2 pt-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === id
                      ? "bg-amber-500/10 text-amber-500"
                      : "text-stone-400 hover:bg-stone-800/50"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span>{label}</span>
                </button>
              ))}
              <button
                onClick={onSignOut}
                className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:bg-stone-800/50 rounded-lg mt-2 border-t border-stone-800/50 pt-4"
              >
                <LogOut className="w-5 h-5" strokeWidth={1.5} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
