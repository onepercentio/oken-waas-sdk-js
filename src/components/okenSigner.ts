import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export type Message = {
  [key: string]: unknown,
}

export type SignedMessage = Message & {
  timestamp: string,
  signature: string
}

export default (okenClientId: string, privateKey: string) => ({
  signJWT: () => jwt.sign({ 'oken-client-id': okenClientId }, privateKey, { algorithm: 'RS256', expiresIn: '21600s' }),
  signMsg: (payload: Message): SignedMessage => {
    const payloadWithTimestamp = {
      ...payload,
      timestamp: new Date().toISOString()
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