import { createContext, useContext, useState } from "react";

export const TokenContext = createContext("") as any;

/* 
    This tsx file checks if there is token stored within LocalStorage
    It is later called and used for Auth
 */
interface ITokenProvider {
  token: string;
  setToken: (token: string) => {};
}

export const TokenProvider = ({ children }: any) => {
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export function useToken(): ITokenProvider {
  return useContext(TokenContext)
} 