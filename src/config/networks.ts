export const alchemyNetworkMap =  {
  mainnet: 'homestead',
  goerli: 'goerli',
  rinkeby: 'rinkeby',
  polygon: 'matic',
  mumbai: 'maticmum',
}

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
    LOCAL: string
  },
  MOONBEAM: {
    MOONBASE: string
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
    MAINNET: 'polygon',
    LOCAL: 'local'
  },
  MOONBEAM: {
    MOONBASE: 'moonbase',
    MAINNET: 'moonbeam'
  }
}


export default networks