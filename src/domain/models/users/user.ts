export class User {
    id: string
    name: string
    permission: number
    wallet_balance: number

    constructor(data: UserData) {
        this.id = data.id
        this.name = data.name
        this.permission = data.permission
        this.wallet_balance = data.wallet_balance
    }
}

export type UserData = {
    id: string
    name: string
    permission: number
    wallet_balance: number
}

