import { MeType } from "../types/me"
import { PaginationType } from "../types/paginationType"

export type StatusContextType = {
    status: boolean,
    open: () => void,
    close: () => void,
    toggle: () => void
}
export type AuthContextType = {
    status: boolean|string,
    token: string,
    login: (token:string) => void,
    authenticate: (log:boolean) => void,
    logout: (path:string|null) => void,
    toggle: () => void
}

export type GroupsContextType ={
    status: PaginationType,
    settStatus?: (data:PaginationType) => void,
    clearStatus?: () => void
}

export type AccountContextType ={
    data: {
        me?: MeType
    },
    reset?: (data:string) =>void,
    setCMe?: (data:MeType) =>void
}
