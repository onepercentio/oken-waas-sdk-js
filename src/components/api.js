const axios = require('axios')

module.exports = (endpoint, signer) => {
  axios.defaults.baseURL = endpoint
  return {
    post: async (route, payload = {}) => {
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
    },
    get: async (route, payload) => {
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
    }
  }
}