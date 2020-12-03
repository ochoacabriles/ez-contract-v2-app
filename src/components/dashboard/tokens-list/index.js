import { Link } from 'react-router-dom';
import Button from 'blockdemy-ui/button';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from 'blockdemy-ui/table';
import Typography from 'blockdemy-ui/typography';
import TokenRow from './token-row';
import { MessageContainer, TableContainer } from './elements';

const TokensTable = ({ info, results, refresh }) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Symbol</TableCell>
          <TableCell>Network</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Supply</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      {info?.count > 0 ? (
          <TableBody>
            {results.map(token => <TokenRow token={token} key={token.id} refresh={refresh} />)}
          </TableBody>
        ) : null}
    </Table>
    {(!info || info.count === 0) ? (
      <MessageContainer>
        <Typography variant="headingTitle">Oops! You haven't deployed any tokens yet.</Typography>
        <Typography variant="muted">It's time to create the first one!</Typography>
        <Link to="/ez-token">
          <Button color="primary" mt="40px">Create token</Button>
        </Link>
      </MessageContainer>
    ) : null}
  </TableContainer>
);

export default TokensTable;
