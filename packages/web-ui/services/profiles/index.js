import { request } from '../http'
import { makeProfileOperations } from './profileOperations'

export const profileOperations = makeProfileOperations({ requestClient: request })
