import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";


interface User {

  id: number;

  name?: string;

  email: string;
}


interface AuthContextType {

  user: User | null;

  login: (
    user: User
  ) => void;

  logout: () => void;

  isAuthenticated: boolean;
}


const AuthContext =
  createContext<AuthContextType>(

    {} as AuthContextType
  );


export function AuthProvider({

  children,

}: {

  children: ReactNode;
}) {

  const [
    user,
    setUser,
  ] = useState<User | null>(
    null
  );


  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "hiresense_user"
      );


    if (storedUser) {

      setUser(
        JSON.parse(
          storedUser
        )
      );
    }

  }, []);


  function login(
    userData: User
  ) {

    localStorage.setItem(

      "hiresense_user",

      JSON.stringify(
        userData
      )
    );

    setUser(
      userData
    );
  }


  function logout() {

    localStorage.removeItem(
      "hiresense_user"
    );

    setUser(null);
  }


  return (

    <AuthContext.Provider
      value={{

        user,

        login,

        logout,

        isAuthenticated:
          !!user,
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