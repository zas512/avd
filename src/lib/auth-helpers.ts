// Re-export from auth-server for backward compatibility
export {
  getCurrentUser,
  requireAuth,
  requireRole,
  hasRole,
  getUserFromDB,
  getCurrentUserWithData,
} from "./auth-server";

