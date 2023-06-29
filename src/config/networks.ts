export type Networks = {
  ETHEREUM: {
    KOVAN: string
    GOERLI: string
    ROPSTEN: string
    RINKEBY: string
    MAINNET: string
  },
  CELO: {
    ALFAJORES: string
    FORNO: string
  },
  POLYGON: {
    MUMBAI: string
    MAINNET: string
  }
};

const networks: Networks = {
  ETHEREUM: {
    KOVAN: 'kovan',
    GOERLI: 'goerli',
    ROPSTEN: 'ropsten',
    RINKEBY: 'rinkeby',
    MAINNET: 'mainnet'
  },
  CELO: {
    ALFAJORES: 'alfajores',
    FORNO: 'celo'
  },
  POLYGON: {
    MUMBAI: 'mumbai',
    MAINNET: 'polygon'
  }
}


export default networks