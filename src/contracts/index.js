const fs = require('fs')
const _ = require('lodash')

const abiMap = {
  'nft': 'WithdrawableControlledNFTFactory',
  'nft-control': 'ControlledNFTFactory'
}

const typesAndMutability = v => ({ type: v.type, mutability: v.stateMutability })

const typeFunctions = v => v.type === 'function'

const buildApiUrls = (contractBaseUrl, api) => (v, method) => v.mutability === 'view'
  ? (payload) => api.get(`${contractBaseUrl}/${method}`, payload)
  : (payload) => api.post(`${contractBaseUrl}/${method}`, { params: payload })

const contract = (contractId, api, network, address) => {
  const { abi } = JSON.parse(fs.readFileSync(`src/abis/${abiMap[contractId]}.json`))

  const contractApiServices = buildApiUrls(`/${network}/${contractId}/${address}`, api)

  return _(abi)
    .keyBy('name')
    .mapValues(typesAndMutability)
    .pickBy(typeFunctions)
    .mapValues(contractApiServices)
    .value()
}

module.exports = (api, network, address) => ({
  nft: () => contract('nft', api, network, address),
  // erc20: contract('erc20')
})
