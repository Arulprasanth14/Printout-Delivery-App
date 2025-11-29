// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the context type
type UserContextType = {
  userId: string | null;
  setUserId: (id: string | null) => void;
};

// 2. Create the actual context
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Create the provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// 4. Create a custom hook for easy usage
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside a UserProvider');
  }
  return context;
};
