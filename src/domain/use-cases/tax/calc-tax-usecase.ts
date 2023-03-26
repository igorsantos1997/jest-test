export interface CalcTaxUseCase {
    calc(params: CalcTaxUseCase.Params): CalcTaxUseCase.Result
}

export namespace CalcTaxUseCase {
    export type Params = {
        price: number
    }
    export type Result = number
}