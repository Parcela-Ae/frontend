import axios from "axios"

const headers = {}
let headersNoAxios = new Headers(headers)

const base = () => {
    return "https://viacep.com.br/ws/"
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
}
export default API
