import { it, expect, mock, afterAll, beforeAll, describe } from 'bun:test';
import { generateKeyPairSync } from 'crypto'

const { privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
})

describe('Testing transactions', () => {

  const okenClientId = 'clientId'
  let postSpy
  let WaaS

  beforeAll(async () => {
    postSpy = mock().mockResolvedValue({
      data: {
        transactionId: '0x000'
      }
    })

    mock.module('axios', () => ({
      default: ({
        create: () => ({
          post: postSpy,
          defaults: {}
        })
      })
    }))

    const WaaSModule = await import('../index')
    WaaS = WaaSModule.default
  })

  afterAll(() => {
    mock.restore()
  })

  it.only('should allow custom abis', async () => {
    const { networks, endpoints } = WaaS

    const { contracts } = WaaS.connect({
      network: networks.ETHEREUM.SEPOLIA,
      endpoint: endpoints.STAGING,
      okenClientId,
      privateKey,
      signerOptions: {
        from: '0xfrom',
        signerType: 'SMART_ACCOUNT'
      }
    })

    const { transactionId } = await contracts.rarumDigitalTwin({ address: '0xsomething' }).mint({
      to: '0xsomeone',
      uri: 'somCID'
    })

    expect(transactionId).toBe('0x000')

    expect(postSpy).toHaveBeenCalledTimes(1)
    expect(postSpy.mock.calls[0][0]).toBe('/transactions')

    const { signature, timestamp, ...payload } = postSpy.mock.calls[0][1]

    expect(signature).toBeDefined()
    expect(timestamp).toBeDefined()

    expect(payload).toEqual({
      contractAddress: "0xsomething",
      contractId: "RarumDigitalTwin",
      method: "mint",
      network: "sepolia",
      signerType: 'SMART_ACCOUNT',
      from: '0xfrom',
      params: {
        to: "0xsomeone",
        uri: "somCID",
      },
    })

  })

})