import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { Link } from 'react-router-dom';
import Box from 'blockdemy-ui/box';
import Button from 'blockdemy-ui/button';
import Progress from 'blockdemy-ui/progress';
import Typography from 'blockdemy-ui/typography';
import { useUser } from '../../../providers/user';
import IcosList from '../../../components/dashboard/icos-list';
import TokensList from '../../../components/dashboard/tokens-list';
import { GET_TOKENS, GET_ICOS } from './requests';
import { Container, MessageContainer } from './elements';

const Home = () => {
  const { user } = useUser();

  // Get all user tokens and icos
  const { 
    data: tokensData, 
    loading: tokensLoading, 
    refetch: tokensRefetch 
  } = useQuery(GET_TOKENS, { variables: { isIco: false }, skip: !user.id });

  const {
    data: icosData,
    loading: icosLoading,
    refetch: icosRefetch
  } = useQuery(GET_ICOS, { skip: !user.id });

  const tokensInfo = tokensData && tokensData.tokensByUser.info;
  const tokens = tokensData && tokensData.tokensByUser.results;
  const icosInfo = icosData && icosData.icosByUser.info;
  const icos = icosData && icosData.icosByUser.results;

  const { active } = useWeb3React();

  useEffect(() => tokensRefetch(), [tokensRefetch]);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={20}>
        <Typography variant="h3" color="primary">Your contracts</Typography>
        {active
          ? <Link to="/ez-token">
              <Typography color="primary">New token</Typography>
            </Link>
          : <Typography color="primary">Connect your wallet to launch tokens</Typography>
          }
      </Box>
      {(!tokensData || tokensLoading || !icosData || icosLoading) ? (
        <Box display="flex" flexDirection="column">
          <Typography mb={10} variant="muted">Wait a second while we load the information</Typography>
          <Progress color="info" indeterminate />
        </Box>
      ) : (tokensData.info === 0 && icosData.info === 0
        ? <MessageContainer>
            <Typography variant="headingTitle">Oops! You haven't deployed any contracts yet.</Typography>
            <Typography variant="muted">Let's create your first token!</Typography>
            <Link to="/ez-token">
              <Button color="primary" mt="40px">Create token</Button>
            </Link>
          </MessageContainer>
        : <>
            {icosInfo.count > 0 ? <IcosList icos={icos} loading={icosLoading} refresh={icosRefetch} /> : null}
            {tokensInfo.count > 0 ? <TokensList tokens={tokens} loading={tokensLoading} refresh={tokensRefetch} /> : null}
          </>
      )}
    </Container>
  )
};

export default Home;
