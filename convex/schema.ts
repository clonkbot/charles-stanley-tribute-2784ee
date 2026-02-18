import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  // Tributes and testimonies from users
  tributes: defineTable({
    userId: v.id("users"),
    authorName: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }).index("by_created", ["createdAt"]),

  // Cached works and teachings from Firecrawl
  works: defineTable({
    title: v.string(),
    description: v.string(),
    source: v.string(),
    category: v.string(), // "sermon", "book", "teaching", "ministry"
    url: v.optional(v.string()),
    fetchedAt: v.number(),
  }).index("by_category", ["category"]),

  // User favorites
  favorites: defineTable({
    userId: v.id("users"),
    workId: v.id("works"),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  // Prayer requests in memory of Dr. Stanley's ministry
  prayerRequests: defineTable({
    userId: v.id("users"),
    request: v.string(),
    isAnonymous: v.boolean(),
    createdAt: v.number(),
  }).index("by_created", ["createdAt"]),
});
