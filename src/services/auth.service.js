import API from '../api'

const AuthService = {
    signin: async() =>{
        return API.get("/products")
    },
    searchProducts: async() =>{
        return API.get("/products")
        
    },
    findOrders: async(order = "") =>{
        return API.put(`/orders/${order}/delivered`)
    }

}

export default AuthService