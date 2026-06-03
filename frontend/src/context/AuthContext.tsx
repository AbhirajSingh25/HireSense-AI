import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {

  id: number;

  email: string;

  username: string;
}

interface AuthContextType {

  user: User | null;

  token: string | null;

  login: (
    user: User,
    token: string
  ) => void;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );


export function AuthProvider({

  children,
}: any) {

  const [
    user,
    setUser,
  ] = useState<User | null>(
    null
  );

  const [
    token,
    setToken,
  ] = useState<string | null>(
    null
  );


  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "user"
      );

    const savedToken =
      localStorage.getItem(
        "token"
      );

    if (
      savedUser &&
      savedToken
    ) {

      setUser(
        JSON.parse(
          savedUser
        )
      );

      setToken(
        savedToken
      );
    }

  }, []);


  function login(
    user: User,
    token: string
  ) {

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "token",
      token
    );

    setUser(user);

    setToken(token);
  }


  function logout() {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    setUser(null);

    setToken(null);
  }


  return (

    <AuthContext.Provider
      value={{
        user,
        token,
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