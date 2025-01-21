export interface User {
  email: string;
  role: 'admin' | 'user';
  token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, role: 'admin' | 'user', token: string) => void;
  logout: () => void;
} 