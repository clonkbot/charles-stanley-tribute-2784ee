import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const requests = await ctx.db
      .query("prayerRequests")
      .withIndex("by_created")
      .order("desc")
      .take(20);

    // Hide author info for anonymous requests
    return requests.map(req => ({
      ...req,
      userId: req.isAnonymous ? undefined : req.userId,
    }));
  },
});

export const create = mutation({
  args: {
    request: v.string(),
    isAnonymous: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("prayerRequests", {
      userId,
      request: args.request,
      isAnonymous: args.isAnonymous,
      createdAt: Date.now(),
    });
  },
});
