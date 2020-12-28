import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { Contract } from '@ethersproject/contracts';
import { parseUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import Box from 'blockdemy-ui/box';
import Button from 'blockdemy-ui/button';
import Loader from 'blockdemy-ui/loader';
import Pill from 'blockdemy-ui/pill';
import Typography from 'blockdemy-ui/typography';
import { Card, CardBody, CardHeader, CardFooter } from 'blockdemy-ui/card';
import { useClipboard } from 'blockdemy-ui/hooks';
import { MdDone, MdContentCopy } from 'react-icons/md';
import theme from '../../../../theme';
import { CONFIRM_ICO, GET_CONTRACT_SOURCE, FUND_ICO } from './requests';
import { AddressContainer } from './elements';

const IcoCard = ({ ico, refresh }) => {
  const [loading, setLoading] = useState();
  const [funding, setFunding] = useState();
  const { query, mutate } = useApolloClient();
  const { onCopy, hasCopied } = useClipboard(ico.address);
  const { library } = useWeb3React();
  
  useEffect(() => {
    const confirmIco = async () => {
      setLoading(true);
      try {
        await mutate({
          mutation: CONFIRM_ICO,
          variables: { icoId: ico.id }
        });
        refresh()
      } catch (err) {
        // Pass
      }
      setLoading(false);
    };
    if (!ico.blockNumber) {
      confirmIco();
    }
  }, [mutate, refresh, ico]);

  const fundIco = async () => {
    setFunding(true);
    const contractSourceId = '5fc15896126ac0cf498e6660';
    const { data: { contractSource: { abi } } } = await query({
      query: GET_CONTRACT_SOURCE, 
      variables: { contractSourceId } 
    });

    const tokenContract = new Contract(ico.token.address, abi, library.getSigner());

    const { hash: fundingTransactionHash } = await tokenContract.transfer(ico.address, parseUnits(ico.token.supply.toString(), 'ether'));

    await mutate({
      mutation: FUND_ICO,
      variables: { icoId: ico.id, fundingTransactionHash }
    });
    setFunding(false);
  };

  return (
    <Card>
      <CardHeader title={ico.token.name} subtitle={ico.token.network} />
      <CardBody>
        <Box display="flex" mb={20}>
          <Typography variant="heading">
            {ico.token.symbol}
          </Typography>
          {!ico.blockNumber ? (
            <Pill size="small" variant="soft" ml={10}>unconfirmed</Pill>
          ) : null}
          {!ico.fundingTransactionHash ? (
            <Pill size="small" variant="soft" ml={10}>Not funded</Pill>
          ) : null}
        </Box>
        {loading 
          ? <Typography fontSize="0.8rem">
            Trying to confirm your ico...
          </Typography>
          : (ico.address
            ? <Box display="flex" justifyContent="space-between" alignItems="center">
                <AddressContainer>
                  <Typography fontSize="0.8rem">
                    <a 
                      href={`https://${ico.token.network === 'mainnet' ? '' : ico.token.network}.etherscan.io/address/${ico.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ico.address}
                    </a>
                  </Typography>
                </AddressContainer>
                  {hasCopied 
                    ? <MdDone color={theme.colors.lightGrey} size="1rem" border="solid" /> 
                    : <Box as={MdContentCopy} height="1rem" clickable onClick={onCopy} />}
                </Box>
            : <AddressContainer>
              <Typography fontSize="0.8rem">
                Your ico hasn't been confirmed. Try again later
              </Typography>
            </AddressContainer>
          )
        }
        <Box display="flex" alignItems="center" mt={10}>
          <Typography fontSize="0.9rem">
            Total supply:
          </Typography>
          <Typography fontSize="0.9rem" ml={5}>
            {`${ico.token.supply.toFixed(2)} ${ico.token.symbol}`}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={10}>
          <Typography fontSize="0.9rem">
            Rate:
          </Typography>
          <Typography fontSize="0.9rem" ml={5}>
            {`${ico.rate.toFixed(2)} ${ico.token.symbol}/ETH`}
          </Typography>
        </Box>
      </CardBody>
      <CardFooter>
        {!ico.fundingTransactionHash && ico.blockNumber
          ? (
            <Button 
              variant="soft" 
              color="primary"
              size="small"
              onClick={fundIco}
              disabled={funding}
            >
              {funding ? <Loader size={15} /> : 'Fund ICO'}
            </Button>
          ) : <Box height="24px" />
        }
      </CardFooter>
    </Card>

  )
};

export default IcoCard;
