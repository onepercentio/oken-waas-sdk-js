module.exports = (api) => {
  return {
    create: referenceId => api.post('/wallets', { referenceId }),
    get: referenceId => referenceId ? 
      (api.get(`/wallets/${referenceId}`)) : 
      (api.get('/wallets'))
  }
}