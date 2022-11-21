import { Card } from '@rneui/base';
import { Input, Button } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ErrorAlert from '../../components/ErrorAlert';
import { useSetSession } from '../../context/SessionProvider';
import { URL } from '../../helpers/helpers';
import { useFetch } from '../../hooks/useFetch';

const Login = () => {
  const [setConfigAuth, fetchDataAuth, loadingAuth, errorAuth, limpiarAuth] =
    useFetch();
  const setToken = useSetSession();
  const [form, setForm] = useState({
    usuario: '',
    contrasenia: '',
  });
  const handleChangeInput = (input, text) => {
    setForm((prevState) => {
      let inputsState = Object.assign({}, prevState);
      inputsState[input] = text;
      return inputsState;
    });
  };

  const handleSubmit = () => {
    try {
      setConfigAuth({
        url: `${URL}/login`,
        headersRequest: {
          method: 'POST',
          body: JSON.stringify({
            nombre_usuario: form.usuario,
            password_usuario: form.contrasenia,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
    return () => {
      limpiarAuth();
    };
  };

  useEffect(() => {
    if (!fetchDataAuth) return;
    if ('token' in fetchDataAuth) {
      setToken(fetchDataAuth?.token);
    }
  }, [fetchDataAuth]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card>
          <Card.Title>Iniciar Sesión</Card.Title>
          <Card.Divider />
          <Input
            onChangeText={(text) => handleChangeInput('usuario', text)}
            placeholder="ingrese nombre de usuario"
            leftIcon={{ type: 'font-awesome', name: 'user' }}
          />
          <Card.Divider />
          <Input
            onChangeText={(text) => handleChangeInput('contrasenia', text)}
            placeholder="Ingrese contraseña"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            secureTextEntry={true}
          />
          <Button
            title="Iniciar Sesión"
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={{
              backgroundColor: 'rgba(0, 0, 0, 1)',
              borderRadius: 5,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
            containerStyle={{
              marginHorizontal: 50,
              height: 50,
              width: 200,
              marginVertical: 10,
            }}
            onPress={handleSubmit}
          />
        </Card>
        {errorAuth?.errors &&
          errorAuth?.errors.map((msgError, i) => (
            <ErrorAlert claseCSS="red" key={i} mensaje={msgError?.msg} />
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default Login;
