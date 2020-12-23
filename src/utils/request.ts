import axios, { AxiosError } from 'axios'
import { createHashHistory } from 'history'
import message from '../components/Message'
import config from './config'

const history = createHashHistory()

const request = axios.create({
  baseURL: `${config.apiPrefix}`,
  timeout: 1000 * 30,
})

request.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`
    return config
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      const token = window.localStorage.getItem('token')
      token && message.error('Login information is invalid, please login again!')
      window.localStorage.removeItem('token')
      history.push('/sign_in')
    }

    if (error?.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      message.error('Request Timeout!')
    }

    return Promise.reject(error)
  },
)

export default request
