const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const WaaS = require('../index.js')

const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf-8')
const okenClientId = fs.readFileSync(path.join(__dirname, 'okenClientId.key'), 'utf-8')

const { contracts, wallets, errors } = WaaS.connect({
  network: WaaS.networks.POLYGON.MUMBAI,
  endpoint: WaaS.endpoints.DEVELOPMENT,
  okenClientId,
  privateKey,
})

const contract = contracts.rarumNFT({
  address: '0xbF911f36177554418853C016020Cf68b351814d7'
})

const typedData = WaaS.typedData.ERC1155_PERMIT

const manageWallets = async () => {
  const now = new Date()
  try {
    const message = {
      owner: '0x2ed5fdf0425da68e842c98f7b15883e89ea6f1fd',
      operator: '0xE42DD19efaCaF0339A5634Dcdf563754E7d98743',
      approved: true,
      nonce: `0x${crypto.randomBytes(32).toString('hex')}`,
      deadline: now.setHours(now.getHours() + 4)
    }
    const contractAddress = '0xbF911f36177554418853C016020Cf68b351814d7'
    const signerWallet = '0x2ed5fdf0425da68e842c98f7b15883e89ea6f1fd'
    const params = await wallets.signTypedMessage(typedData, message, signerWallet, contractAddress)
    const { transactionId } = await contract.permit(params)
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