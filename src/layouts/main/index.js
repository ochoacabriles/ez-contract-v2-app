import { cloneElement } from 'react';
import cookie from 'react-cookies';
import Box from 'blockdemy-ui/box';
import Typography from 'blockdemy-ui/typography';
import { useUser } from '../../providers/user';
import { GeneralContainer, NavBarContainer, FooterContainer } from './elements';

const MainLayout = ({ children }) => {
  const { user, setToken } = useUser();

  const logout = () => {
    cookie.remove('token');
    setToken();
  };

  return (
    <GeneralContainer>
      <NavBarContainer>
        <Box clickable ml="10px" onClick={logout}>
          <Typography fontSize="0.95rem" color="secondary">
            Log out
          </Typography>
        </Box>
        <Box display="flex">
          <Typography fontSize="0.95rem" color="secondary">
            Welcome {user.firstName} {user.lastName}
          </Typography>
        </Box>
        <Typography fontWidth="3px" color="secondary">ez-contract.</Typography>
      </NavBarContainer>
      {user?.id ? cloneElement(children, { user }) : null}
      <FooterContainer>
        <Typography color="primary">© 2020, ez-contract. Derechos reservados.</Typography>
      </FooterContainer>
    </GeneralContainer>
  );
};

export default MainLayout;
