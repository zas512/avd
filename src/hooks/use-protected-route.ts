"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";

/**
 * Hook to protect routes - redirects to login if not authenticated
 */
export function useProtectedRoute() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}

/**
 * Hook to protect routes by role - redirects if user doesn't have required role
 */
export function useProtectedRouteByRole(requiredRole: string) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role !== requiredRole) {
        router.push("/home");
      }
    }
  }, [isLoading, isAuthenticated, user?.role, requiredRole, router]);

  return {
    user,
    isLoading,
    isAuthenticated,
    hasRole: user?.role === requiredRole,
  };
}

/**
 * Hook to protect routes by multiple roles
 */
export function useProtectedRouteByRoles(requiredRoles: string[]) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role && !requiredRoles.includes(user.role)) {
        router.push("/home");
      }
    }
  }, [isLoading, isAuthenticated, user?.role, requiredRoles, router]);

  return {
    user,
    isLoading,
    isAuthenticated,
    hasAnyRole: user?.role ? requiredRoles.includes(user.role) : false,
  };
}

