import { AppError } from "../app-error";

export class InvalidTaxError extends AppError{
    constructor(){
        super('Taxa de venda inválida')
        this.name = 'InvalidTaxError'
    }
}