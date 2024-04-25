import fs  from 'fs'
import path  from 'path'
import WaaS  from '../dist/index.js'

const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf-8')
const okenClientId = 'ldWJ2JmZqaRAVPwxxV7u'
// const okenClientId = fs.readFileSync(path.join(__dirname, 'okenClientId.key'), 'utf-8')

const { wallets, errors } = WaaS.connect({
  network: WaaS.networks.ETHEREUM.SEPOLIA,
  endpoint: WaaS.endpoints.DEVELOPMENT,
  okenClientId,
  privateKey,
})

const userId = Date.now().toString();

const manageWallets = async () => {
  try {
    const allWallets = await wallets.get()
    console.log('Wallets created in your vault:')
    console.log(allWallets)

    console.log('Creating a new VAULT wallet')
    const newWallet = await wallets.createVaultAccount(userId)
    console.log('Wallet created:', newWallet)

    console.log('Checking user wallet')
    const userWallet = await wallets.get(userId)
    console.log('User wallet:', userWallet)

    console.log('Creating a new SMART_ACCOUNT wallet')
    const sa = await wallets.createSmartAccount(userId + 'a', 'polygon')
    console.log('Wallet created:', sa)

    console.log('Checking user wallet')
    const saWallet = await wallets.get(userId + 'a')
    console.log('User wallet:', saWallet)

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