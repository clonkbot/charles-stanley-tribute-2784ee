import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { HandHeart, Send, Eye, EyeOff } from "lucide-react";

export function PrayerSection() {
  const prayers = useQuery(api.prayerRequests.list, {});
  const createPrayer = useMutation(api.prayerRequests.create);

  const [request, setRequest] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;

    setIsSubmitting(true);
    try {
      await createPrayer({
        request: request.trim(),
        isAnonymous,
      });
      setRequest("");
    } catch (error) {
      console.error("Failed to submit prayer:", error);
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-700/20 to-amber-900/20 border border-amber-700/30 mb-6">
            <HandHeart className="w-8 h-8 text-amber-500" strokeWidth={1} />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 mb-4">
            Prayer Requests
          </h1>
          <p className="text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
            In the spirit of Dr. Stanley's commitment to prayer, share your requests
            and lift up others in prayer. As he often said,
            <span className="italic text-amber-500/80"> "Prayer is simply talking to God like a friend and should be the easiest thing we do."</span>
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
            className="bg-gradient-to-br from-amber-900/10 to-stone-900/50 border border-amber-800/20 rounded-2xl p-5 sm:p-8"
          >
            <div className="mb-4">
              <label className="block text-stone-400 text-sm mb-2">Your Prayer Request</label>
              <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="Share your prayer request with the community..."
                rows={4}
                className="w-full px-4 py-3 bg-stone-800/50 border border-stone-700/50 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30 transition-all resize-none text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                  isAnonymous
                    ? "bg-amber-600/20 border border-amber-600/30 text-amber-500"
                    : "bg-stone-800/50 border border-stone-700/50 text-stone-400 hover:text-stone-200"
                }`}
              >
                {isAnonymous ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {isAnonymous ? "Sharing Anonymously" : "Share with name visible"}
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !request.trim()}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Dr. Stanley's teaching on prayer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 bg-stone-900/30 border border-stone-800/30 rounded-xl p-5 sm:p-6"
        >
          <h3 className="font-serif text-lg text-amber-500/80 mb-3">
            Dr. Stanley on Prayer
          </h3>
          <ul className="space-y-2 text-stone-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-amber-500/50 mt-1">•</span>
              "The value of prayer is not found in having a specific need met, but in the conversation with God."
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500/50 mt-1">•</span>
              "God shapes the world by prayer. The more praying there is in the world, the better the world will be."
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500/50 mt-1">•</span>
              "We must remember that the shortest distance between our problems and their solutions is the distance between our knees and the floor."
            </li>
          </ul>
        </motion.div>

        {/* Prayer requests list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-serif text-xl sm:text-2xl text-stone-300 mb-6 flex items-center gap-2">
            <HandHeart className="w-5 h-5 text-amber-500/50" />
            Community Prayers
          </h2>

          {prayers === undefined ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-amber-600/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
            </div>
          ) : prayers.length === 0 ? (
            <div className="text-center py-12 bg-stone-900/30 border border-stone-800/30 rounded-xl">
              <HandHeart className="w-10 h-10 text-stone-600 mx-auto mb-3" strokeWidth={1} />
              <p className="text-stone-500">Be the first to share a prayer request.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {prayers.map((prayer: { _id: string; request: string; isAnonymous: boolean; createdAt: number }, i: number) => (
                  <motion.div
                    key={prayer._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    layout
                    className="bg-gradient-to-br from-stone-900/50 to-stone-900/30 border border-stone-800/30 rounded-xl p-5 relative"
                  >
                    {/* Anonymous indicator */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {prayer.isAnonymous ? (
                          <EyeOff className="w-4 h-4 text-stone-500" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-amber-700/20 border border-amber-700/30 flex items-center justify-center">
                            <span className="text-amber-500 text-xs">?</span>
                          </div>
                        )}
                        <span className="text-stone-500 text-xs">
                          {prayer.isAnonymous ? "Anonymous" : "Community Member"}
                        </span>
                      </div>
                      <span className="text-stone-600 text-xs">
                        {new Date(prayer.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {prayer.request}
                    </p>

                    {/* Praying hands icon */}
                    <div className="absolute bottom-3 right-3 opacity-5">
                      <HandHeart className="w-8 h-8 text-amber-500" />
                    </div>
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
