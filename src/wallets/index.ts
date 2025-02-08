import { TypedDataField } from "ethers"

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
  dataStructure?: DataStructureItem[]
  types?: Record<string, TypedDataField[]>
}

export type SignedTypedMessage = {
  v: 27 | 28,
  r: string,
  s: string,
  [key: string]: unknown
}

export default (api, network: string) => {
  return {
    /**
     * @param referenceId Your reference id for this user
     * @param type The signer type, can be 'VAULT' or 'SMART_ACCOUNT'
     * @param network If the signer type is 'SMART_ACCOUNT', you can specify the network
     * @returns {Promise<CreateWalletResponse>}
     */
    create: (referenceId: string, signerType?: 'VAULT' | 'SMART_ACCOUNT', network?: string): Promise<CreateWalletResponse> => {
      if (!signerType || signerType === 'VAULT') return api.post('/wallets', { referenceId, type: signerType })
      return api.post('/wallets', { referenceId, type: signerType, network })
    },
    batchCreate: (referenceIds: string[], signerType?: 'VAULT' | 'SMART_ACCOUNT', network?: string): Promise<CreateWalletResponse> => {
      if (!signerType || signerType === 'VAULT') return api.post('/wallets', { referenceIds, type: signerType })
      return api.post('/wallets', { referenceIds, type: signerType, network })
    },
    createVaultAccount: (referenceId: string): Promise<CreateWalletResponse> => {
      return api.post('/wallets', { referenceId, type: 'VAULT' })
    },
    createSmartAccount: (referenceId: string, network: string): Promise<CreateWalletResponse> => {
      return api.post('/wallets', { referenceId, type: 'SMART_ACCOUNT', network })
    },
    get: (referenceId?: string): Promise<WalletResponse> => referenceId ?
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