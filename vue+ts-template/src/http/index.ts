import axios from 'axios'
import factory from './factory'
import { getAccessToken } from '@globalUtils/sessionStorage'

const proxy = process.env.VUE_APP_API_URL_PROXY || ''
const instance = axios.create({
  baseURL: proxy ? '' : process.env.VUE_APP_API_URL
})
const {
  requestByGet,
  requestByPost,
  pendingRequest /* , requestFile, request */
} = factory({
  instance,
  proxy,
  getAccessToken
})

export {
  requestByGet,
  requestByPost,
  pendingRequest /* , requestFile, request */
}
