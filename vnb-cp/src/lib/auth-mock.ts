export type UserRole = "admin" | "cp";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  partnerId?: string; // Only for CP
}

export const MOCK_USERS: User[] = [
  {
    id: "admin-1",
    name: "System Admin",
    email: "admin@vnb.com",
    role: "admin",
  },
  {
    id: "cp-1",
    name: "John Partner",
    email: "john@partner.com",
    role: "cp",
    partnerId: "p-001",
  },
  {
    id: "cp-2",
    name: "Sarah Sales",
    email: "sarah@partner.com",
    role: "cp",
    partnerId: "p-002",
  },
];

export function getSession() {
  // In a real app, this would check cookies/tokens
  // For demo, we'll use localStorage or a simple simulation
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem("vnb-session");
  return session ? (JSON.parse(session) as User) : null;
}

export function login(email: string, password?: string, role?: UserRole) {
  // In a real app, password would be checked on server
  // For this mock, we check if user exists and if password matches (default is "password")
  
  if (typeof window === "undefined") return null;

  const customPasswords = JSON.parse(localStorage.getItem("vnb-passwords") || "{}");
  const expectedPassword = customPasswords[email] || "password";

  if (password && password !== expectedPassword) {
    return null;
  }

  // Check static users first
  let user = MOCK_USERS.find((u) => u.email === email && (role ? u.role === role : true));
  
  // If not found, check dynamic users created during onboarding
  if (!user) {
    const dynamicUsers = JSON.parse(localStorage.getItem("vnb-dynamic-users") || "[]");
    user = dynamicUsers.find((u: User) => u.email === email && (role ? u.role === role : true));
  }

  if (user) {
    localStorage.setItem("vnb-session", JSON.stringify(user));
    return user;
  }
  return null;
}

export function logout() {
  localStorage.removeItem("vnb-session");
}

export function updatePassword(email: string, newPassword: string) {
  if (typeof window === "undefined") return;
  const passwords = JSON.parse(localStorage.getItem("vnb-passwords") || "{}");
  passwords[email] = newPassword;
  localStorage.setItem("vnb-passwords", JSON.stringify(passwords));
}
