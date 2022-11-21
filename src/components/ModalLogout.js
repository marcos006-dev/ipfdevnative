import React from 'react';
import { Dialog } from '@rneui/themed';
import { useSetSession } from '../context/SessionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalLogout = ({ logout, setLogout }) => {
  const setSession = useSetSession();
  const logoutHandle = async () => {
    await AsyncStorage.removeItem('@token');
    setSession(null);
  };
  return (
    <Dialog isVisible={logout} onBackdropPress={setLogout}>
      <Dialog.Title title="¿Cerrar Sesión?" />
      {/* <Text>Dialog body text. Add relevant information here.</Text> */}
      <Dialog.Actions>
        <Dialog.Button title="Cancelar" onPress={setLogout} />
        <Dialog.Button title="Continuar" onPress={logoutHandle} />
      </Dialog.Actions>
    </Dialog>
  );
};

export default ModalLogout;
