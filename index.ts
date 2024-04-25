import wallets from './src/wallets'
import contracts from './src/contracts'
import transactions from './src/transactions'
import endpoints from './src/config/endpoints'
import networks from './src/config/networks'
import typedData from './src/typed_data'
import okenSigner from './src/components/okenSigner'
import API from './src/components/api'
import errors from './src/components/errorHandler'

export type Config = {
  endpoint: string,
  network: string,
  okenClientId: string,
  privateKey: string,
  signer?: any
  alchemyKey?: string
}

export default {
  connect: ({ endpoint, network, okenClientId, privateKey, signer = okenSigner, alchemyKey }: Config) => {
    if (!endpoint) throw Error('Missing endpoint')
    if (!network) throw Error('Missing network')
    if (!okenClientId) throw Error('Missing okenClientId')
    if (!privateKey) throw Error('Missing privateKey')

    let alchemyConfig

    if (alchemyKey) alchemyConfig = { alchemyKey, network }

    const api = API(endpoint, signer(okenClientId, privateKey), alchemyConfig)

    return {
      wallets: wallets(api, network),
      contracts: contracts(api, network),
      transactions: transactions(api),
      errors: errors
    }
  },
  networks,
  endpoints,
  typedData
}
