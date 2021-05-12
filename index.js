const wallet = require('./src/wallets')
const contracts = require('./src/contracts')
const endpoints = require('./src/config/endpoints')
const networks = require('./src/config/networks')
const okenSigner = require('./src/components/okenSigner')
const API = require('./src/components/api')

module.exports = {
	connect: ({ endpoint, network, address, okenClientId, privateKey }) => {
		const signer = okenSigner(okenClientId, privateKey)
		const api = API(endpoint, signer)
		return {
			wallets: wallet(api),
			contracts: contracts(api, network, address),
		}
	},
	networks,
	endpoints
}
