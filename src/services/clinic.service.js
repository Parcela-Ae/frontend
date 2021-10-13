import API from '../Api/api'


const ClinicService = {
	create: async(clinic) => {
		return await API.post('/clinics',clinic)
	},
	existCpf: async (cpf) => {
		return API.get(`/clinics/cpf/${cpf}`)
	},
	existEmail: async (email = "") => {      
		return API.get(`/clinics/email/${email}`)
	},
	findAllSpecialties: async () => {      
		return API.get(`/specialties`)
	},
	findAllCities: async () => {      
		return API.get(`/cities`)
	},
	findAll: async () =>{
		return API.get('/clinics')
	},
	findClinicSearch: async (param) =>{
		return API.post('/clinics/search', param)
	}
}

export default ClinicService