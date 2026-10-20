export type User = {
  id: string;
  name: string;
  email: string;
  role: "Senior Engineer" | "Workshop Lead" | "Student";
  company: "Parser Digital";
};

let currentUserSession: User | null = {
  id: "usr-101",
  name: "Senior Engineer",
  email: "developer@parserdigital.com",
  role: "Senior Engineer",
  company: "Parser Digital",
};

export function getCurrentUser(): User | null {
  return currentUserSession;
}

export function loginUser(user: User): void {
  currentUserSession = user;
}

export function logoutUser(): void {
  currentUserSession = null;
}
