import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Box from 'blockdemy-ui/box';
import Progress from 'blockdemy-ui/progress';
import Typography from 'blockdemy-ui/typography';
import { useUser } from '../../../providers/user';
import TokensList from '../../../components/dashboard/tokens-list';
import { GET_TOKENS } from './requests';
import { Container } from './elements';

const Home = () => {
  const { user } = useUser();
  const { data, loading, refetch } = useQuery(GET_TOKENS, { skip: !user.id});
  const info = data && data.tokensByUser.info;
  const results = data && data.tokensByUser.results;

  useEffect(() => refetch(), [refetch]);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={20}>
        <Typography variant="h3" color="primary">Your tokens</Typography>
        <Link to="/ez-token">
          <Typography color="primary">New token</Typography>
        </Link>
      </Box>
      {(loading || !data) ? (
        <Box display="flex" flexDirection="column">
          <Typography mb={10} variant="muted">Wait a second while we load the information</Typography>
          <Progress color="info" indeterminate />
        </Box>
      ) : (
        <TokensList info={info} results={results} loading={loading} refresh={refetch} />
      )}
    </Container>
  )
};

export default Home;
