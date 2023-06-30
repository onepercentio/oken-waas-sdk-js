import wallet from './src/wallets'
import contracts from './src/contracts'
import transactions from './src/transactions'
import endpoints, { Endpoints } from './src/config/endpoints'
import networks from './src/config/networks'
import typedData from './src/typed_data'
import okenSigner from './src/components/okenSigner'
import API from './src/components/api'
import errors from './src/components/errorHandler'

export type Config = {
  endpoint: Endpoints,
  network: string,
  okenClientId: string,
  privateKey: string,
  signer?: any
}

export default {
  connect: ({ endpoint, network, okenClientId, privateKey, signer = okenSigner }: Config) => {
    const api = API(endpoint, signer(okenClientId, privateKey))
    return {
      wallets: wallet(api, network),
      contracts: contracts(api, network),
      transactions: transactions(api),
      errors: errors
    }
  },
  networks,
  endpoints,
  typedData
}
