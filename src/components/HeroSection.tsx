import { motion } from "framer-motion";
import { Cross, Quote, ChevronDown } from "lucide-react";

export function HeroSection() {
  const quotes = [
    "Obey God and leave all the consequences to Him.",
    "God's Word is the source of all truth.",
    "The greatest gift you can give someone is your time.",
    "Too many Christians have a commitment of convenience.",
    "Our intimacy with God determines the impact of our lives.",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/50 to-stone-950" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-amber-800/5 rounded-full blur-3xl" />

        {/* Floating crosses */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.05, y: 0 }}
            transition={{ delay: 1 + i * 0.2, duration: 1 }}
            className="absolute"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <Cross
              className="text-amber-500"
              style={{
                width: 30 + i * 10,
                height: 30 + i * 10,
                transform: `rotate(${-10 + i * 5}deg)`,
              }}
              strokeWidth={1}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12 sm:pt-20 pb-20">
        {/* Main memorial content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Portrait frame */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-amber-700/30 to-amber-900/20 border-2 border-amber-600/30 flex items-center justify-center">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
                  <span className="font-serif text-4xl sm:text-5xl text-amber-500/80">CS</span>
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border border-amber-500/10 animate-pulse" style={{ transform: "scale(1.1)" }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-100 mb-3">
              Dr. Charles F. Stanley
            </h1>
            <p className="text-amber-500/80 text-lg sm:text-xl mb-2">
              September 25, 1932 – April 18, 2023
            </p>
            <p className="text-stone-400 text-base sm:text-lg max-w-2xl mx-auto">
              Pastor, Teacher, Author & Founder of In Touch Ministries
            </p>
          </motion.div>
        </motion.div>

        {/* Featured Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-stone-900/80 to-stone-900/50 backdrop-blur-sm border border-stone-800/50 rounded-2xl p-6 sm:p-10">
            <Quote className="absolute top-4 left-4 w-8 h-8 text-amber-600/20" />
            <Quote className="absolute bottom-4 right-4 w-8 h-8 text-amber-600/20 rotate-180" />

            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-stone-200 text-center leading-relaxed italic">
              "Obey God and leave all the consequences to Him."
            </p>
            <p className="text-amber-500/70 text-center mt-4">— Dr. Charles Stanley</p>
          </div>
        </motion.div>

        {/* Life highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { number: "50+", label: "Years of Ministry" },
            { number: "15,000+", label: "Church Members" },
            { number: "100+", label: "Countries Reached" },
            { number: "30", label: "Life Principles" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="bg-stone-900/30 border border-stone-800/50 rounded-xl p-6 text-center"
            >
              <p className="font-serif text-3xl sm:text-4xl text-amber-500">{stat.number}</p>
              <p className="text-stone-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Biography */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-200 text-center mb-6">
            A Life Devoted to Christ
          </h2>
          <div className="space-y-4 text-stone-400 leading-relaxed text-sm sm:text-base">
            <p>
              Dr. Charles Frazier Stanley was born on September 25, 1932, in Dry Fork, Virginia.
              He dedicated his life to sharing the Gospel of Jesus Christ, touching millions of lives
              across the globe through his powerful preaching and teaching ministry.
            </p>
            <p>
              As the Senior Pastor of First Baptist Church Atlanta for over 50 years, Dr. Stanley
              led one of the most influential congregations in America. He founded In Touch Ministries
              in 1972, which now reaches people in every country through television, radio, and
              digital platforms.
            </p>
            <p>
              A two-time President of the Southern Baptist Convention, Dr. Stanley authored more
              than 60 books and developed his renowned 30 Life Principles that continue to guide
              believers in their walk with Christ. His legacy of faithfulness, obedience, and
              passionate service to God endures through the countless lives he touched.
            </p>
          </div>
        </motion.div>

        {/* More quotes carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16"
        >
          <h3 className="text-center text-stone-500 text-sm tracking-widest uppercase mb-6">
            Words of Wisdom
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quotes.slice(1).map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + i * 0.1 }}
                className="bg-stone-900/20 border border-stone-800/30 rounded-xl p-5"
              >
                <p className="font-serif text-stone-300 italic text-sm sm:text-base">"{quote}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16 text-center"
        >
          <p className="text-stone-600 text-sm mb-2">Explore his works and leave your tribute</p>
          <ChevronDown className="w-6 h-6 text-stone-600 mx-auto animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
}
