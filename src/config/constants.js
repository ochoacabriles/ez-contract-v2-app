const passwordRegex = /^(?=.*?[A-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9 ]).{8,}$/g;

const networksMapping = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Goerli',
  42: 'Kovan',
  1337: 'Local'
};

const supportedNetworks = [1, 3, 4, 5, 42, 1337];

export { passwordRegex, networksMapping, supportedNetworks };
