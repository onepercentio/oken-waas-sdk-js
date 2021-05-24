const fs = require('fs')
const { add } = require('lodash')
const _ = require('lodash')
const path = require('path')

const abiMap = {
  'nft': 'WithdrawableControlledNFTFactory',
  'controlled-token': 'ControlledNFTFactory',
  'TropixRouter': 'TropixRouter',
  'TropixWalletETH': 'TropixWalletETH'
}

const typesAndMutability = v => ({ type: v.type, mutability: v.stateMutability })

const typeFunctions = v => v.type === 'function'

const buildApiUrls = (contractBaseUrl, api) => (v, method) => v.mutability === 'view'
  ? (payload) => api.get(`${contractBaseUrl}/${method}`, payload)
  : (payload) => api.post(`${contractBaseUrl}/${method}`, { params: payload })

const contract = (contractId, api, network, address) => {

  const pathContractFile = path.resolve(__dirname, '..', `abis/${abiMap[contractId]}.json`)
  const contractFile = fs.readFileSync(pathContractFile)
  const { abi } = JSON.parse(contractFile)
  
  const contractApiServices = buildApiUrls(`/${network}/${contractId}/${address}`, api)

  return _(abi)
    .keyBy('name')
    .mapValues(typesAndMutability)
    .pickBy(typeFunctions)
    .mapValues(contractApiServices)
    .value()
}
  

module.exports = (api, network) => ({
  nft: ({ address }) => contract('nft', api, network, address),
  controlledToken: ({ address }) => contract('controlled-token', api, network, address),
  tropixRouter: ({ address }) => contract('TropixRouter', api, network, address),
  tropixWalletETH: ({ address }) => contract('TropixWalletETH', api, network, address),
})
