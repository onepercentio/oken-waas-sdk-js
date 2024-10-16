import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export type Message = {
  [key: string]: unknown
  signerType?: 'VAULT' | 'SMART_ACCOUNT',
  from?: string
}

export type SignedMessage = Message & {
  timestamp: string,
  signature: string
}

export type SignerOptions = {
  signerType: 'VAULT' | 'SMART_ACCOUNT',
  from: string
}

export default (okenClientId: string, privateKey: string, options?: SignerOptions) => ({
  signJWT: () => jwt.sign({ 'oken-client-id': okenClientId }, privateKey, { algorithm: 'RS256', expiresIn: '21600s' }),
  signMsg: (payload: Message): SignedMessage => {
    const payloadWithTimestamp = {
      ...payload,
      timestamp: new Date().toISOString()
    }

    if (options?.signerType === 'SMART_ACCOUNT') {
      if (!options.from) {
        throw new Error('\'from\' address if required for SMART_ACCOUNT signer')
      }

      payloadWithTimestamp.signerType = options.signerType
      payloadWithTimestamp.from = options.from
    }

    const msg = JSON.stringify(payloadWithTimestamp)
    const msgHash = crypto.createHash('sha256').update(msg).digest('base64')

    const signer = crypto.createSign('sha256')
    signer.update(msgHash)

    const signature = signer.sign(privateKey, 'base64')

    const signedPayload = { ...payloadWithTimestamp, signature }

    return signedPayload
  }
})