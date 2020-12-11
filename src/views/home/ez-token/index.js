import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { ContractFactory } from '@ethersproject/contracts';
import { parseUnits } from '@ethersproject/units';
import Box from 'blockdemy-ui/box';
import Button from 'blockdemy-ui/button';
import Input from 'blockdemy-ui/input';
import Loader from 'blockdemy-ui/loader';
import Typography from 'blockdemy-ui/typography';
import { networksMapping } from '../../../config/constants';
import { MessageContainer, FormContainer, GeneralContainer } from './elements';
import { GET_CONTRACT_SOURCE, ADD_TOKEN } from './requests';

const EzToken = () => {
  const [loading, setLoading] = useState();
  const [form, setForm] = useState({
    name: '',
    symbol: '',
    supply: 0
  });
  const [deployed, setDeployed] = useState();
  const [error, setError] = useState();
  const { account, chainId, library } = useWeb3React();

  const [contractSourceId] = useState('5fc15896126ac0cf498e6660');

  const { mutate } = useApolloClient();

  const { data, loading: queryLoading } = useQuery(GET_CONTRACT_SOURCE, {
    variables: { contractSourceId }
  });

  const deployContract = async () => {
    const { contractSource: { bytecode, abi } } = data;
    const { name, symbol, supply } = form;

    const decimals = 18;

    const tokenSupply = parseUnits(supply.toString(), 'ether');
    const contract = new ContractFactory(JSON.parse(abi), bytecode, library.getSigner());

    const deploydContract = await contract.deploy(name, symbol, decimals, tokenSupply);

    const { address, deployTransaction: { hash: transactionHash } } = deploydContract;

    const toreturn = {
      address,
      transactionHash,
      contract: contractSourceId,
      estimatedGas: 0,
      network: networksMapping[chainId].toLowerCase(),
      proprietaryAddress: account,
      type: 'basic',
      supply: parseInt(supply),
      name,
      symbol,
      decimals: 18
    }

    return toreturn;
/*
    const network = networksMapping[networkId];
    const tokenContract = new web3.eth.Contract(JSON.parse(abi));
    const tokenSupply = web3.utils.toWei(supply, 'ether');
    return new Promise((resolve, reject) => tokenContract.deploy({
      data: bytecode,
      arguments: [name, symbol, decimals, tokenSupply]
    })
    .send({
      from: account,
    })
    .on('error', err => reject(err))
    .on('transactionHash', transactionHash => resolve({
      transactionHash,
      contract: contractSourceId,
      estimatedGas: 0,
      network,
      proprietaryAddress: account,
      type: 'basic',
      supply: parseInt(supply),
      name,
      symbol,
      decimals: 18
    }))

  ) */};

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

      try {
        const tokenToAdd = await deployContract();
        console.log(tokenToAdd)
        await mutate({
          mutation: ADD_TOKEN,
          variables: { tokenToAdd }
        });
        setDeployed(true);
      } catch (err) {
        console.log(err)
        setError(true);
      }
      setLoading(false);
  };

  if (deployed) return (
    <MessageContainer>
      <Typography variant="headingTitle">Congratulations! Your contract is being deployed.</Typography>
      <Typography variant="muted" mt="20px">Go to dashboard to confirm it and to see details.</Typography>
      <Link to="/">
        <Button color="primary" mt="40px">Go to dashboard</Button>
      </Link>
    </MessageContainer>
  );

  if (error) return (
    <MessageContainer>
      <Typography variant="headingTitle">We're sorry! Your contract wasn't deployed.</Typography>
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
        ez-token
      </Typography>
      <Typography variant="muted" mt={10}>
        Deploy basic ERC20 token contract
      </Typography>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          label="Token name"
          placeholder="ez-token"
          value={form.name}
          onChange={({ target: { value: name } }) => setForm({ ...form, name })}
          required
        />
        <Input
          label="Token symbol"
          placeholder="EZT"
          value={form.symbol}
          onChange={({ target: { value: symbol } }) => setForm({ ...form, symbol })}
          required
        />
        <Input
          name="Supply"
          label="Supply"
          placeholder={100}
          value={form.supply}
          onChange={({ target: { value: supply } }) => setForm({ ...form, supply })}
          required
        />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={30}>
          <Button 
            color="primary" 
            disabled={loading || queryLoading}
          >
            {(loading || queryLoading) ? <Loader size={10} /> : 'Deploy token'}
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
  );
};

export default EzToken;
