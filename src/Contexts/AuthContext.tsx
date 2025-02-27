import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    username: string;
    role: 'user' | 'admin' | 'super-admin';
  }

interface AuthContextType {
//   user: { role: string } | null;
//   login: (userData: { role: string }) => void;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>({
        username: 'testUser',
        role: 'super-admin', // Change this value to 'user', 'admin', or 'super-admin' as needed
      });

//   const [user, setUser] = useState<{ role: string } | null>(null);

  //const login = (userData: { role: string }) => setUser(userData);
  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
