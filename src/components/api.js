const { fromAxios } = require('./errorHandler')
const axios = require('axios').default

const api = axios.create({})

module.exports = (endpoint, signer) => {
  api.defaults.baseURL = endpoint

  return {
    post: async (route, payload = {}) => {
      try {
        const { data } = await axios.post(
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
    get: async (route, payload) => {
      try {
        const { data } = await axios.get(
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
