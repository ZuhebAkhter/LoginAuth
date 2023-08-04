import React, { useState,useEffect } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken=localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {

    setToken(token);
    localStorage.setItem('token',token);
   
    
  };



  const logoutHandler = () => {
    localStorage.removeItem('token')
    setToken(null);
  };
  

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logoutHandler, 1 * 60 * 1000); // 5 minutes (5 * 60 seconds * 1000 milliseconds)
    };
    console.log(timeoutId)

    window.addEventListener('click', resetTimer);
    window.addEventListener('keydown', resetTimer);

  
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;