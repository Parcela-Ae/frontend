import API from '../api'
import Client from '../models/client.model'
import Head from 'next/head'

const ClientService = {
	create: async(client = new Client()) => {
		return await API.post('/clients/create',client)
	},
	existCpf: async (cpf) => {
		return API.get(`/clients/cpf/${cpf}`)
	},
	existEmail: async (email = "") => {      
		return API.get(`/clients/email/${email}`)
	}
}

export default ClientService