import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/auth/Login';
import { useEffect, useState } from 'react';
import Home from '../pages/home/Home';
import { useSession } from '../context/SessionProvider';
import 'react-native-gesture-handler';
import Avisos from '../pages/avisos/Avisos';
import Horarios from '../pages/horarios/Horarios';
import Inasistencias from '../pages/inasistencias/Inasistencias';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [sessionAuth, setSessionAuth] = useState(null);

  const session = useSession();
  // const verifyIfExistsSession = async () => {
  //   try {
  //     console.log(session);

  //     if (session !== null) {
  //       setSessionAuth(session);
  //     } else {
  //       setSessionAuth(null);
  //     }
  //   } catch (error) {
  //     setSessionAuth(null);
  //   }
  // };
  // useEffect(() => {
  //   verifyIfExistsSession();
  //   // useSession().then((data) => console.log(data));
  // }, []);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Avisos">
              {(props) => <Avisos {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Horarios">
              {(props) => <Horarios {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Inasistencias">
              {(props) => <Inasistencias {...props} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Login" options={{ title: '' }}>
            {(props) => <Login {...props} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
