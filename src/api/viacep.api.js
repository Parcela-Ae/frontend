import axios from "axios"



const base = () => {
  return "https://viacep.com.br/ws/"
}

const API = {

  get: async (path = '', params = {}, isJson = true) => {

    const url = base() + path
    const method = 'get'
    let result = null
    const response = await fetch(url, {
      method
    })

    try {
      result = await response.text()
      return JSON.parse(result)
    } catch (e) {
      return result
    }
  },
}
export default API
