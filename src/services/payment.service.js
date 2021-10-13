import API from '../Api/api'

const PaymentService = {
    create: async(payment) => {
		return await API.post('/transactions',payment)
	},
	getBalance: async (customerId) => {
		return API.get(`/customers/${customerId}`)
	},
    findAllTransaction: async (userId) => {
		return API.get(`/transactions/users/${userId}`)
	},
    findTransaction: async (transactionId) => {
		return API.get(`/transactions/${transactionId}`)
	},
	
}

export default PaymentService