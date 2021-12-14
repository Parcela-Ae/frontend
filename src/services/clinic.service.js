import API from '../api/api'


const ClinicService = {
	create: async(clinic) => {
		return await API.post('/clinics',clinic)
	},
	existCpf: async (cpf) => {
		return API.get(`/clinics/cpf/${cpf}`)
	},
	findClinic: async (clinicId) => {
		return API.get(`/clinics/${clinicId}`)
	},
	existEmail: async (email = "") => {      
		return API.get(`/clinics/email/${email}`)
	},
	findForClinicSpecialties: async (clinicId) => {      
		return API.get(`/clinics/${clinicId}/specialties`)
	},
	changeForClinicSpecialties: async (clinicId, specialties) => {      
		return API.post(`/clinics/${clinicId}/specialties`, specialties)
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