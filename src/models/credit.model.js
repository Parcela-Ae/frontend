import User from "./user.model"

export default class Credit{
	constructor(id,saldo,
        user = new User()) {
			this.id = id,
            this.saldo = saldo,
			this.user = user
        }
}