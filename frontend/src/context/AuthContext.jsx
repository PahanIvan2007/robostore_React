import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const initialUser = {
  id: null,
  email: '',
  name: '',
  phone: '',
  role: 'guest',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('robostore_user');
    const token = localStorage.getItem('robostore_token');
    
    if (saved && token) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load user:', e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('robostore_user', JSON.stringify(user));
    }
  }, [user, loading]);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('robostore_token', data.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('robostore_token', data.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(initialUser);
    localStorage.removeItem('robostore_token');
    localStorage.removeItem('robostore_user');
  };

  const updateProfile = async (userData) => {
    try {
      const token = localStorage.getItem('robostore_token');
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Update failed');
      }
      
      const data = await response.json();
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const isAuthenticated = user.id !== null;
  const isAdmin = user.role === 'admin' || user.role === 'manager' || user.role === 'sysadmin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context || { user: initialUser, loading: false, isAuthenticated: false, isAdmin: false, login: () => {}, register: () => {}, logout: () => {}, updateProfile: () => {} };
}
