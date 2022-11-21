import { Badge, Card } from '@rneui/themed';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import { es } from 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from '../../context/SessionProvider';
import { URL } from '../../helpers/helpers';
import { useFetch } from '../../hooks/useFetch';
import { ScrollView } from 'react-native-gesture-handler';

dayjs.locale('es');
dayjs.extend(relativeTime);
const CardAviso = ({ aviso, tipoAviso }) => {
  let mismoDia = dayjs().isSame(aviso.fecha_alta, 'day');

  return (
    <Card
      containerStyle={{ backgroundColor: `${mismoDia ? 'yellow' : '#d1d2d3'}` }}
    >
      <Card.Title>{tipoAviso}</Card.Title>
      <View
        style={{
          position: 'relative',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Text>{aviso.descripcion_aviso}</Text>
        <Text>{dayjs().to(dayjs(aviso.fecha_alta))}</Text>
      </View>
    </Card>
  );
};

const Avisos = () => {
  const [
    setConfigAvisos,
    fetchDataAvisos,
    loadingAvisos,
    errorAvisos,
    limpiarAvisos,
  ] = useFetch();

  const token = useSession();

  const loadAvisos = async () => {
    try {
      setConfigAvisos({
        url: `${URL}/avisos-alumnos/`,
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
    loadAvisos();
  }, [token]);
  //   console.log(fetchDataAvisos);
  return (
    <ScrollView>
      {loadingAvisos && <Badge status="success" />}

      {fetchDataAvisos?.avisoParticular?.length > 0 ? (
        fetchDataAvisos.avisoParticular.map((aviso) => (
          <CardAviso
            aviso={aviso}
            key={aviso.fecha_alta}
            tipoAviso={'Aviso Particular'}
          />
        ))
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 0,
              width: 200,
              backgroundColor: 'yellow',
              marginTop: 10,
            }}
          >
            No posee avisos particulares
          </Text>
        </View>
      )}

      {fetchDataAvisos?.avisoGeneral?.length > 0 ? (
        fetchDataAvisos.avisoGeneral.map((aviso) => (
          <CardAviso
            aviso={aviso}
            key={aviso.fecha_alta}
            tipoAviso={'Aviso General'}
          />
        ))
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 0,
              width: 200,
              backgroundColor: 'yellow',
              marginTop: 10,
            }}
          >
            No posee avisos en general
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Avisos;
