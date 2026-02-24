import { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/users';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUsers = localStorage.getItem('allUsers');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedUsers) {
      setAllUsers(JSON.parse(storedUsers));
    } else {
      setAllUsers(users);
      localStorage.setItem('allUsers', JSON.stringify(users));
    }
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = allUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: 'Incorrect or invalid username or password' };
  };

  const register = (userData) => {
    const existingUser = allUsers.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser = {
      id: allUsers.length + 1,
      ...userData,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
      joinedDate: new Date().toISOString().split('T')[0],
      totalProducts: userData.role === 'farmer' ? 0 : undefined,
      totalSales: userData.role === 'farmer' ? 0 : undefined,
      totalOrders: userData.role === 'buyer' ? 0 : undefined
    };

    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
