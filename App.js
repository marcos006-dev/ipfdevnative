import Routes from './src/components/Routes';
import SessionProvider from './src/context/SessionProvider';
export default function App() {
  return (
    <SessionProvider>
      <Routes />
    </SessionProvider>
  );
}
