module.exports = (api, network) => {
  return {
    create: referenceId => api.post('/wallets', { referenceId }),
    get: referenceId => referenceId ? 
      (api.get(`/wallets/${referenceId}`)) : 
      (api.get('/wallets')),
    signTypedMessage: (typedData, message, signerWallet, contractAddress) => {
      const payload = {
        message,
        network,
        contractAddress,
        typedData,
        signerWallet
      }
      return api.post('/wallets/typed-message', payload)
    }
  }
}