import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const Context = React.createContext();

export function useAuth() {
  return useContext(Context);
}

export function Provider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/user");
        console.log("from conext on page load = ", res.data);
        setCurrentUser(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  const setUserContext = async () => {
    try {
      const res = await axios.get("/api/user");
      setCurrentUser(res.data);
      console.log("setUserContext()");
    } catch (error) {
      console.log(error);
    }
  };

  // sign in a user and get the accessToken, then decode the accesToken and set the current user
  const signIn = async (email, password) => {
    const res = await axios.post("/api/sign-in", {
      email,
      password,
    });
    await setUserContext();
    return res;
  };

  const signOut = async () => {
    setCurrentUser(null);
    try {
      return await axios.post("/api/sign-out");
    } catch (error) {
      console.log(error);
    }
  };

  console.log("we have a current user! ", currentUser);
  if (currentUser) console.log("currentUser.accessToken", currentUser.accessToken);

  const value = {
    currentUser,
    signIn,
    signOut,
    isLoading,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
