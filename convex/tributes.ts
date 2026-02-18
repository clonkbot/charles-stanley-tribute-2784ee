import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("tributes")
      .withIndex("by_created")
      .order("desc")
      .take(50);
  },
});

export const create = mutation({
  args: {
    message: v.string(),
    authorName: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("tributes", {
      userId,
      authorName: args.authorName,
      message: args.message,
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("tributes") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const tribute = await ctx.db.get(args.id);
    if (!tribute || tribute.userId !== userId) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.id);
  },
});
