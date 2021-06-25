const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const abiMap = {
  'nft': 'OkenNFT',
  'controlledToken': 'ControlledToken',
  'tropixRouter': 'TropixRouter',
  'tropixWalletETH': 'TropixWalletETH'
}

const typesAndMutability = v => ({ type: v.type, mutability: v.stateMutability })

const typeFunctions = v => v.type === 'function'

const buildApiUrls = (baseParams, api) => (v, method) => v.mutability === 'view'
  ? (params) => api.get('/contracts/state', { ...baseParams, method, params })
  : (payload) => api.post('/transactions', { ...baseParams, method, params: payload })

const contract = (contractId, api, network, contractAddress) => {
  const abiPath = path.join(__dirname, '..', `abis/${abiMap[contractId]}.json`)
  const abi = JSON.parse(fs.readFileSync(abiPath))

  const contractApiServices = buildApiUrls({ network, contractId, contractAddress }, api)

  return _(abi)
    .keyBy('name')
    .mapValues(typesAndMutability)
    .pickBy(typeFunctions)
    .mapValues(contractApiServices)
    .value()
}

module.exports = (api, network) => ({
  nft: ({ address }) => contract('nft', api, network, address),
  controlledToken: ({ address }) => contract('controlledToken', api, network, address),
  tropixRouter: ({ address }) => contract('tropixRouter', api, network, address),
  tropixWalletETH: ({ address }) => contract('tropixWalletETH', api, network, address),
})
