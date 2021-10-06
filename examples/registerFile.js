const fs = require('fs')
const path = require('path')
const WaaS = require('../index.js')

const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf-8')
const okenClientId = fs.readFileSync(path.join(__dirname, 'okenClientId.key'), 'utf-8')

const { networks, endpoints } = WaaS

const { contracts, transactions, errors } = WaaS.connect({
  network: networks.ETHEREUM.ROPSTEN,
  endpoint: endpoints.STAGING,
  okenClientId,
  privateKey,
})

const contract = contracts.registry({
  address: '0x313ba00ade5a7d19cd109d745a74c802953c4b47'
})

const hashData = '133351546614bfadfa68bb66c22a06265972b02791e4ac545ad900f20fe1a796' //ABC123

const register = async () => {
  const checkInterval = 3000 // 3s, but ideally you would check only when a new block is found, witch on ethereum is ~12s
  try {
    console.log('Scheduling transaction...')
    const { transactionId } = await contract.register({
        _hashData: hashData
    })

    console.log('Transaction ID: ', transactionId)
    
  } catch (error) {
    console.log(error)
    if (error instanceof errors.UNAUTHORIZED) {
      console.error('A known error type', error)
    } else {
      console.error(error.message, error.info)
    }
  }
}

register()