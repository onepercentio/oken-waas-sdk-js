const fs = require('fs')
const _ = require('lodash')

const abiMap = {
	'nft': 'WithdrawableControlledNFTFactory',
	'nft-control': 'ControlledNFTFactory'
}

const contract = (contractId, api) => {
	const abi = JSON.parse(fs.readFileSync(`src/abis/${abiMap[contractId]}.json`)).abi
	return _(abi)
		.keyBy('name')
		.mapValues(v => ({ type: v.type, mutability: v.stateMutability }))
		.pickBy(v => v.type === 'function')
		.mapValues((v, method) => v.mutability === 'view' ?
			(payload, options) =>
				api.get(`/contracts/${contractId}/${method}`, payload) :
			(payload, options) =>
				api.post(`contracts/${contractId}/${method}`, {
					params: payload,
				})
		)
		.value()
}

module.exports = api => ({
	nft: () => contract('nft', api),
	// erc20: contract('erc20')
})