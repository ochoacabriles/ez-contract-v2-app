import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { ContractFactory } from '@ethersproject/contracts';
import Box from 'blockdemy-ui/box';
import Button from 'blockdemy-ui/button';
import Input from 'blockdemy-ui/input';
import Loader from 'blockdemy-ui/loader';
import Typography from 'blockdemy-ui/typography';
import { networksMapping } from '../../../config/constants';
import { GET_CONTRACT_SOURCE, GET_TOKEN, ADD_ICO } from './requests';
import { GeneralContainer, MessageContainer, FormContainer } from './elements';

const EzIcoBasic = () => {
  const params = new URLSearchParams(useLocation().search);
  const tokenAddress = params.get('tokenAddress');
  const tokenId = params.get('tokenId');
  const network = params.get('network');

  const [loading, setLoading] = useState();
  const [rate, setRate] = useState(1);

  const [deployed, setDeployed] = useState();
  const [error, setError] = useState();

  const { mutate } = useApolloClient();

  const { account, chainId, library } = useWeb3React();
  const [contractSourceId] = useState('5fc15896126ac0cf498e6661');

  const { data, loading: queryLoading } = useQuery(GET_CONTRACT_SOURCE, {
    variables: { contractSourceId }
  });

  const { data: tokenData, loading: tokenLoading } = useQuery(GET_TOKEN, 
    { variables: { tokenId: tokenId } }
  );

  const deployContract = async () => {
    const { contractSource: { bytecode, abi } } = data;

    const contract = new ContractFactory(JSON.parse(abi), bytecode, library.getSigner());

    const deployedContract = await contract.deploy(rate, account, tokenAddress);

    const { address, deployTransaction: { hash: transactionHash } } = deployedContract;

    return {
      address,
      transactionHash,
      contract: contractSourceId,
      estimatedGas: 0,
      proprietaryAddress: account,
      rate: parseFloat(rate),
      token: tokenId
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

      try {
        const icoToAdd = await deployContract();
        await mutate({
          mutation: ADD_ICO,
          variables: { icoToAdd }
        });
        setDeployed(true);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
  };

  if (networksMapping[chainId].toLowerCase() !== network.toLowerCase()) return (
    <MessageContainer>
      <Typography variant="headingTitle">We're sorry! We can't create your ICO contract now.</Typography>
      <Typography variant="muted" mt="20px">Please change the network in Metamask to {network} to match your token's network.</Typography>
      <Link to="/">
        <Button color="primary" mt="40px">Go to dashboard</Button>
      </Link>
    </MessageContainer>    
  )
  
  if (deployed) return (
    <MessageContainer>
      <Typography variant="headingTitle">Congratulations! Your ICO is being deployed.</Typography>
      <Typography variant="muted" mt="20px">Go to dashboard to confirm it and to see details.</Typography>
      <Link to="/">
        <Button color="primary" mt="40px">Go to dashboard</Button>
      </Link>
    </MessageContainer>
  );

  if (error) return (
    <MessageContainer>
      <Typography variant="headingTitle">We're sorry! Your ICO wasn't deployed.</Typography>
      <Typography variant="muted" mt="20px">
        Please check if your ETH account has enough balance and try again later.
      </Typography>
      <Link to="/">
        <Button color="primary" mt="40px">Go to dashboard</Button>
      </Link>
    </MessageContainer>
  );

  return (
    <GeneralContainer>
      <Typography variant="headingTitle" mt={20} color="primary">
        ez-ico-basic
      </Typography>
      <Typography variant="muted" mt={10}>
        Deploy basic ICO contract
      </Typography>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          label="Token name"
          value={tokenLoading ? 'Loading...' : tokenData.token.name}
          disabled
        />
        <Input
          label="Token symbol"
          value={tokenLoading ? 'Loading...' : tokenData.token.symbol}
          disabled
        />
        <Input
          name="Supply"
          label="Supply"
          value={tokenLoading ? 0 : tokenData.token.supply}
          disabled
        />
        <Input 
          name="Rate"
          label="Rate (How many tokens will you return for 1 ETH?)"
          value={rate}
          onChange={({ target: { value } }) => setRate(value)}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={30}>
          <Button 
            color="primary" 
            disabled={loading || queryLoading}
          >
            {(loading || queryLoading) ? <Loader size={10} /> : 'Deploy ICO'}
          </Button>
          <Link to="/">
            <Button 
              type="button" 
              color="primary"
              disabled={loading}
            >
              Cancel
            </Button>
          </Link>

        </Box>
      </FormContainer>
    </GeneralContainer>
  )
};

export default EzIcoBasic;
