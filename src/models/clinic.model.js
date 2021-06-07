import Address from "./address.model"
import User from "./user.model"

export default class Clinic{
    constructor(id, cnpj,
        user = new User(), address = new Address()) {
            this.id = id,
            this.cnpj = cnpj,
            this.user = user,
            this.address = address
        }
}