import API from '../api/api'

const AuthService = {
    signIn: async(us) =>{
        return API.post("/login", us)
    },
    profile: async() =>{
        return API.get("/users/profile")
        
    },
    findOrders: async(order = "") =>{
        return API.put(`/orders/${order}/delivered`)
    }

}

export default AuthService