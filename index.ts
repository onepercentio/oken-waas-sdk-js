import wallets from './src/wallets'
import contracts from './src/contracts'
import transactions from './src/transactions'
import endpoints from './src/config/endpoints'
import networks from './src/config/networks'
import typedData from './src/typed_data'
import okenSigner, { SignerOptions } from './src/components/okenSigner'
import API from './src/components/api'
import errors from './src/components/errorHandler'

export type Config = {
  endpoint: string,
  network: string,
  okenClientId: string,
  privateKey: string,
  signer?: any
  alchemyKey?: string
  signerOptions?: SignerOptions
}

export default {
  /**
   * @dev Connect to the Oken API
   * @param config
   * @returns oken instance
   */
  connect: ({ endpoint, network, okenClientId, privateKey, signer = okenSigner, signerOptions, alchemyKey }: Config) => {
    if (!endpoint) throw Error('Missing endpoint')
    if (!network) throw Error('Missing network')
    if (!okenClientId) throw Error('Missing okenClientId')
    if (!privateKey) throw Error('Missing privateKey')

    let alchemyConfig

    if (alchemyKey) alchemyConfig = { alchemyKey, network }

    const api = API(endpoint, signer(okenClientId, privateKey, signerOptions), alchemyConfig)

    return {
      wallets: wallets(api, network),
      contracts: contracts(api, network),
      transactions: transactions(api),
      errors: errors
    }
  },
  /**
   * @dev List of available networks
   */
  networks,
  /**
   * @dev List of available environments
   */
  endpoints,
  /**
   * @dev Collection of some typed data structures. You can use your own typed data structures when signing v4 messages
   */
  typedData
}
