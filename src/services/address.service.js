import API from 'cers.api'

const AddressSerivce = {
    searchByCEP: async(cep = "") =>{
        return API.get("/address/cep",{cep})
    }
}

export default AddressSerivce