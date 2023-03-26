import { mock, MockProxy } from "jest-mock-extended"
import { ulid } from "ulid"
import { CreateAssetService } from "@/data/services/asset"
import { CalcTaxService } from "@/data/services/tax"
import { CreateAssetsUseCase } from "@/domain/use-cases/assets"
import { CalcTaxUseCase } from "@/domain/use-cases/tax"
import { InvalidPriceError, InvalidTaxError } from "@/domain/errors/assets"
import { GetUserRepository } from "@/data/contracts/repositories/user-repo"
import { User } from "@/domain/models/users"
import { userPermissions } from "@/infra/constants/users"
import { InvalidPermissionError } from "@/domain/errors/generic"

describe('Create Asset', () => {
    let userRepository: MockProxy<GetUserRepository>
    let sut: CreateAssetsUseCase
    let tax_calc: CalcTaxUseCase
    let name: string
    let tax: number
    let sale_tax: number
    let price: number
    let max_sale_tax: number
    let user: User

    beforeAll(async () => {
        name = "Any Asset"
        sale_tax = 0.03
        tax = 0.13
        price = 500000
        max_sale_tax = .8
        userRepository = mock<GetUserRepository>()

        //Redundante de propósito
        const default_user = new User({ id: 'any_id', name: 'Any name', permission: userPermissions.ADMIN, wallet_balance: 100000 })
        userRepository.get.mockResolvedValue(default_user)
        user = await userRepository.get({ id: 'any_id' })
    })

    beforeEach(() => {
        tax_calc = new CalcTaxService(tax)
        sut = new CreateAssetService(max_sale_tax, tax_calc)
    })

    it('all Tax must be lower than price', async () => {
        const asset = await sut.create({ name, sale_tax, price, user })
        asset.sale_comission
        expect(asset.sale_comission).toBeLessThan(price)
        expect(asset.sale_tax).toBeLessThan(price)
    })
    it('all Tax must be lower than price', async () => {
        const asset = await sut.create({ name, sale_tax, price, user })
        expect(asset.sale_comission).toBeLessThan(price)
        expect(asset.sale_tax).toBeLessThan(price)
    })
    it('final price must be greater than price', async () => {
        const asset = await sut.create({ name, sale_tax, price, user })

        expect(asset.final_price).toBeGreaterThan(price)
    })
    it('receipt must be lower than final price', async () => {
        const asset = await sut.create({ name, sale_tax, price, user })

        expect(asset.receipt).toBeLessThan(price)
    })
    it('create must throw erro when sale_tax is less than 0', async () => {
        const createFn = async () => {
            try {
                await sut.create({ name, sale_tax: -1, price, user })
            } catch (e) {
                return e
            }
        }

        expect(await createFn()).toBeInstanceOf(InvalidTaxError)
    })
    it('create must throw erro when sale_tax is greaten than maxSaleTax', async () => {
        const createFn = async () => {
            try {
                await sut.create({ name, sale_tax: max_sale_tax + .1 , price, user })
            } catch (e) {
                return e
            }
        }

        expect(await createFn()).toBeInstanceOf(InvalidTaxError)
    })
    it('must throw erro when price is less than 0', async () => {
        const createFn = async () => {
            try {
                await sut.create({ name, sale_tax, user, price: -.1 })
            } catch (e) {
                return e
            }
        }

        expect(await createFn()).toBeInstanceOf(InvalidPriceError)
    })
    it('must throw erro when user is not admin', async () => {
        const createFn = async () => {
            try {
                const other_user = user
                other_user.permission = userPermissions.USER

                await sut.create({ name, sale_tax, user: other_user, price })
            } catch (e) {
                return e
            }
        }

        expect(await createFn()).toBeInstanceOf(InvalidPermissionError)
    })

})