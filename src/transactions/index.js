const parseEvents = events => events
  ? { events: events.join(',') }
  : null

module.exports = (api) => {
  return {
    get: (id, events) => id ? 
      api.get(`/transactions/${id}`, parseEvents(events)) : 
      api.get('/transactions')
  }
}