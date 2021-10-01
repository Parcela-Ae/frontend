import API from '../Api/viacep.api'

const AddressService = {
    searchByCEP: async(cep = "") =>{
        return API.get(`${cep}/json/`)
    }
}

export default AddressService