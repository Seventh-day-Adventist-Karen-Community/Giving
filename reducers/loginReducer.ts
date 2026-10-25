import ValidateEmail from "../utils/validate-util";
import { AccountType } from "../types/auth";

export enum LoginActionEnum {
    CHANGE_USERNAME='change_username',
    CHANGE_USERNAME_ERROR='change_username_error',
    CHANGE_PASSWORD='change_password',
    CHANGE_PASSWORD_ERROR='change_password_error',
    RESET='reset'
}


interface ActionType  {
    type: LoginActionEnum;
    payload?: any;
}

export function LoginReducer(state:AccountType, action:ActionType):AccountType{
    const {type, payload} = action
    switch(type){
        case LoginActionEnum.CHANGE_USERNAME:
            return {
                ...state,
                username: payload,
                username_error: undefined,
                errored:false,
            }
        case LoginActionEnum.CHANGE_USERNAME_ERROR:
            return {
                ...state,
                username_error: payload,
                errored:true,
            }
            
        case LoginActionEnum.CHANGE_PASSWORD:
            return{
                ...state,
                password: payload,
                password_error: undefined,
                errored:false,
            }
        case LoginActionEnum.CHANGE_PASSWORD_ERROR:
            return{
                ...state,
                password_error: payload,
                errored:true,
            }
        case LoginActionEnum.RESET:
            return{
                ...payload
            }
            
        default:
            return state;
        }
}