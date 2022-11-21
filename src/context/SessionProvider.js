import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const getToken = async () => {
    const resultToken = await AsyncStorage.getItem('@token');
    console.log(resultToken);
    if (resultToken) {
      setSession(resultToken);
    } else {
      setSession(null);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const setNewSession = async (token) => {
    console.log(token);
    setSession(token);
    await AsyncStorage.setItem('@token', token);
  };

  return (
    <SessionContext.Provider value={[session, setNewSession]}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext)[0];
const useSetSession = () => useContext(SessionContext)[1];

export { useSession, useSetSession };
export default SessionProvider;
