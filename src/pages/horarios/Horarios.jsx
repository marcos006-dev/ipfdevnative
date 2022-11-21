import { Badge, Card } from '@rneui/themed';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSession } from '../../context/SessionProvider';
import { URL } from '../../helpers/helpers';
import { useFetch } from '../../hooks/useFetch';

const HorarioItem = ({ horario }) => {
  return (
    <Card
      containerStyle={{
        backgroundColor: `#fff3cd`,
      }}
    >
      <Card.Title>{horario.descripcion_materia}</Card.Title>
      <View
        style={{
          position: 'relative',
          alignItems: 'center',
        }}
      >
        {horario.horarios.map((horario) => (
          <>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>{horario.dia_semana}</Text>:{' '}
              {horario.horario_semana}
            </Text>
          </>
        ))}
      </View>
    </Card>
  );
};

const Horarios = () => {
  const [
    setConfigHorarios,
    fetchDataHorarios,
    loadingHorarios,
    errorHorarios,
    limpiarHorarios,
  ] = useFetch();

  const token = useSession();

  const loadHorarios = async () => {
    try {
      setConfigHorarios({
        url: `${URL}/horarios-alumnos/`,
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
    loadHorarios();
  }, [token]);
  return (
    <ScrollView>
      {loadingHorarios && <Badge status="success" />}
      {fetchDataHorarios?.horarios?.length > 0 ? (
        fetchDataHorarios.horarios.map((horario) => (
          <HorarioItem horario={horario} key={horario._id} />
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
            No posee horarios
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Horarios;
