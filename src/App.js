import { useUser } from './providers/user';
import Auth from './views/auth';
import Home from './views/home';

function App() {
  const { token } = useUser();

  if (!token) return <Auth />;

  return <Home />;
};

export default App;
