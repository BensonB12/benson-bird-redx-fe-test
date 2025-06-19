import type { User } from "~/models/user";
import { db } from "../lib/db";
import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, User[]>({
  max: 100,
  ttl: 1000 * 60 * 5, // 5 minutes
});

// We could have an endpoint to clear the cache if we put the info in the headers

export async function loader() {
  const cacheKey = "allUsers";

  if (cache.has(cacheKey)) {
    // There is reason to user headers to inform the client it was cached,
    // but I think this is good enough for now
    console.log("Cache hit for all users");
    return new Response(
      JSON.stringify({
        success: true,
        users: cache.get(cacheKey),
        cached: true,
        message: "Returned from cache",
      })
    );
  }

  try {
    const users: User[] = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    cache.set(cacheKey, users);

    return Response.json({
      success: true,
      users: users,
      message: "All users returned",
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
