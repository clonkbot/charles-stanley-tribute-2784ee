import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const list = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("works")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    }
    return await ctx.db.query("works").collect();
  },
});

export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const works = await ctx.db.query("works").collect();
    const categories = [...new Set(works.map(w => w.category))];
    return categories;
  },
});

export const addWork = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    source: v.string(),
    category: v.string(),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("works", {
      ...args,
      fetchedAt: Date.now(),
    });
  },
});

export const seedInitialWorks = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if works already exist
    const existing = await ctx.db.query("works").first();
    if (existing) return;

    // Seed with known works about Charles Stanley
    const works = [
      {
        title: "In Touch Ministries",
        description: "Founded by Dr. Charles Stanley in 1972, In Touch Ministries has shared the Gospel with millions worldwide through television, radio, and digital media. The ministry continues his vision of leading people into a growing relationship with Jesus Christ.",
        source: "intouch.org",
        category: "ministry",
        url: "https://www.intouch.org",
      },
      {
        title: "First Baptist Church Atlanta",
        description: "Dr. Stanley served as Senior Pastor of First Baptist Church Atlanta for over 50 years, from 1971 until 2020 when he became Pastor Emeritus. Under his leadership, the church grew to over 15,000 members.",
        source: "fba.org",
        category: "ministry",
        url: "https://www.fba.org",
      },
      {
        title: "How to Listen to God",
        description: "One of Dr. Stanley's most beloved books, teaching believers how to discern God's voice and direction in their lives through Scripture, prayer, and the Holy Spirit's guidance.",
        source: "Published 1985",
        category: "book",
      },
      {
        title: "The Charles F. Stanley Life Principles Bible",
        description: "A study Bible featuring 30 Life Principles that Dr. Stanley gleaned from Scripture over his decades of ministry, helping readers apply biblical truth to everyday life.",
        source: "Thomas Nelson",
        category: "book",
      },
      {
        title: "Obedience: The Key to God's Blessing",
        description: "A powerful sermon series exploring how obedience to God opens the door to His blessings and protection in our lives.",
        source: "In Touch Ministries",
        category: "sermon",
      },
      {
        title: "The 30 Life Principles",
        description: "Dr. Stanley's foundational teachings distilled into 30 guiding principles for Christian living, covering topics from handling adversity to understanding God's will.",
        source: "In Touch Ministries",
        category: "teaching",
      },
      {
        title: "When the Enemy Strikes",
        description: "Biblical strategies for spiritual warfare and standing firm against Satan's attacks on believers.",
        source: "Published 2004",
        category: "book",
      },
      {
        title: "The Blessings of Brokenness",
        description: "Dr. Stanley's honest exploration of how God uses difficult seasons to shape and strengthen our faith.",
        source: "Published 1997",
        category: "book",
      },
      {
        title: "Finding Peace",
        description: "Discovering God's peace that surpasses all understanding, even in life's most turbulent circumstances.",
        source: "Published 2003",
        category: "book",
      },
      {
        title: "Living the Extraordinary Life",
        description: "Nine principles to living full, joyful, and effective lives for God's kingdom based on Dr. Stanley's decades of study and ministry.",
        source: "Published 2005",
        category: "book",
      },
      {
        title: "Grace: An Invitation to a Way of Life",
        description: "A beautiful exploration of God's unmerited favor and how understanding grace transforms our relationship with Him.",
        source: "In Touch Ministries",
        category: "teaching",
      },
      {
        title: "Two-Time Southern Baptist Convention President",
        description: "Dr. Stanley served as President of the Southern Baptist Convention from 1984-1986, helping guide the largest Protestant denomination in America during a pivotal era.",
        source: "SBC Historical Archives",
        category: "ministry",
      },
    ];

    for (const work of works) {
      await ctx.db.insert("works", {
        ...work,
        fetchedAt: Date.now(),
      });
    }
  },
});

// Action to fetch works from Firecrawl API
export const fetchFromFirecrawl = action({
  args: {},
  handler: async (ctx) => {
    const apiKey = process.env.FIRECRAWL_API_KEY;

    if (!apiKey) {
      // If no API key, seed with initial works
      await ctx.runMutation(api.works.seedInitialWorks, {});
      return { success: true, message: "Seeded with initial works (no Firecrawl API key)" };
    }

    try {
      // Search for Charles Stanley's works
      const response = await fetch("https://api.firecrawl.dev/v0/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          query: "Charles Stanley Christian preacher sermons books ministry In Touch",
          limit: 10,
        }),
      });

      if (!response.ok) {
        // Fallback to seed data
        await ctx.runMutation(api.works.seedInitialWorks, {});
        return { success: true, message: "Seeded with initial works (Firecrawl API error)" };
      }

      const data = await response.json();

      // Process and store results
      if (data.results && data.results.length > 0) {
        for (const result of data.results) {
          await ctx.runMutation(api.works.addWork, {
            title: result.title || "Untitled",
            description: result.description || result.snippet || "",
            source: result.source || "Firecrawl",
            category: categorizeWork(result.title || ""),
            url: result.url,
          });
        }
      }

      // Also seed our curated works
      await ctx.runMutation(api.works.seedInitialWorks, {});

      return { success: true, message: "Works fetched successfully" };
    } catch (error) {
      // Fallback to seed data on any error
      await ctx.runMutation(api.works.seedInitialWorks, {});
      return { success: true, message: "Seeded with initial works (fetch error)" };
    }
  },
});

function categorizeWork(title: string): string {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("sermon") || lowerTitle.includes("preach")) return "sermon";
  if (lowerTitle.includes("book") || lowerTitle.includes("published")) return "book";
  if (lowerTitle.includes("church") || lowerTitle.includes("ministry") || lowerTitle.includes("baptist")) return "ministry";
  return "teaching";
}
