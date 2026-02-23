import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const payloadSegment = token.split('.')[1];
    if (!payloadSegment) {
      return null;
    }

    const base64 = payloadSegment.replace(/-/g, '+').replace(/_/g, '/');
    const paddedBase64 = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const decoded = window.atob(paddedBase64);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
};

const extractRoles = (payload: Record<string, unknown> | null): string[] => {
  if (!payload) {
    return [];
  }

  const roleCandidate = payload.role;
  if (typeof roleCandidate === 'string') {
    return [roleCandidate];
  }

  const rolesCandidate = payload.roles;
  if (Array.isArray(rolesCandidate)) {
    return rolesCandidate.filter((role): role is string => typeof role === 'string');
  }

  const authoritiesCandidate = payload.authorities;
  if (Array.isArray(authoritiesCandidate)) {
    return authoritiesCandidate
      .map((authority) => {
        if (typeof authority === 'string') {
          return authority;
        }

        if (
          authority &&
          typeof authority === 'object' &&
          'authority' in authority &&
          typeof (authority as { authority?: unknown }).authority === 'string'
        ) {
          return (authority as { authority: string }).authority;
        }

        return null;
      })
      .filter((role): role is string => typeof role === 'string');
  }

  return [];
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!token;
  const isAdmin = extractRoles(decodeJwtPayload(token ?? ''))
    .some((role) => role.toUpperCase() === 'ADMIN' || role.toUpperCase() === 'ROLE_ADMIN');

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
