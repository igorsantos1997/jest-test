import { User } from "@/domain/models/users"

export interface GetUserRepository {
    get: (params: GetUserRepository.Params) => Promise<GetUserRepository.Result>
  }
  
  export namespace GetUserRepository {
    export type Params = {
      id: string
    }
  
    export type Result = User
  }