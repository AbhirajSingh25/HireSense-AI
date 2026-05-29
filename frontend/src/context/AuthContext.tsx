import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


const AuthContext =
  createContext<any>(null);


export function AuthProvider({
  children,
}: any) {

  const [
    user,
    setUser,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);


  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );
    }

    setLoading(false);

  }, []);


  function login(
    userData: any,
    token: string
  ) {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      token
    );

    setUser(userData);
  }


  function logout() {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    setUser(null);

    window.location.href =
      "/login";
  }


  return (

    <AuthContext.Provider

      value={{

        user,
        login,
        logout,
        loading,
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