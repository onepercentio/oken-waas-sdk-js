const AxiosError = require('axios-error')

class DomainError extends Error {
  public info
  constructor(message, info?) {
    super()
    this.message = message
    this.info = info
  }
}

class UNAUTHORIZED extends DomainError { }

class ALREADY_CREATED extends DomainError { }

class SERVER_ERROR extends DomainError { }

class INTEGRATION_ERROR extends DomainError { }

class VALIDATION_ERROR extends DomainError { }

class REQUEST_ERROR extends DomainError { }

const fromAxios = error => {
  if (!error.isAxiosError) throw new SERVER_ERROR(error)
  if (!error.response && error.request) throw new REQUEST_ERROR(new AxiosError(error))
  if (!error.response) throw new SERVER_ERROR(error)

  const { response: { status, data } } = error

  switch (status) {
    case 400:
    case 429:
    case 422:
      throw new VALIDATION_ERROR(data.message || data, data.info)
    case 401:
      throw new UNAUTHORIZED(data.message || data, data.info)
    case 409:
      throw new ALREADY_CREATED(data.message || data, data.info)
    case 500:
      throw new INTEGRATION_ERROR(data.message || data, data.info)
    default:
      throw new SERVER_ERROR(data.message || data, data.info)
  }

}

export default {
  ALREADY_CREATED,
  SERVER_ERROR,
  UNAUTHORIZED,
  VALIDATION_ERROR,
  INTEGRATION_ERROR,
  fromAxios
}