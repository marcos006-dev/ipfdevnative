import { useNavigation } from '@react-navigation/native';
import { Badge, Card, Icon } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ModalLogout from '../../components/ModalLogout';
import { useSession } from '../../context/SessionProvider';
import { URL } from '../../helpers/helpers';
import { useFetch } from '../../hooks/useFetch';

const Home = () => {
  const [
    setConfigDataUser,
    fetchDataDataUser,
    loadingDataUser,
    errorDataUser,
    limpiarDataUser,
  ] = useFetch();

  const [logout, setLogout] = useState(false);
  const navigation = useNavigation();
  const toggleLogout = () => {
    setLogout(!logout);
  };

  const token = useSession();
  const loadUserData = async () => {
    // console.log(token);
    try {
      setConfigDataUser({
        url: `${URL}/user/`,
        headersRequest: {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            authorization: token,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    loadUserData();
  }, [token]);
  // console.log(fetchDataDataUser);

  return (
    <ScrollView>
      <Card>
        {loadingDataUser && <Badge status="success" />}
        <View style={{ position: 'relative', alignItems: 'center' }}>
          <Image
            style={{ width: '100%', height: 100 }}
            resizeMode="contain"
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
            }}
          />
          <Text>
            {fetchDataDataUser?.userData?.apellido_persona}{' '}
            {fetchDataDataUser?.userData?.nombre_persona}
          </Text>
        </View>
      </Card>
      <Card.Divider />
      <TouchableOpacity onPress={() => navigation.navigate('Avisos')}>
        <Card>
          <View style={{ position: 'relative', alignItems: 'center' }}>
            <Image
              onProgress={'Cargando'}
              style={{ width: '100%', height: 100 }}
              resizeMode="contain"
              source={{
                uri: 'http://blog.cloudflare.com/content/images/2021/12/image1-63.png',
              }}
            />
            <Text>Avisos</Text>
          </View>
        </Card>
      </TouchableOpacity>
      <Card.Divider />
      <TouchableOpacity onPress={() => navigation.navigate('Horarios')}>
        <Card>
          <View style={{ position: 'relative', alignItems: 'center' }}>
            <Image
              onProgress={'Cargando'}
              style={{ width: '100%', height: 100 }}
              resizeMode="contain"
              source={{
                uri: 'https://marketplace.canva.com/EAFFERKQe6I/1/0/1600w/canva-horario-semanal-cursillo-campamento-verano-organicohorizontal-Vetb6sfirdo.jpg',
              }}
            />
            <Text>Horarios</Text>
          </View>
        </Card>
      </TouchableOpacity>
      <Card.Divider />
      <TouchableOpacity onPress={() => navigation.navigate('Inasistencias')}>
        <Card>
          <View style={{ position: 'relative', alignItems: 'center' }}>
            <Image
              onProgress={'Cargando'}
              style={{ width: '100%', height: 100 }}
              resizeMode="contain"
              source={{
                uri: 'https://as2.ftcdn.net/v2/jpg/01/07/62/07/1000_F_107620788_38C24X03flzgZGyi7689rD14KvGZMK7G.jpg',
              }}
            />
            <Text>Inasistencias</Text>
          </View>
        </Card>
      </TouchableOpacity>
      <Card.Divider />
      <TouchableOpacity onPress={toggleLogout}>
        <Card>
          <View style={{ position: 'relative', alignItems: 'center' }}>
            <Image
              onProgress={'Cargando'}
              style={{ width: '100%', height: 100 }}
              resizeMode="contain"
              source={{
                uri: 'https://previews.123rf.com/images/sarahdesign/sarahdesign1410/sarahdesign141000851/32210992-logout-icon.jpg',
              }}
            />
            <Text>Cerrar Sesión</Text>
          </View>
        </Card>
      </TouchableOpacity>
      <Card.Divider />
      <ModalLogout logout={logout} setLogout={setLogout} />
    </ScrollView>
  );
};

export default Home;
