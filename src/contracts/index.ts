
import { API } from '../components/api'
import {contract} from './helpers'
import {
 BatchOperation,
ControlledToken,
Custody,
ERC20Payout,
KYC,
KonaNetspaces,
LootBoxBatchMint,
LootBoxNFT,
Lootbox,
OkenNFT,
RarumCollectibles,
RarumLoyalty,
RarumNFT,
RarumNFTAuction,
RarumSales,
RarumToken,
TalentContracts,
TropixRouter,
TropixWalletETH
} from '/home/highlander/projects/oken-waas-sdk-js/oken-types'

export default (api: API, network: string) => ({
  batchOperation: ({ address }: { address: string }): BatchOperation => contract('BatchOperation', api, network, address),
  controlledToken: ({ address }: { address: string }): ControlledToken => contract('ControlledToken', api, network, address),
  custody: ({ address }: { address: string }): Custody => contract('Custody', api, network, address),
  eRC20Payout: ({ address }: { address: string }): ERC20Payout => contract('ERC20Payout', api, network, address),
  kYC: ({ address }: { address: string }): KYC => contract('KYC', api, network, address),
  konaNetspaces: ({ address }: { address: string }): KonaNetspaces => contract('KonaNetspaces', api, network, address),
  lootBoxBatchMint: ({ address }: { address: string }): LootBoxBatchMint => contract('LootBoxBatchMint', api, network, address),
  lootBoxNFT: ({ address }: { address: string }): LootBoxNFT => contract('LootBoxNFT', api, network, address),
  lootbox: ({ address }: { address: string }): Lootbox => contract('Lootbox', api, network, address),
  okenNFT: ({ address }: { address: string }): OkenNFT => contract('OkenNFT', api, network, address),
  rarumCollectibles: ({ address }: { address: string }): RarumCollectibles => contract('RarumCollectibles', api, network, address),
  rarumLoyalty: ({ address }: { address: string }): RarumLoyalty => contract('RarumLoyalty', api, network, address),
  rarumNFT: ({ address }: { address: string }): RarumNFT => contract('RarumNFT', api, network, address),
  rarumNFTAuction: ({ address }: { address: string }): RarumNFTAuction => contract('RarumNFTAuction', api, network, address),
  rarumSales: ({ address }: { address: string }): RarumSales => contract('RarumSales', api, network, address),
  rarumToken: ({ address }: { address: string }): RarumToken => contract('RarumToken', api, network, address),
  talentContracts: ({ address }: { address: string }): TalentContracts => contract('TalentContracts', api, network, address),
  tropixRouter: ({ address }: { address: string }): TropixRouter => contract('TropixRouter', api, network, address),
  tropixWalletETH: ({ address }: { address: string }): TropixWalletETH => contract('TropixWalletETH', api, network, address)
})