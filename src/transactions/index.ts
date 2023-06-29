export enum TransactionStatus {
  CREATED,
  ENQUEUING,
  ENQUEUED,
  SENDING,
  SENT,
  AWAITTING_RETRY,
  MINED,
  ERROR,
  REVERTED
}

export type Transaction =
{
  status: TransactionStatus
  created: string
  network: string
  id: string
  hash: string
  checks: number
  confirmations?: number
  lastCheck?: string
  events: any[]
  links?: {
    [key: string]: string
  }
  erroReason?: string
}

const parseEvents = events => events
  ? { events: events.join(',') }
  : null

export default (api) => {
  return {
    get: (id: string, events: string[]): Promise<Transaction | Transaction[]> => id ?
      api.get(`/transactions/${id}`, parseEvents(events)) as Promise<Transaction> :
      api.get('/transactions') as Promise<Transaction[]>
  }
}