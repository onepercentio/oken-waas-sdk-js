import axios from 'axios'

import handler from './errorHandler'

const { fromAxios } = handler

const api = axios.create({})

export default (endpoint, signer) => {
  api.defaults.baseURL = endpoint

  return {
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
    }
  }
}
