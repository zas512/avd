import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";
import connectDB from "./mongodb";
import User from "@/models/User";

/**
 * Get current user session on the server side
 * Use this in Server Components and API routes
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

/**
 * Require authentication - redirects to login if not authenticated
 * Use this in Server Components
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * Require specific role - redirects to home if role doesn't match
 * Use this in Server Components
 */
export async function requireRole(role: string) {
  const user = await requireAuth();
  if (user.role !== role) {
    redirect("/home");
  }
  return user;
}

/**
 * Check if user has specific role
 * Use this in Server Components
 */
export async function hasRole(role: string): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === role;
}

/**
 * Get full user data from database
 * Use this when you need complete user information
 */
export async function getUserFromDB(userId: string) {
  await connectDB();
  const user = await User.findById(userId).select("-password");
  return user;
}

/**
 * Get current user with full database data
 */
export async function getCurrentUserWithData() {
  const user = await getCurrentUser();
  if (!user) return null;
  
  const fullUser = await getUserFromDB(user.id);
  return fullUser;
}

