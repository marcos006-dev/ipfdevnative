import { Card } from '@rneui/themed';

const ErrorAlert = ({ claseCSS, mensaje }) => {
  return (
    <Card containerStyle={{ backgroundColor: `${claseCSS}` }}>
      <Card.Title style={{ color: 'white' }}>{mensaje}</Card.Title>
    </Card>
  );
};

export default ErrorAlert;
