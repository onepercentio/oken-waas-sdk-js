const axios = require('axios')

module.exports = (endpoint, signer) => {
	axios.defaults.baseURL = endpoint
	return {
		post: (route, payload = {}) => axios.post(route, signer.signMsg(payload), { headers: { authorization: `Bearer ${signer.signJWT()}` } }),
		get: (route, payload) => axios.get(route, { params: payload, headers: { authorization: `Bearer ${signer.signJWT()}` } }),
	}
}