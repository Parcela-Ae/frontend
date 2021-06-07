import API from '../api'
import Clinic from '../models/clinic.model'
import Head from 'next/head'

const ClinicService = {
	create: async(clinic = new Clinic()) => {
		return await API.post('/clinics/create',clinic)
	},
	existCpf: async (cpf) => {
		return API.get(`/clinics/cpf/${cpf}`)
	},
	existEmail: async (email = "") => {      
		return API.get(`/clinics/email/${email}`)
	},
	findAll: async () =>{
		return API.get('/products')
	}
}

export default ClinicService