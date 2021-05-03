module.exports = (api) => {
	return {
		create: async referenceId => ( await api.post('/wallets', { referenceId }) ).data,
		get: async referenceId => referenceId ? 
			(await api.get(`/wallets/${referenceId}`)).data : 
			(await api.get('/wallets')).data
	}
}