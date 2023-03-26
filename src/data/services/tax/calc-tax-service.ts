import { CalcTaxUseCase } from "@/domain/use-cases/tax";

export class CalcTaxService implements CalcTaxUseCase{
    constructor(private _tax: number){}

    calc = (params: CalcTaxUseCase.Params): CalcTaxUseCase.Result => params.price * (this._tax)
}