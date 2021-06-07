import axios from "axios"

const headers = {}
let headersNoAxios = new Headers(headers)

const base = () => {
    return "https://joao-henrique-sds2.herokuapp.com"
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
                return result
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

    put: async (path = '', value = '') => {

        const url = base() + path
        const method = 'PUT'
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
export default API
