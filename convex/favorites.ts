import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const favorites = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Get the actual works
    const works = await Promise.all(
      favorites.map(async (fav) => {
        const work = await ctx.db.get(fav.workId);
        return work ? { ...work, favoriteId: fav._id } : null;
      })
    );

    return works.filter(Boolean);
  },
});

export const toggle = mutation({
  args: { workId: v.id("works") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if already favorited
    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("workId"), args.workId))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { added: false };
    } else {
      await ctx.db.insert("favorites", {
        userId,
        workId: args.workId,
        createdAt: Date.now(),
      });
      return { added: true };
    }
  },
});

export const isFavorited = query({
  args: { workId: v.id("works") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("workId"), args.workId))
      .first();

    return !!existing;
  },
});
