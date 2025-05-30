import axios from 'axios'
import Cookies from 'js-cookie'

const language = sessionStorage.getItem('language') || 'en'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

instance.interceptors.request.use(
  function (config) {
    // config.withCredentials = true;

    const token = Cookies.get('accessToken')
    config.headers = config.headers || {}
    config.headers.Authorization = token ? `Bearer ${token}` : '123123'

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
const handleErrorMessage = (status: number, message: string) => {
  switch (status) {
    case 400:
      return message || language === 'en' ? 'Bad Request' : 'Yêu cầu không hợp lệ'
    case 403:
      return message || language === 'en' ? 'Not Authorized' : 'Không có quyền truy cập'
    case 404:
      return message || language === 'en' ? 'Not Found' : 'Không tìm thấy'
    case 500:
      return message || language === 'en' ? 'Network Error' : 'Lỗi mạng'
    default:
      return message || language === 'en'
        ? 'Unknown Error, please try again later'
        : 'Lỗi không xác định, vui lòng thử lại sau'
  }
}

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { data } = await instance.post('/users/refresh-token', {}, { withCredentials: true })

        if (data && data.data && data.data.accessToken) {
          Cookies.set('accessToken', data.data.accessToken)
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`

          return instance(originalRequest)
        } else {
          throw new Error('Không thể làm mới token')
        }
      } catch (refreshError) {
        Cookies.remove('user')
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('role')
        window.location.href = '/login'

        return Promise.reject({
          status: 401,
          message: (refreshError as Error).message
        })
      }
    }
    if (error.response) {
      const { status, data } = error.response
      const errorMessage = handleErrorMessage(status, data.message)

      return Promise.reject({
        status,
        message: errorMessage
      })
    } else if (error.request) {
      return Promise.reject({
        status: null,
        message: error.message || language === 'en' ? 'Can not connect to server' : 'Không thể kết nối đến máy chủ'
      })
    } else {
      return Promise.reject({
        status: null,
        message: error.message
      })
    }
  }
)
