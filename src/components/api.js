const axios = require('axios').default

const api = axios.create({})

module.exports = (endpoint, signer) => {

  api.defaults.baseURL = endpoint
  api.defaults.headers = {
    authorization: `Bearer ${signer.signJWT()}`
  }

  return {
    post: async (route, payload = {}) => {
      const { data } = await api.post(route, signer.signMsg(payload))
      return data
    },
    get: async (route, payload) => {
      const { data } = await api.get(route, { params: payload })
      return data
    }
  }
}
