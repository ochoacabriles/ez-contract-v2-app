import { Link } from 'react-router-dom';
import Button from 'blockdemy-ui/button';
import Typography from 'blockdemy-ui/typography';
import TokenCard from './token-card';
import { MessageContainer, GridContainer } from './elements';

const TokensTable = ({ info, results, refresh }) => (
  <>
    <GridContainer>
      {results.map(token => <TokenCard key={token.id} token={token} refresh={refresh} />)}
    </GridContainer>
    {(!info || info.count === 0) ? (
      <MessageContainer>
        <Typography variant="headingTitle">Oops! You haven't deployed any tokens yet.</Typography>
        <Typography variant="muted">It's time to create the first one!</Typography>
        <Link to="/ez-token">
          <Button color="primary" mt="40px">Create token</Button>
        </Link>
      </MessageContainer>
    ) : null}
  </>
);

export default TokensTable;
