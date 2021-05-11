const jwt = require('jsonwebtoken')
const wallet = require('./src/wallets')
const contracts = require('./src/contracts')
const endpoints = require('./src/config/endpoints')
const okenSigner = require('./src/components/okenSigner')
const API = require('./src/components/api')
const errors = require('./src/components/errorHandler')

module.exports = {
	connect: ({ network, okenClientId, privateKey }) => {
		const signer = okenSigner(okenClientId, privateKey)
		const api = API(network, signer)
		return {
			wallets: wallet(api),
			contracts: contracts(api),
			errors: errors
		}
	},
	networks: endpoints
}
