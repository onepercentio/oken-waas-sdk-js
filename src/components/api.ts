import axios from 'axios'

import { AlchemyProvider, Contract } from 'ethers'

import { alchemyNetworkMap  } from '../config/networks';
import handler from './errorHandler'
import { ABI } from './ABI';
import { values } from 'lodash'

export type TxID = { transactionId: string };

const { fromAxios } = handler

const api = axios.create({})

export type AlchemyConfig = {
  alchemyKey: string,
  network: string
}

export type API = {
  alchemyEnabled: boolean;
  post: (route: string, payload?: any) => Promise<TxID>;
  get: (route: string, payload: any) => Promise<any>;
  call: (address: string, abi: ABI, method: string, params: any) => Promise<any>;
}

export default (endpoint, signer, alchemyConfig?: AlchemyConfig): API => {
  api.defaults.baseURL = endpoint

  let provider = alchemyConfig && new AlchemyProvider(alchemyNetworkMap[alchemyConfig.network], alchemyConfig.alchemyKey)

  return {
    alchemyEnabled: !!provider,
    post: async (route: string, payload: any = {}) => {
      try {
        const { data } = await api.post(
          route,
          signer.signMsg(payload),
          {
            headers: {
              authorization: `Bearer ${signer.signJWT()}`
            }
          }
        )

        return data
      } catch(error) {
        fromAxios(error)
      }
    },
    get: async (route: string, payload: any) => {
      try {
        const { data } = await api.get(
          route,
          {
            params: payload,
            headers: {
              authorization: `Bearer ${signer.signJWT()}`
            }
          }
        )

        return data
      } catch(error) {
        fromAxios(error)
      }
    },
    call: async (address: string, abi: ABI, method: string, params: any) => {
      if (!provider) throw new Error('Missing alchemy key')

      const instance = new Contract(address.trim(), abi, provider)

      return instance[method](...values(params))
    }
  }
}

