"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

/**
 * Client-side hook to get current user session
 * Uses TanStack Query for caching and state management
 */
export function useAuth() {
  const { data: session, status, update } = useSession();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      if (!session?.user) return null;
      return session.user;
    },
    enabled: !!session?.user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user: user || session?.user || null,
    isLoading: isLoading || status === "loading",
    isAuthenticated: !!session?.user,
    status,
    update,
  };
}

/**
 * Hook to check if user has specific role
 */
export function useRole(role: string) {
  const { user, isLoading } = useAuth();

  return {
    hasRole: user?.role === role,
    isLoading,
    user,
  };
}

/**
 * Hook to check if user has any of the specified roles
 */
export function useRoles(roles: string[]) {
  const { user, isLoading } = useAuth();

  return {
    hasAnyRole: user?.role ? roles.includes(user.role) : false,
    isLoading,
    user,
  };
}

/**
 * Hook to check if user is admin
 */
export function useIsAdmin() {
  return useRole("admin");
}

/**
 * Hook to check if user is agent
 */
export function useIsAgent() {
  return useRole("agent");
}

