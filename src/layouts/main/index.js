import { cloneElement } from 'react';
import cookie from 'react-cookies';
import Box from 'blockdemy-ui/box';
import Typography from 'blockdemy-ui/typography';
import { FiLogOut } from 'react-icons/fi';
import { useUser } from '../../providers/user';
import { theme } from '../../providers/theme';
import Web3Connection from './web3-connection';
import { GeneralContainer, NavBarContainer, FooterContainer, TitleTypography } from './elements';

const MainLayout = ({ children }) => {
  const { user, setToken } = useUser();

  const logout = () => {
    cookie.remove('token');
    setToken();
  };

  return (
    <GeneralContainer>
      <NavBarContainer>
        <Box display="flex" flexBasis="20%" justifyContent="center">
          <TitleTypography>ez-contract.</TitleTypography>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexBasis="60%">
          <Box display="flex" mb={3}>
            <Typography fontSize="0.95rem" color="primary">
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Web3Connection />
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" clickable ml="10px" onClick={logout} flexBasis="20%">
          <FiLogOut color={theme.colors.primary} size="1.5rem" /> 
        </Box>
      </NavBarContainer>
      {user?.id ? cloneElement(children, { user }) : null}
      <FooterContainer>
        <Typography color="primary">© 2020, ez-contract. Derechos reservados.</Typography>
      </FooterContainer>
    </GeneralContainer>
  );
};

export default MainLayout;
