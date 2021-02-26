import { request } from '../http'
import { makeHandleAuthError } from './handleAuth'
import { makeAuthOperations } from './authOperations'

export const handleAuthErrorOrReject = makeHandleAuthError({ requestClient: request })
export const authOperations = makeAuthOperations({ requestClient: request })
