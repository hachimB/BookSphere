// useAuthToken.js
import { useEffect, useState } from 'react';

const useAuthToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
    setToken('');
  };

  return { token, updateToken, removeToken };
};

export default useAuthToken;
