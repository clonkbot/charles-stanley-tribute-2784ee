import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Mic, Church, GraduationCap, Heart, ExternalLink, RefreshCw } from "lucide-react";
import { useAction } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";

const categoryIcons: Record<string, typeof BookOpen> = {
  book: BookOpen,
  sermon: Mic,
  ministry: Church,
  teaching: GraduationCap,
};

const categoryColors: Record<string, string> = {
  book: "from-blue-600/20 to-blue-800/20 border-blue-600/30",
  sermon: "from-purple-600/20 to-purple-800/20 border-purple-600/30",
  ministry: "from-amber-600/20 to-amber-800/20 border-amber-600/30",
  teaching: "from-emerald-600/20 to-emerald-800/20 border-emerald-600/30",
};

export function WorksSection() {
  const works = useQuery(api.works.list, {});
  const categories = useQuery(api.works.getCategories, {});
  const fetchWorks = useAction(api.works.fetchFromFirecrawl);
  const toggleFavorite = useMutation(api.favorites.toggle);
  const favorites = useQuery(api.favorites.list, {});

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredWorks = activeCategory
    ? works?.filter((w: { category: string }) => w.category === activeCategory)
    : works;

  const favoriteIds = new Set(favorites?.map((f: { _id: Id<"works"> }) => f._id) || []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchWorks({});
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleToggleFavorite = async (workId: Id<"works">) => {
    await toggleFavorite({ workId });
  };

  if (works === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-amber-600/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 mb-4">
            His Life's Work
          </h1>
          <p className="text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
            Explore the books, sermons, and teachings that Dr. Charles Stanley shared with the world
            over his decades of faithful ministry.
          </p>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-stone-800/50 hover:bg-stone-800 border border-stone-700/50 rounded-lg text-stone-300 text-sm transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Works"}
          </button>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeCategory === null
                ? "bg-amber-600/20 border border-amber-600/50 text-amber-500"
                : "bg-stone-800/50 border border-stone-700/50 text-stone-400 hover:text-stone-200"
            }`}
          >
            All Works
          </button>
          {categories?.map((cat: string) => {
            const Icon = categoryIcons[cat] || BookOpen;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-2 ${
                  activeCategory === cat
                    ? "bg-amber-600/20 border border-amber-600/50 text-amber-500"
                    : "bg-stone-800/50 border border-stone-700/50 text-stone-400 hover:text-stone-200"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="capitalize">{cat}s</span>
              </button>
            );
          })}
        </motion.div>

        {/* Works grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredWorks?.map((work: { _id: Id<"works">; title: string; description: string; source: string; category: string; url?: string }, i: number) => {
              const Icon = categoryIcons[work.category] || BookOpen;
              const colorClass = categoryColors[work.category] || categoryColors.teaching;
              const isFav = favoriteIds.has(work._id);

              return (
                <motion.div
                  key={work._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  layout
                  className={`bg-gradient-to-br ${colorClass} backdrop-blur-sm border rounded-2xl p-5 sm:p-6 relative group`}
                >
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-stone-900/50 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-stone-300" strokeWidth={1.5} />
                      </div>
                      <span className="text-stone-400 text-xs uppercase tracking-wider">
                        {work.category}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleFavorite(work._id)}
                      className={`p-2 rounded-full transition-all ${
                        isFav
                          ? "bg-red-500/20 text-red-400"
                          : "bg-stone-900/50 text-stone-500 hover:text-red-400"
                      }`}
                    >
                      <Heart
                        className="w-4 h-4"
                        fill={isFav ? "currentColor" : "none"}
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-lg sm:text-xl text-stone-100 mb-2 line-clamp-2">
                    {work.title}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {work.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-700/30">
                    <span className="text-stone-500 text-xs">{work.source}</span>
                    {work.url && (
                      <a
                        href={work.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-500 hover:text-amber-400 text-xs flex items-center gap-1 transition-colors"
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredWorks?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BookOpen className="w-12 h-12 text-stone-600 mx-auto mb-4" strokeWidth={1} />
            <p className="text-stone-500">No works found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
