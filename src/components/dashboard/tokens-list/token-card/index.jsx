import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';
import Box from 'blockdemy-ui/box';
import Button from 'blockdemy-ui/button';
import Pill from 'blockdemy-ui/pill';
import Typography from 'blockdemy-ui/typography';
import { Card, CardBody, CardHeader, CardFooter } from 'blockdemy-ui/card';
import { useClipboard } from 'blockdemy-ui/hooks';
import { MdDone, MdContentCopy } from 'react-icons/md';
import theme from '../../../../theme';
import { CONFIRM_TOKEN } from './requests';
import { AddressContainer } from './elements';

const TokenCard = ({ token, refresh }) => {
  const [loading, setLoading] = useState();
  const { mutate } = useApolloClient();
  const { onCopy, hasCopied } = useClipboard(token.address);
  
  useEffect(() => {
    const confirmToken = async () => {
      setLoading(true);
      try {
        await mutate({
          mutation: CONFIRM_TOKEN,
          variables: { tokenId: token.id }
        });
        refresh()
      } catch (err) {
        // Pass
      }
      setLoading(false);
    };
    if (!token.blockNumber) {
      confirmToken();
    }
  }, [mutate, refresh, token]);

  return (
    <Card>
      <CardHeader title={token.name} subtitle={token.network} />
      <CardBody>
        <Box display="flex" mb={20}>
          <Typography variant="heading">
            {token.symbol}
          </Typography>
          {!token.blockNumber ? (
            <Pill size="small" variant="soft" ml={10}>unconfirmed</Pill>
          ) : null}
        </Box>
        {loading 
          ? <Typography fontSize="0.8rem">
            Trying to confirm your token...
          </Typography>
          : (token.address
            ? <Box display="flex" justifyContent="space-between" alignItems="center">
                <AddressContainer>
                  <Typography fontSize="0.8rem">
                    <a 
                      href={`https://${token.network === 'mainnet' ? '' : token.network}.etherscan.io/address/${token.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {token.address}
                    </a>
                  </Typography>
                </AddressContainer>
                  {hasCopied 
                    ? <MdDone color={theme.colors.lightGrey} size="1rem" border="solid" /> 
                    : <Box as={MdContentCopy} height="1rem" clickable onClick={onCopy} />}
                </Box>
            : <AddressContainer>
              <Typography fontSize="0.8rem">
                Your token hasn't been confirmed. Try again later
              </Typography>
            </AddressContainer>
          )
        }
        <Box display="flex" alignItems="center" mt={10}>
          <Typography fontSize="0.9rem">
            Total supply:
          </Typography>
          <Typography fontSize="0.9rem" ml={5}>
            {`${token.supply.toFixed(2)} ${token.symbol}`}
          </Typography>
        </Box>
      </CardBody>
      <CardFooter>
        {!token.isIco && token.blockNumber
          ? (
            <Link to={`/ez-ico-basic?tokenAddress=${token.address}&network=${token.network}&tokenId=${token.id}`}>
              <Button 
                variant="soft" 
                color="primary"
                size="small"
              >
                Launch ICO
              </Button>
            </Link>
          ) : <Box height="24px" />
        }
      </CardFooter>
    </Card>

  )
};

export default TokenCard;
