const axios = require('axios')
const { fromAxios } = require('./errorHandler')

module.exports = (endpoint, signer) => {
  axios.defaults.baseURL = endpoint
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