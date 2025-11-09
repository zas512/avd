import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, requireAuth } from "@/lib/auth-server";
import { getUserFromDB } from "@/lib/auth-server";

/**
 * GET /api/user/profile
 * Get current user profile
 * Requires authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Option 1: Use requireAuth if you want to return 401 if not authenticated
    const user = await requireAuth();

    // Option 2: Use getCurrentUser if you want to handle unauthenticated users differently
    // const user = await getCurrentUser();
    // if (!user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Get full user data from database
    const fullUser = await getUserFromDB(user.id);

    if (!fullUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: fullUser._id.toString(),
        name: fullUser.name,
        email: fullUser.email,
        role: fullUser.role,
        number: fullUser.number,
        extensionId: fullUser.extensionId,
        host: fullUser.host,
        port: fullUser.port,
        createdAt: fullUser.createdAt,
      },
    });
  } catch (error: unknown) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

