import Credit from "./credit.model"

export default class Movement{
	constructor(id,origem = new Credit(),destino = new Credit(),tipo,valor,dataOperacao){
		this.id = id,
		this.origem = origem,
		this.destino = destino,
		this.tipo = tipo,
		this.valor = valor,
		this.dataOperacao = dataOperacao
	}
}

