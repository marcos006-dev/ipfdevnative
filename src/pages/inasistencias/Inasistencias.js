import { Badge, Card } from '@rneui/themed';
import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import dayjs from 'dayjs';
import { useSession } from '../../context/SessionProvider';
import { URL } from '../../helpers/helpers';
import { useFetch } from '../../hooks/useFetch';

const InasistenciaItem = ({ inasistencia }) => {
  const fechaInasistencia = dayjs(inasistencia.fecha).format('DD-MM-YYYY');
  return (
    <Card
      containerStyle={{
        backgroundColor: `#fff3cd`,
      }}
    >
      <Card.Title>Fecha Inasistencia: {fechaInasistencia}</Card.Title>
    </Card>
  );
};

const Inasistencias = () => {
  const [
    setConfigInasistencias,
    fetchDataInasistencias,
    loadingInasistencias,
    errorInasistencias,
    limpiarInasistencias,
  ] = useFetch();

  const token = useSession();

  const loadInasistencias = async () => {
    try {
      setConfigInasistencias({
        url: `${URL}/inasistencias-alumnos/`,
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
    loadInasistencias();
  }, [token]);
  return (
    <ScrollView>
      {loadingInasistencias && <Badge status="success" />}
      {fetchDataInasistencias?.inasistencias?.length > 0 ? (
        fetchDataInasistencias.inasistencias.map((inasistencia) => (
          <InasistenciaItem
            inasistencia={inasistencia}
            key={inasistencia._id}
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
            No posee inasistencias
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Inasistencias;
