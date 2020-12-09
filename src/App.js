import { Helmet } from 'react-helmet';
import { useUser } from './providers/user';
import Auth from './views/auth';
import Home from './views/home';
import theme from './theme';

function App() {
  const { token } = useUser();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ez-contract.</title>
        <link rel="canonical" href="https://app.ez-contract.io" />
        <meta name="description" content="Create and deploy ethereum smart contracts with a few clicks!" />
        <meta name="theme-color" content={theme.colors.primary} />
      </Helmet>

      {token
        ? <Home />
        : <Auth />
      }
    </>
  )
};

export default App;
