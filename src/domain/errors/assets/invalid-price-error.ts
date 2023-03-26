import { AppError } from "../app-error";

export class InvalidPriceError extends AppError{
    constructor(){
        super('Preço inválido')
        this.name = 'InvalidPriceError'
    }
}