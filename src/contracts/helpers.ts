import fs from 'fs'
import path from 'path'
import _ , { omit } from 'lodash'
import { API } from '../components/api'
import { ABI } from '../components/ABI'

type BaseParams = {
  network: string,
  contractId: string,
  contractAddress: string,
  abi: ABI
}

const typesAndMutability = v => ({ type: v.type, mutability: v.stateMutability })
const typeFunctions = v => v.type === 'function'

const buildApiUrls = (baseParams: BaseParams, api: API) => (v, method) => {
  if (v.mutability === 'view') {
    return api.alchemyEnabled ?
      (params) => api.call(baseParams.contractAddress, baseParams.abi, method, params) :
      (params) => api.get('/contracts/state', { ...omit(baseParams, 'abi'), method, params })
  }
  return (payload) => api.post('/transactions', { ...baseParams, method, params: payload })
}

export const contract = (contractId: string, api: API, network: string, contractAddress: string) => {
  const abiPath = path.join(__dirname, '..', `abis/${contractId}.json`)
  const abi = JSON.parse(fs.readFileSync(abiPath).toString())

  const contractApiServices = buildApiUrls({ network, contractId, contractAddress, abi }, api)

  return _(abi)
    .keyBy('name')
    .mapValues(typesAndMutability)
    .pickBy(typeFunctions)
    .mapValues(contractApiServices)
    .value()
}