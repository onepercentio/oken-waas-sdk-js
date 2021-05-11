const fs = require('fs')
const path = require('path')
const WaaS = require('../index.js')

const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf-8')
const okenClientId = fs.readFileSync(path.join(__dirname, 'okenClientId.key'), 'utf-8')

const { contracts, wallets, errors } = WaaS.connect({
	network: WaaS.networks.DEVELOPMENT,
	okenClientId,
	privateKey
})

const contract = contracts.nft()
const userId = Date.now().toString()

; (async () => {

	try {
		// await wallets.create('abc123')
		const allAccounts = await wallets.get()
		// const userAccount = await waas.wallet.get(userId)

		console.log(allAccounts)
		// console.log(userAccount)

		const mint = await contract.mint({
			to: '0xb9f4b9a007dea047caf882d201d4d950050c21aa',
			id: 1,
			amount: 1,
			data: 'test script'
		})

		console.log("🚀 ~ file: test.js ~ line 107 ~ waas.wallet.create ~ mint", mint)

		const balance = await contract.balanceOf({
			account: '0xb9f4b9a007dea047caf882d201d4d950050c21aa',
			id: 1
		})

		console.log("🚀 ~ file: test.js ~ line 114 ~ waas.wallet.create ~ balance", balance)

	} catch (error) {
		if (error instanceof errors.UNAUTHORIZED) {
			console.error('A known error type', error)
		} else {
			console.error(error.message, error.info)
		}
	}

})()