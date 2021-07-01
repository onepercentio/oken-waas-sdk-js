const wallet = require('./src/wallets')
const contracts = require('./src/contracts')
const transactions = require('./src/transactions')
const endpoints = require('./src/config/endpoints')
const networks = require('./src/config/networks')
const okenSigner = require('./src/components/okenSigner')
const API = require('./src/components/api')
const errors = require('./src/components/errorHandler')

module.exports = {
  connect: ({ endpoint, network, okenClientId, privateKey, signer = okenSigner }) => {
    const api = API(endpoint, signer(okenClientId, privateKey))
    return {
      wallets: wallet(api),
      contracts: contracts(api, network),
      transactions: transactions(api),
      errors: errors
    }
  },
  networks,
  endpoints
}
