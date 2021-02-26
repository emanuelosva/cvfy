import axios from 'axios'
import { requestProxy } from './requestProxy'

export const request = requestProxy({ httpClient: axios })
