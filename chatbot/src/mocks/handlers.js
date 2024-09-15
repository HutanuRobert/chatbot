import { http, HttpResponse } from 'msw'
import {stocks} from '../constants'

export const handlers = [
  http.get(`/api/stocks`, () => {
    return HttpResponse.json(stocks)
  }),
]