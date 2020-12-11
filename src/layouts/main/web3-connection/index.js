import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Box from 'blockdemy-ui/box';
import Loader from 'blockdemy-ui/loader';
import Pill from 'blockdemy-ui/pill';
import { injectedConnector } from '../../../providers/web3';
import { WalletContainer } from './elements';
import { networksMapping } from '../../../config/constants';

const Web3Connection = () => {
  const { chainId, account, activate, active, error } = useWeb3React();
  const [retryConnection, setRetryConnection] = useState(0);

  useEffect(() => {
    activate(injectedConnector)
  }, [activate, retryConnection]);

  if (error) return (
    <Box clickable onClick={() => setRetryConnection(retryConnection + 1)}>
      <Pill color="danger" variant="soft" px={15}>
        Connection failed. Click here to retry...
      </Pill>
    </Box>
  );

  if (!active) return (
    <Pill color="info" variant="soft" px={15}>
      Connecting... 
      <Loader size="10px" color="info" />
    </Pill>
  );

  return (
    <>
      <Pill variant="soft" color={chainId === 1 ? "primary" : "danger"} px={15} mr={10}>
        {networksMapping[chainId]}
      </Pill>
      <WalletContainer>
        <Pill variant="soft" color="primary" px={15}>
          {account}
        </Pill>
      </WalletContainer>
    </>
  )

};

export default Web3Connection;
