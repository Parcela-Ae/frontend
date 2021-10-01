import API from '../Api/api'

const ClientService = {
	create: async(client) => {
		return await API.post('/customers',client)
	},
	existCpf: async (cpf) => {
		return API.get(`/clients/cpf/${cpf}`)
	},
	existEmail: async (email = "") => {      
		return API.get(`/clients/email/${email}`)
	}
}

export default ClientService