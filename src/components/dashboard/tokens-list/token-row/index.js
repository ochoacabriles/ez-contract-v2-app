import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Box from 'blockdemy-ui/box';
import Loader from 'blockdemy-ui/loader';
import Pill from 'blockdemy-ui/pill';
import Typograhpy from 'blockdemy-ui/typography';
import { TableCell, TableRow } from 'blockdemy-ui/table';
import { toast } from '../../../../providers/theme';
import { CONFIRM_TOKEN } from './requests';

const TokenRow = ({ token, refresh }) => {
  const [loading, setLoading] = useState();
  const { mutate } = useApolloClient();
  
  const confirmToken = async () => {
    setLoading(true);
    try {
      await mutate({
        mutation: CONFIRM_TOKEN,
        variables: { tokenId: token.id }
      });
      refresh();
    } catch (err) {
      toast.danger('Error', err.message);
    }
    setLoading(false);
  };

  return (
  <TableRow>
    <TableCell>
      <Box display="flex" alignItems="center">
        {token.name}
        {!token.address ? (
          <Pill size="small" variant="soft" ml={5}>uncofirmed</Pill>
        ) : null}
      </Box>
    </TableCell>
    <TableCell>
      {token.symbol}
    </TableCell>
    <TableCell>
      {token.network}
    </TableCell>
    <TableCell>
      {loading 
        ? <Loader size={10} />
        : (token.address 
          ? token.address 
          : (<Box clickable onClick={confirmToken}>
              <Typograhpy fontSize="0.85rem" color="primary">
                Press here to confirm the contract and get the address
              </Typograhpy>
            </Box>
          )
        )
      }
    </TableCell>
    <TableCell>
      {token.supply} {token.symbol}
    </TableCell>
    <TableCell>
        {null}
    </TableCell>
  </TableRow>
  )
};

export default TokenRow;
