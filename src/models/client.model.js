import Address from "./address.model"
import User from "./user.model"

export default class Client{
    constructor(id, cpf,
        user = new User(), address = new Address()) {
            this.id = id,
            this.cpf = cpf,
            this.user = user,
            this.address = address
        }
}