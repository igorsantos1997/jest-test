import { AppError } from "../app-error";

export class InvalidPermissionError extends AppError{
    constructor(){
        super('Não autorizado')
        this.name = 'InvalidPermissionError'
    }
}