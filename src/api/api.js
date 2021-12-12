import axios from "axios"
import { parseCookies } from "nookies";
import { toast } from 'react-nextjs-toast';

const { 'parcelaAe.token': token } = parseCookies()
let headersNoAxios = new Headers({
  "Content-Type": "application/json"
})


if (token) {
  headersNoAxios.append("authorization", `Bearer ${token}`)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
}
const base = () => {
  switch (process.env.NEXT_PUBLIC_ISLOCAL) {
		case 'true':
			return `http://localhost:8080`
		default:
			return `https://parcela-ae-app.herokuapp.com`
	}
}

const API = {
  get: async (path = '', params = {}) => {
    let url = base() + path
    return axios.get(url, {
      timeout: 10000,
      params: params
    }).then(response => {
      let data = response.data
      return data
    }).catch(error => {
      return []
    })
  },

  post: async (path = '', params = {}, isJson = true) => {
    return await doRequest(path, async () => {

      const url = base() + path
      const method = 'POST'
      const body = isJson ? JSON.stringify(params) : params
      let result = null
      const response = await fetch(url, {
        method, headers: headersNoAxios, body
      })

      try {
        result = await response.text()
        return JSON.parse(result)
      } catch (e) {
        toast.notify(e.message, {
          duration: 5,
          type: "error",
          title: "error"
      })
      }
    })
  },

  put: async (path = '', params = {}, isJson = true) => {
    return await doRequest(path, async () => {
      debugger
      const url = base() + path
      const method = 'PUT'
      const body = isJson ? JSON.stringify(params) : params
      let result = null
      console.log(headersNoAxios)
      const response = await fetch(url, {
        method, headers: headersNoAxios, body
      })

      try {
        result = await response.text()
        return JSON.parse(result)
      } catch (e) {
        toast.notify(e.message, {
          duration: 5,
          type: "error",
          title: "error"
      })
      }
    })
  },

  patch: async (path = '', value = '') => {

    const url = base() + path
    const method = 'PATCH'
    const body = JSON.stringify(value)
    let result = null

    const response = await fetch(url, {
      method, headers: headersNoAxios, body
    })

    try {
      if (response.status != 200) {
        return response
      }
      result = await response.text()
      return JSON.parse(result)
    } catch (e) {
      return result
    }
  },

  

  delete: async (path = '', value = {}) => {
    const url = base() + path
    const method = "DELETE"
    const body = JSON.stringify(value)
    let result = null

    const response = await fetch(url, {
      method, headers: headersNoAxios, body
    })
    try {
      if (response.status != 200) {
        return response
      }
      result = await response.text()
      return JSON.parse(result)
    } catch (e) {
      return result
    }
  },

}

async function doRequest(url, callback) {

  try {

    const unknownStr = '[object Object]';
    if (url.includes(unknownStr))
      throw new Error('Unknown Object String');

    return await callback();

  } catch (e) {
    console.log("Error:", e.toString());
    return null;
  }
}
export default API
