import API from '../api/api'


const SchedulesService = {

	findbyClinic: async (clinicId) => {      
		return API.get(`/clinics/${clinicId}/schedules`)
	},

	findbyClient: async (client) => {      
		return API.get(`/customers/${client}/schedules`)
	},

	create: async(payment) => {
		return await API.post('/schedules',payment)
	},

}

export default SchedulesService