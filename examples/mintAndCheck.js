const fs = require('fs')
const path = require('path')
const WaaS = require('../index.js')

const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf-8')
const okenClientId = fs.readFileSync(path.join(__dirname, 'okenClientId.key'), 'utf-8')

const { networks, endpoints } = WaaS

const { contracts, transactions, errors } = WaaS.connect({
  network: networks.ETHEREUM.KOVAN,
  endpoint: endpoints.STAGING,
  okenClientId,
  privateKey,
})

const contract = contracts.nft({
  address: '0x1c0D4527d59fd11d4d36c7E00aE544cf7C26c073'
})

const mintIt = async (id) => contract.mint({
  to: '0xb9f4b9a007dea047caf882d201d4d950050c21aa',
  id,
  amount: 1,
  data: '0x0'
})

const id = () => Math.trunc(Math.random() * 100000);

const mint = async () => {
  const checkInterval = 3000 // 3s, but ideally you would check only when a new block is found, witch on ethereum is ~12s
  try {
    console.log('Scheduling transaction...')

    const { transactionId } = await mintIt(id())

    console.log(`Transaction '${transactionId}' scheduled`)
    console.log(`Awaiting to check...`)

    const checker = setInterval(async () => {
      console.log(`Checking '${transactionId}'...`)
      const tx = await transactions.get(transactionId)
      console.log(tx)

      if (tx.status === 'MINED') {
        console.log('Transaction successfully mined!')
        clearInterval(checker)
      }

      if (tx.status === 'REVERTED') {
        console.log('Transaction was reverted, something went wrong!')
        clearInterval(checker)
      }

    }, checkInterval)
  } catch (error) {
    console.log(error)
    if (error instanceof errors.UNAUTHORIZED) {
      console.error('A known error type', error)
    } else {
      console.error(error.message, error.info)
    }
  }
}

mint()