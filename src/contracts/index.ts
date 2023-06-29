import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { RarumNFT } from '../../types/oken-contracts/RarumNFT'
import { RarumCollectibles } from '../../types/oken-contracts/RarumCollectibles'
import { RarumNFTAuction } from '../../types/oken-contracts/RarumNFTAuction'
import { RarumToken } from '../../types/oken-contracts/RarumToken'
import { RarumSales } from '../../types/oken-contracts/RarumSales'
import { RarumLoyalty } from '../../types/oken-contracts/RarumLoyalty'
import { ControlledToken } from '../../types/oken-contracts/ControlledToken'
import { LootBoxBatchMint } from '../../types/oken-contracts/LootBoxBatchMint'
import { Lootbox } from '../../types/oken-contracts/Lootbox'
import { LootBoxNFT } from '../../types/oken-contracts/LootBoxNFT'
import { TalentContracts } from '../../types/oken-contracts/TalentContracts'
import { CarbonChain } from '../../types/oken-contracts/CarbonChain'
import { BatchOperation } from '../../types/oken-contracts/BatchOperation'
import { KYC } from '../../types/oken-contracts/KYC'
import { OneSignRegistry } from '../../types/oken-contracts/OneSignRegistry'
import { ERC20Payout } from '../../types/oken-contracts/ERC20Payout'
import { KonaNetspaces } from '../../types/oken-contracts/KonaNetspaces'
import { OkenNFT } from '../../types/oken-contracts/OkenNFT'

const abiMap = {
  'nft': 'OkenNFT',
  'controlledToken': 'ControlledToken',
  'tropixRouter': 'TropixRouter',
  'tropixWalletETH': 'TropixWalletETH',
  'RarumNFT': 'RarumNFT',
  'RarumCollectibles': 'RarumCollectibles',
  'RarumNFTAuction': 'RarumNFTAuction',
  'RarumToken': 'RarumToken',
  'RarumSales': 'RarumSales',
  'RarumLoyalty': 'RarumLoyalty',
  'lootbox': 'Lootbox',
  'TalentContracts': 'TalentContracts',
  'kyc': 'KYC',
  'CarbonChain': 'CarbonChain',
  'LootBoxNFT': 'LootBoxNFT',
  'LootBoxBatchMint': 'LootBoxBatchMint',
  'ERC20Payout': 'ERC20Payout',
  'registry': 'OneSignRegistry',
  'BatchOperation': 'BatchOperation',
  'KonaNetspaces': 'KonaNetspaces'
}

const typesAndMutability = v => ({ type: v.type, mutability: v.stateMutability })

const typeFunctions = v => v.type === 'function'

const buildApiUrls = (baseParams, api) => (v, method) => v.mutability === 'view'
  ? (params) => api.get('/contracts/state', { ...baseParams, method, params })
  : (payload) => api.post('/transactions', { ...baseParams, method, params: payload })

const contract = (contractId, api, network, contractAddress) => {
  const abiPath = path.join(__dirname, '..', `abis/${abiMap[contractId]}.json`)
  const abi = JSON.parse(fs.readFileSync(abiPath).toString())

  const contractApiServices = buildApiUrls({ network, contractId, contractAddress }, api)

  return _(abi)
    .keyBy('name')
    .mapValues(typesAndMutability)
    .pickBy(typeFunctions)
    .mapValues(contractApiServices)
    .value()
}

export default (api, network: string) => ({
  nft: ({ address }: { address: string }): OkenNFT => contract('nft', api, network, address),
  rarumNFT: ({ address }: { address: string }): RarumNFT => contract('RarumNFT', api, network, address),
  rarumCollectibles: ({ address }: { address: string }): RarumCollectibles => contract('RarumCollectibles', api, network, address),
  rarumNFTAuction: ({ address }: { address: string }): RarumNFTAuction => contract('RarumNFTAuction', api, network, address),
  rarumToken: ({ address }: { address: string }): RarumToken => contract('RarumToken', api, network, address),
  rarumSales: ({ address }: { address: string }): RarumSales => contract('RarumSales', api, network, address),
  rarumLoyalty: ({ address }: { address: string }): RarumLoyalty => contract('RarumLoyalty', api, network, address),
  controlledToken: ({ address }: { address: string }): ControlledToken => contract('controlledToken', api, network, address),
  lootbox: ({ address }: { address: string }): Lootbox => contract('lootbox', api, network, address),
  lootboxBatchMint: ({ address }: { address: string }): LootBoxBatchMint => contract('LootBoxBatchMint', api, network, address),
  lootboxNFT: ({ address }: { address: string }): LootBoxNFT => contract('LootBoxNFT', api, network, address),
  talentContracts: ({ address }: { address: string }): TalentContracts => contract('TalentContracts', api, network, address),
  carbonChain: ({ address }: { address: string }): CarbonChain => contract('CarbonChain', api, network, address),
  batchOperation: ({ address }: { address: string }): BatchOperation => contract('BatchOperation', api, network, address),
  kyc: ({ address }: { address: string }): KYC => contract('kyc', api, network, address),
  registry: ({ address }: { address: string }): OneSignRegistry => contract('registry', api, network, address),
  ERC20Payout: ({ address }: { address: string }): ERC20Payout => contract('ERC20Payout', api, network, address),
  konaNetspaces: ({ address }: { address: string }): KonaNetspaces => contract('KonaNetspaces', api, network, address),
})
