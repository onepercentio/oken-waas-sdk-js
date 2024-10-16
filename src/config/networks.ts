export const alchemyNetworkMap =  {
  mainnet: 'homestead',
  sepolia: 'sepolia',
  polygon: 'matic',
  amoy: 'amoy',
  // @deprecated
  goerli: 'goerli',
  mumbai: 'maticmum',
  kovan: 'kovan',
}

export type Networks = {
  ETHEREUM: {
    MAINNET: string
    SEPOLIA: string
    /** @deprecated */
    GOERLI: string
    /** @deprecated */
    KOVAN: string
  },
  CELO: {
    ALFAJORES: string
    FORNO: string
  },
  POLYGON: {
    AMOY: string
    MAINNET: string
    LOCAL: string
    DOCKER: string
    /** @deprecated */
    MUMBAI: string
  },
  MOONBEAM: {
    MOONBASE: string
    MAINNET: string
  }
};

const networks: Networks = {
  ETHEREUM: {
    SEPOLIA: 'sepolia',
    KOVAN: 'kovan',
    GOERLI: 'goerli',
    MAINNET: 'mainnet'
  },
  CELO: {
    ALFAJORES: 'alfajores',
    FORNO: 'celo'
  },
  POLYGON: {
    AMOY: 'amoy',
    MUMBAI: 'mumbai',
    MAINNET: 'polygon',
    LOCAL: 'local',
    DOCKER: 'docker'
  },
  MOONBEAM: {
    MOONBASE: 'moonbase',
    MAINNET: 'moonbeam'
  }
}


export default networks