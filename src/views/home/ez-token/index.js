import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client';
import Web3 from 'web3';
import Button from 'blockdemy-ui/button';
import Input from 'blockdemy-ui/input';
import Loader from 'blockdemy-ui/loader';
import Typography from 'blockdemy-ui/typography';
import { MessageContainer, FormContainer, GeneralContainer } from './elements';
import { GET_CONTRACT_SOURCE, ADD_TOKEN } from './requests';

const EzToken = () => {
  const [ethProvider, setEthProvider] = useState();
  const [loading, setLoading] = useState();
  const [web3, setWeb3] = useState();
  const [form, setForm] = useState({
    name: '',
    symbol: '',
    supply: 0
  });
  const [deployed, setDeployed] = useState();
  const [contractSourceId] = useState('5fc15896126ac0cf498e6660');

  const { mutate } = useApolloClient();

  const { data, loading: queryLoading } = useQuery(GET_CONTRACT_SOURCE, {
    variables: { contractSourceId }
  });

  useEffect(() => {
    setLoading(true);
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      setWeb3(window.web3);
      setEthProvider(true);
    } else {
      setEthProvider(false);
    }
    setLoading(false);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const { contractSource: { bytecode, abi } } = data;
    const { name, symbol, supply } = form;
    const [account]= await web3.eth.getAccounts();
    const estimatedGas = await web3.eth.estimateGas({ data: bytecode, from: account });
    const network = await web3.eth.net.getNetworkType();

    const decimals = 18;

    const tokenContract = new web3.eth.Contract(JSON.parse(abi));
    const tokenSupply = web3.utils.toWei(supply, 'ether');

    await tokenContract.deploy({
      data: bytecode,
      arguments: [name, symbol, decimals, tokenSupply]
    })
    .send({
      from: account,
      gasPrice: estimatedGas
    })
    .on('error', err => console.log(err))
    .on('transactionHash', async transactionHash => {
      const tokenToAdd = {
        transactionHash,
        contract: contractSourceId,
        estimatedGas,
        network,
        proprietaryAddress: account,
        type: 'basic',
        supply: parseInt(supply),
        name,
        symbol,
        decimals: 18
      };
      
      await mutate({
        mutation: ADD_TOKEN,
        variables: { tokenToAdd }
      });

      setDeployed(true);
      setLoading(false);
    });
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

  if (!ethProvider) return (
    <MessageContainer>
    <Typography variant="header">Oops! Seems like you don't have and ETH provider in your browser.</Typography>
    <Typography variant="muted" mt="20px">
      Please install and configure <a href="https://metamask.io/download.html">metamask</a> in your browser and try 
      again.
    </Typography>
  </MessageContainer>
  );

  return (
    <GeneralContainer>
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
          type="number"
          name="Supply"
          label="Supply"
          placeholder={100}
          value={form.supply}
          onChange={({ target: { value: supply } }) => setForm({ ...form, supply })}
          required
        />
        <Button 
          color="primary" 
          mt="30px"
          disabled={loading || queryLoading}
        >
          {(loading || queryLoading) ? <Loader size={10} /> : 'Deploy token'}
        </Button>
      </FormContainer>
    </GeneralContainer>
  );
};

export default EzToken;
