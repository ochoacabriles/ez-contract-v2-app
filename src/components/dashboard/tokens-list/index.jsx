import Typography from 'blockdemy-ui/typography';
import TokenCard from './token-card';
import { GridContainer } from './elements';

const TokensList = ({ tokens, refresh }) => (
  <>
    <Typography variant="h5" color="primary" mt={40} mb={20}>ERC20 Tokens:</Typography>
    <GridContainer>
      {tokens.map(token => <TokenCard key={token.id} token={token} refresh={refresh} />)}
    </GridContainer>
  </>
);

export default TokensList;
