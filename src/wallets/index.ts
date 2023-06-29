export type CreateWalletResponse = {
  referenceId: string
  address: string
}

export type WalletResponse = {
  referenceId: string
  address: string
  status: 'CREATED' | 'AWAITING_RETRY' | 'CREATING_VAULT_KEYS'
  created: string
}

export type DataStructureItem = {
  type: string
  name: string
}

export type TypedMessage = {
  typeName: string,
  domainName: string,
  domainVersion: string,
  dataStructure: DataStructureItem[]
}

export type SignedTypedMessage = {
  v: 27 | 28,
  r: string,
  s: string,
  [key: string]: unknown
}

export default (api, network: string) => {
  return {
    create: (referenceId: string): Promise<CreateWalletResponse> => api.post('/wallets', { referenceId }),
    get: (referenceId: string): Promise<WalletResponse> => referenceId ?
      (api.get(`/wallets/${referenceId}`)) :
      (api.get('/wallets')),
    signTypedMessage: (typedData: TypedMessage, message: any, signerWallet: string, contractAddress: string): Promise<SignedTypedMessage> => {
      const payload = {
        message,
        network,
        contractAddress,
        typedData,
        signerWallet
      }
      return api.post('/wallets/typed-message', payload)
    }
  }
}