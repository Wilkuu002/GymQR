// types.ts

import { User, UserCredential } from "firebase/auth";

// Typ dla propsów AuthProvider
export interface AuthProviderProps {
  children: React.ReactNode;
}

// Typ dla danych przechowywanych w AuthContext
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}
