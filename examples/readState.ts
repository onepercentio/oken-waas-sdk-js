import fs from 'fs'
import path from 'path'
import WaaS from '../'

const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf-8')
const okenClientId = fs.readFileSync(path.join(__dirname, 'okenClientId.key'), 'utf-8')
// const alchemyKey = fs.readFileSync(path.join(__dirname, 'alchemy.key'), 'utf-8')

const { networks, endpoints } = WaaS

const { contracts } = WaaS.connect({
  network: networks.POLYGON.MUMBAI,
  endpoint: endpoints.STAGING,
  okenClientId,
  privateKey,
  // alchemyKey
})

const read = async () => {
  const nft = contracts.rarumNFT({ address: '0x3db9dc7974226400e1c056f6ec9a4b1892042f49' })
  console.log(
    (
      await nft.balanceOf({
        account: '0x965132E84D8166B1485dD6c86e1E5FE93f121243',
        id: '467742649'
      })
    ).toString()
  )
}

read()