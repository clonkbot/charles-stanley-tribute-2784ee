import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { motion } from "framer-motion";
import { Cross, BookOpen, Heart } from "lucide-react";

export function AuthScreen() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    try {
      await signIn("password", formData);
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnonymous = async () => {
    setIsSubmitting(true);
    try {
      await signIn("anonymous");
    } catch {
      setError("Could not continue as guest.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-800/5 rounded-full blur-3xl" />
      </div>

      {/* Subtle cross pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        {[...Array(20)].map((_, i) => (
          <Cross
            key={i}
            className="absolute text-amber-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
              width: 40 + Math.random() * 40,
              height: 40 + Math.random() * 40,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-700/20 to-amber-900/20 border border-amber-700/30 mb-6"
          >
            <Cross className="w-10 h-10 text-amber-500" strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-3xl sm:text-4xl text-stone-100 mb-2"
          >
            In Loving Memory
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-serif text-xl sm:text-2xl text-amber-500/90 italic"
          >
            Dr. Charles Stanley
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-stone-500 text-sm mt-2"
          >
            1932 – 2023
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-stone-900/50 backdrop-blur-sm border border-stone-800/50 rounded-2xl p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-stone-400 text-sm mb-2 tracking-wide">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-stone-800/50 border border-stone-700/50 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-stone-400 text-sm mb-2 tracking-wide">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-stone-800/50 border border-stone-700/50 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30 transition-all"
                placeholder="••••••••"
              />
            </div>

            <input name="flow" type="hidden" value={flow} />

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin" />
                  Please wait...
                </span>
              ) : flow === "signIn" ? (
                "Enter the Sanctuary"
              ) : (
                "Join the Fellowship"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
              className="text-stone-400 hover:text-amber-500 text-sm transition-colors"
            >
              {flow === "signIn"
                ? "New here? Create an account"
                : "Already have an account? Sign in"}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-700/50" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-stone-900/50 text-stone-500 text-sm">
                or
              </span>
            </div>
          </div>

          <button
            onClick={handleAnonymous}
            disabled={isSubmitting}
            className="w-full py-3 bg-stone-800/50 hover:bg-stone-800 border border-stone-700/50 text-stone-300 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            Continue as Guest
          </button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          {[
            { icon: BookOpen, label: "His Works" },
            { icon: Heart, label: "Tributes" },
            { icon: Cross, label: "Prayer" },
          ].map(({ icon: Icon, label }, i) => (
            <div key={label} className="text-stone-500">
              <Icon className="w-5 h-5 mx-auto mb-1 text-amber-600/50" strokeWidth={1.5} />
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 text-stone-700 text-[10px] tracking-wider"
      >
        Requested by @stringer_kade · Built by @clonkbot
      </motion.p>
    </div>
  );
}
