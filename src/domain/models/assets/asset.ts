export class Asset {
    name: string
    final_price: number
    price: number
    tax: number
    sale_tax: number
    sale_comission: number
    receipt: number

    constructor(data: AssetDataBase & AssetDataTax) {
        this.name = data.name
        this.final_price = data.final_price
        this.price = data.price
        this.tax = data.tax
        this.sale_tax = data.sale_tax
        this.receipt = data.receipt
        this.sale_comission = data.sale_comission
    }
}

export type AssetDataBase = {
    name: string
    price: number
}

export type AssetDataTax = {
    final_price: number
    tax: number
    sale_tax: number
    sale_comission: number
    receipt: number

}