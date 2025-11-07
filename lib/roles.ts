/**
 * Role-Based Access Control (RBAC) System
 * Manages user roles and permissions
 */

export type UserRole = 'super_admin' | 'content_manager' | 'viewer'

export interface RolePermissions {
  canManageBooks: boolean
  canManageSubjects: boolean
  canManageUsers: boolean
  canViewAnalytics: boolean
  canAccessSettings: boolean
  canDeleteContent: boolean
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  super_admin: {
    canManageBooks: true,
    canManageSubjects: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canAccessSettings: true,
    canDeleteContent: true,
  },
  content_manager: {
    canManageBooks: true,
    canManageSubjects: true,
    canManageUsers: false,
    canViewAnalytics: true,
    canAccessSettings: false,
    canDeleteContent: false,
  },
  viewer: {
    canManageBooks: false,
    canManageSubjects: false,
    canManageUsers: false,
    canViewAnalytics: true,
    canAccessSettings: false,
    canDeleteContent: false,
  },
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('currentUser')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

/**
 * Set current user in localStorage
 */
export function setCurrentUser(user: User): void {
  localStorage.setItem('currentUser', JSON.stringify(user))
}

/**
 * Get user permissions
 */
export function getUserPermissions(role: UserRole): RolePermissions {
  return ROLE_PERMISSIONS[role]
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  role: UserRole,
  permission: keyof RolePermissions
): boolean {
  return ROLE_PERMISSIONS[role][permission]
}

/**
 * Get all available users (for demo purposes)
 */
export const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'admin@wnss.edu',
    name: 'Super Administrator',
    role: 'super_admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'content@wnss.edu',
    name: 'Content Manager',
    role: 'content_manager',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'viewer@wnss.edu',
    name: 'Viewer',
    role: 'viewer',
    createdAt: new Date().toISOString(),
  },
]
