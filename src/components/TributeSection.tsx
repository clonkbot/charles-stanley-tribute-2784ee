import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Trash2, Quote } from "lucide-react";
import { useConvexAuth } from "convex/react";

export function TributeSection() {
  const { isAuthenticated } = useConvexAuth();
  const tributes = useQuery(api.tributes.list, {});
  const createTribute = useMutation(api.tributes.create);
  const removeTribute = useMutation(api.tributes.remove);

  const [message, setMessage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !authorName.trim()) return;

    setIsSubmitting(true);
    try {
      await createTribute({
        message: message.trim(),
        authorName: authorName.trim(),
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to submit tribute:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Heart className="w-12 h-12 text-amber-500/50 mx-auto mb-4" strokeWidth={1} />
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 mb-4">
            Share Your Tribute
          </h1>
          <p className="text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
            Honor Dr. Stanley's memory by sharing how his ministry touched your life.
            Your words join a chorus of gratitude for his faithful service.
          </p>
        </motion.div>

        {/* Submit form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-stone-900/80 to-stone-900/50 border border-stone-800/50 rounded-2xl p-5 sm:p-8"
          >
            <div className="mb-4">
              <label className="block text-stone-400 text-sm mb-2">Your Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="How would you like to be known?"
                className="w-full px-4 py-3 bg-stone-800/50 border border-stone-700/50 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30 transition-all text-sm sm:text-base"
              />
            </div>

            <div className="mb-4">
              <label className="block text-stone-400 text-sm mb-2">Your Tribute</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share how Dr. Stanley's ministry impacted your life..."
                rows={4}
                className="w-full px-4 py-3 bg-stone-800/50 border border-stone-700/50 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30 transition-all resize-none text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !message.trim() || !authorName.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin" />
                  Sharing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Share Tribute
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Tributes list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-serif text-xl sm:text-2xl text-stone-300 mb-6 flex items-center gap-2">
            <Quote className="w-5 h-5 text-amber-500/50" />
            Recent Tributes
          </h2>

          {tributes === undefined ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-amber-600/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
            </div>
          ) : tributes.length === 0 ? (
            <div className="text-center py-12 bg-stone-900/30 border border-stone-800/30 rounded-xl">
              <Heart className="w-10 h-10 text-stone-600 mx-auto mb-3" strokeWidth={1} />
              <p className="text-stone-500">Be the first to share a tribute.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {tributes.map((tribute: { _id: string; authorName: string; message: string; createdAt: number }, i: number) => (
                  <motion.div
                    key={tribute._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.05 }}
                    layout
                    className="bg-stone-900/30 border border-stone-800/30 rounded-xl p-5 sm:p-6 relative group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-700/30 to-amber-900/30 border border-amber-700/30 flex items-center justify-center">
                        <span className="text-amber-500 font-serif text-sm">
                          {tribute.authorName.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-stone-200 text-sm sm:text-base">
                            {tribute.authorName}
                          </span>
                          <span className="text-stone-600 text-xs">
                            {new Date(tribute.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-stone-400 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                          {tribute.message}
                        </p>
                      </div>
                    </div>

                    {/* Subtle decorative quote */}
                    <Quote className="absolute top-4 right-4 w-6 h-6 text-amber-500/5" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
