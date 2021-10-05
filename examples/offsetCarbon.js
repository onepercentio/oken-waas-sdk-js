const fs = require('fs')
const path = require('path')
const WaaS = require('../index.js')

const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf-8')
const okenClientId = fs.readFileSync(path.join(__dirname, 'okenClientId.key'), 'utf-8')

const { networks, endpoints } = WaaS

const { contracts, transactions, errors } = WaaS.connect({
  network: networks.CELO.ALFAJORES,
  endpoint: endpoints.STAGING,
  okenClientId,
  privateKey,
})

const cc = contracts.carbonChain({
  address: '0xF4Db08607786253BCE3cc55Ad504E34335655337'
})

const mco2 = contracts.controlledToken({
  address: '0xe1aef5200e6a38ea69ad544c479bd1a176c8a510'
})

const startChecker = async transactionId => {
  const checkInterval = 3000 // 3s, but ideally you would use a webhook to be notified when the transaction is mined
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
}


const setup = async () => {
  try {
    console.log('Scheduling approval...')

    const { transactionId } = await mco2.approve({
      _spender: '0xF4Db08607786253BCE3cc55Ad504E34335655337',
      _value: '1000000000000000000000000000000'
    })

    console.log(`Transaction '${transactionId}' scheduled`)
    console.log(`Awaiting to check...`)

    await startChecker(transactionId)
  } catch (error) {
    console.log(error)
    if (error instanceof errors.UNAUTHORIZED) {
      console.error('A known error type', error)
    } else {
      console.error(error.message, error.info)
    }
  }
}

const offset = async () => {
  try {
    console.log('Scheduling offset...')

    const { transactionId } = await cc.offsetCarbon({
      _transactionInfo: 'my_transaction_id',
      _carbonTon: '1000000000000000',
      _onBehalfOf: 'my customer'
    })

    console.log(`Transaction '${transactionId}' scheduled`)
    console.log(`Awaiting to check...`)

    await startChecker(transactionId)
  } catch (error) {
    console.log(error)
    if (error instanceof errors.UNAUTHORIZED) {
      console.error('A known error type', error)
    } else {
      console.error(error.message, error.info)
    }
  }
}

setup()

offset()