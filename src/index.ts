import wallet from './wallets'
import contracts from './contracts'
import transactions from './transactions'
import endpoints, { Endpoints } from './config/endpoints'
import networks from './config/networks'
import typedData from './typed_data'
import okenSigner from './components/okenSigner'
import API from './components/api'
import errors from './components/errorHandler'

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
