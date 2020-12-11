import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { supportedNetworks } from '../config/constants';

export const injectedConnector = new InjectedConnector({ supportedChainIds: supportedNetworks });

export const getLibrary = (provider) => {
  return new Web3Provider(provider);
};
