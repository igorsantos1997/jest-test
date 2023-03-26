import { Asset } from "@/domain/models/assets/asset"
import { User } from "@/domain/models/users"

export interface CreateAssetsUseCase {
    create(params: CreateAssetsUseCase.Params): Promise<CreateAssetsUseCase.Result>
}

export namespace CreateAssetsUseCase {
    export type Params = {
        user: User
        name: string
        price: number
        sale_tax: number
    }
    export type Result = Asset
}