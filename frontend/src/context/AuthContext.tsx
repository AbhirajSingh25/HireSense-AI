import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {

  email?: string;
};

type AuthContextType = {

  user: User | null;

  token: string | null;

  isAuthenticated: boolean;

  login: (
    user: User,
    token: string
  ) => void;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export function AuthProvider({

  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const savedToken =
      localStorage.getItem("token");

    const savedUser =
      localStorage.getItem("user");

    if (savedToken) {

      setToken(savedToken);
    }

    if (savedUser) {

      setUser(
        JSON.parse(savedUser)
      );
    }

    setLoading(false);

  }, []);

  function login(
    userData: User,
    authToken: string
  ) {

    localStorage.setItem(
      "token",
      authToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

    setToken(authToken);
  }

  function logout() {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    setToken(null);
  }

  if (loading) {

    return null;
  }

  return (

    <AuthContext.Provider
      value={{

        user,

        token,

        isAuthenticated:
          !!token,

        login,

        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export function useAuth() {

  return useContext(
    AuthContext
  );
}