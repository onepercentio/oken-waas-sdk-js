const fs = require('fs')
const path = require('path')
const WaaS = require('../index.js')

const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf-8')
const okenClientId = fs.readFileSync(path.join(__dirname, 'okenClientId.key'), 'utf-8')

const { contracts, wallets, errors } = WaaS.connect({
  network: WaaS.networks.ETHEREUM.KOVAN,
  endpoint: WaaS.endpoints.STAGING,
  okenClientId,
  privateKey,
})

const contract = contracts.nft({
  address: '0x1c0D4527d59fd11d4d36c7E00aE544cf7C26c073'
})

const userId = Date.now().toString();

const manageWallets = async () => {
  try {
    const allWallets = await wallets.get()
    console.log('Wallets created in your vault:')
    console.log(allWallets)

    console.log('Creating a new user wallet')
    const newWallet = await wallets.create(userId)
    console.log('Wallet created:', newWallet)

    console.log('Checking user wallet')
    const userWallet = await wallets.get(userId)
    console.log('User wallet:', userWallet)

    console.log('Checking user balance')
    const balance = await contract.balanceOf({
      account: userWallet.address,
      id: 1
    })
    console.log(`User balance is ${balance}`)
  } catch (error) {
    console.log(error)
    if (error instanceof errors.UNAUTHORIZED) {
      console.error('A known error type', error)
    } else {
      console.error(error.message, error.info)
    }
  }
}

manageWallets()