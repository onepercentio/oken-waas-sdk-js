import fs from 'fs'
import path from 'path'
import { values, startCase, toLower } from 'lodash'

const typesAndMutability = v => ({ type: v.type, mutability: v.stateMutability })
const typeFunctions = v => v.type === 'function'

const buildApiUrls = (baseParams, api) => (v, method) => v.mutability === 'view'
  ? (params) => api.get('/contracts/state', { ...baseParams, method, params })
  : (payload) => api.post('/transactions', { ...baseParams, method, params: payload })

export const contract = (contractId: string, api, network: string, contractAddress: string) => {
  const abiPath = path.join(__dirname, '..', `abis/${contractId}.json`)
  const abi = JSON.parse(fs.readFileSync(abiPath).toString())

  const okenContractId = contractId.startsWith('ERC') ?
    contractId :
    startCase(toLower(contractId))

  const contractApiServices = buildApiUrls({ network, contractId: okenContractId, contractAddress }, api)

  return values(abi)
    .keyBy('name')
    .mapValues(typesAndMutability)
    .pickBy(typeFunctions)
    .mapValues(contractApiServices)
    .value()
}