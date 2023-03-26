import { InvalidPriceError } from "@/domain/errors/assets";
import { InvalidTaxError } from "@/domain/errors/assets/invalid-tax-error";
import { InvalidPermissionError } from "@/domain/errors/generic";
import { Asset } from "@/domain/models/assets";
import { CreateAssetsUseCase } from "@/domain/use-cases/assets";
import { CalcTaxUseCase } from "@/domain/use-cases/tax";
import { userPermissions } from "@/infra/constants/users";

export class CreateAssetService implements CreateAssetsUseCase{

    constructor(private _maxSaleTax: number, private readonly _calcTax: CalcTaxUseCase){}

    create = async (params: CreateAssetsUseCase.Params): Promise<CreateAssetsUseCase.Result> => {
        const { name, price, sale_tax, user } = params

        if (price < 0) throw new InvalidPriceError()
        if (sale_tax < 0 || sale_tax > this._maxSaleTax) throw new InvalidTaxError()

        if (user.permission !== userPermissions.ADMIN) throw new InvalidPermissionError()

        const tax = this._calcTax.calc({ price })
        
        const final_price = ( price * (1 + sale_tax) ) + tax
        const sale_comission = price * sale_tax
        const receipt = price - sale_tax - tax

        return new Asset({ name, price, final_price, sale_tax, tax, sale_comission, receipt })
    }

}