import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';  
import { ADMIN_STATE } from '../utils';


interface UserContextProviderProps {
  children: ReactNode;
}

export interface UserContexType {
  isLogin?: boolean, 
  Login: (userName:string, password:string) => void,
  LogOut: () => void, 
}


export const INTIAL_STATE:UserContexType = {
  isLogin: true,  
  Login: (userName:string, password:string) => Boolean,
  LogOut: () => {},
  
}
  

export const UserContext = createContext(INTIAL_STATE);

export function useUserContext() {
  return useContext(UserContext);
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => { 
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const Login = (userName: string, password: string) => {
    if (userName === ADMIN_STATE.userName && password === ADMIN_STATE.password) {
      setIsLogin(true);
      localStorage.setItem('isLogin', JSON.stringify(true));
      console.log("login")
      return true;
    }else{
      return false;
    }
  };

  const LogOut = () => {
    setIsLogin(false);
    localStorage.setItem('isLogin', JSON.stringify(false));
    console.log("logout")
  };

  

  useEffect(() => {
    //  verificar si esta localStorage 
    setIsLogin(JSON.parse(localStorage.getItem('isLogin') || 'false')); 
  }, []);

  const values:UserContexType = {
    isLogin, 
    Login,
    LogOut , 
  };

  return (
      <UserContext.Provider value={values}>
        {children}
      </UserContext.Provider>
    );
};

 