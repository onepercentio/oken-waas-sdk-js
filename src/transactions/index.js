module.exports = (api) => {
	return {
		get: async id => id ? 
			(await api.get(`/transactions/${id}`)) : 
			(await api.get('/transactions')),
	}
}