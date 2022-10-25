const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const abiMap = {
  'nft': 'OkenNFT',
  'controlledToken': 'ControlledToken',
  'tropixRouter': 'TropixRouter',
  'tropixWalletETH': 'TropixWalletETH',
  'RarumNFT': 'RarumNFT',
  'RarumNFTAuction': 'RarumNFTAuction',
  'RarumToken': 'RarumToken',
  'RarumSales': 'RarumSales',
  'lootbox': 'Lootbox',
  'TalentContracts': 'TalentContracts',
  'kyc': 'KYC',
  'CarbonChain': 'CarbonChain',
  'LootBoxNFT': 'LootBoxNFT',
  'LootBoxBatchMint': 'LootBoxBatchMint',
  'ERC20Payout': 'ERC20Payout',
  'registry': 'OneSignRegistry'
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
  rarumNFT: ({ address }) => contract('RarumNFT', api, network, address),
  rarumNFTAuction: ({ address }) => contract('RarumNFTAuction', api, network, address),
  rarumToken: ({ address }) => contract('RarumToken', api, network, address),
  rarumSales: ({ address }) => contract('RarumSales', api, network, address),
  controlledToken: ({ address }) => contract('controlledToken', api, network, address),
  lootbox: ({ address }) => contract('lootbox', api, network, address),
  lootboxBatchMint: ({ address }) => contract('LootBoxBatchMint', api, network, address),
  lootboxNFT: ({ address }) => contract('LootBoxNFT', api, network, address),
  talentContracts: ({ address }) => contract('TalentContracts', api, network, address),
  carbonChain: ({ address }) => contract('CarbonChain', api, network, address),
  kyc: ({ address }) => contract('kyc', api, network, address),
  registry: ({ address }) => contract('registry', api, network, address),
  ERC20Payout: ({ address }) => contract('ERC20Payout', api, network, address),
})
