import { db } from "../lib/db";

export async function loader() {
  try {
    let users: any;
    let totalCount: any;
    
    users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    totalCount = users.length;

    return Response.json({
      success: true,
      users: users,
      totalCount: totalCount,
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