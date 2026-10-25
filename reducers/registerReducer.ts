import ValidateEmail, { ValidatePassword, ValidatePhoneNumber } from "../utils/validate-util";
import { AccountType } from "../types/auth";

export enum RegisterActionEnum {
    CHANGE_FIRSTNAME='change_firstname',
    CHANGE_FIRSTNAME_ERROR='change_firstname_error',
    CHANGE_LASTNAME='change_lastname',
    CHANGE_LASTNAME_ERROR='change_lastname_error',
    CHANGE_USERNAME='change_username',
    CHANGE_USERNAME_ERROR='change_username_error',
    CHANGE_PASSWORD='change_password',
    CHANGE_PASSWORD_ERROR='change_password_error',
    CHANGE_PASSWORD1='change_password1',
    CHANGE_PASSWORD1_ERROR='change_password1_error',
    CHANGE_PASSWORD2='change_password2',
    CHANGE_PASSWORD2_ERROR='change_password2_error',
    CHANGE_EMAIL='change_email',
    CHANGE_EMAIL_ERROR='change_email_error',
    CHANGE_PHONE_NUMBER='change_phone_number',
    CHANGE_PHONE_NUMBER_ERROR='change_phone_number_error',
    CHANGE_ADDRESS='change_address',
    CHANGE_ADDRESS_ERROR='change_address_error',
    CHANGE_AVATAR='change_avatar',
    CHANGE_AVATAR_ERROR='change_avatar_error',
    CHANGE_ERRORED='change_email_error',
    RESET='reset'
}


interface ActionType  {
    type: RegisterActionEnum;
    payload?: any;
}

export function RegisterReducer(state:AccountType, action:ActionType):AccountType{
    const {type, payload} = action
    switch(type){
        case RegisterActionEnum.CHANGE_USERNAME:
            return {
                ...state,
                username: payload,
                username_error: undefined,
                errored:false,
            }
        case RegisterActionEnum.CHANGE_USERNAME_ERROR:
            return {
                ...state,
                username_error: payload,
                errored:true,
            }
            
        case RegisterActionEnum.CHANGE_PASSWORD:
            return{
                ...state,
                password: payload,
                password_error: '',
                errored:payload !== '',
            }
        case RegisterActionEnum.CHANGE_PASSWORD_ERROR:
            return{
                ...state,
                password_error: payload,
                errored:true,
            }
        case RegisterActionEnum.CHANGE_PASSWORD1:
            return{
                ...state,
                password1: payload,
                password1_error: ValidatePassword(payload)? undefined:'please set a stronger password',
                errored:ValidatePassword(payload)? false:true,
            }
        case RegisterActionEnum.CHANGE_PASSWORD1_ERROR:
            return{
                ...state,
                password1_error: payload,
                errored:true,
            }
        
        case RegisterActionEnum.CHANGE_PASSWORD2:
            return{
                ...state,
                password2: payload,
                password2_error: payload !== state.password1?'Passwords Do not Match':undefined,
                errored: payload !== state.password1?true:false,
            }
        case RegisterActionEnum.CHANGE_PASSWORD2_ERROR:
            return{
                ...state,
                password2_error: payload,
                errored:true,
            }
        case RegisterActionEnum.CHANGE_EMAIL:
            return{
                ...state,
                email: payload,
                email_error: ValidateEmail(payload)? undefined:'invalid email address',
                errored: ValidateEmail(payload) ? false: true,
            }
        case RegisterActionEnum.CHANGE_EMAIL_ERROR:
            return{
                ...state,
                email_error: payload,
                errored:true,
            }
        case RegisterActionEnum.CHANGE_FIRSTNAME:
            return{
                ...state,
                firstname: payload,
                firstname_error: '',
                errored: payload == ''
            }
        case RegisterActionEnum.CHANGE_FIRSTNAME_ERROR:
            return{
                ...state,
                firstname_error: payload,
                errored:true,
            }
        case RegisterActionEnum.CHANGE_LASTNAME:
            return{
                ...state,
                lastname:payload,
                lastname_error: '',
                errored: payload == ''
            }
        case RegisterActionEnum.CHANGE_LASTNAME_ERROR:
            return{
                ...state,
                lastname_error: payload,
                errored:true,
            }
        case RegisterActionEnum.CHANGE_PHONE_NUMBER:
            return{
                ...state,
                phone_number:payload,
                phone_number_error: ValidatePhoneNumber(payload)?undefined:'Invalid Phone Number',
                errored: ValidatePhoneNumber(payload) ? false: true
            }
        case RegisterActionEnum.CHANGE_PHONE_NUMBER_ERROR:
            return{
                ...state,
                phone_number_error: payload,
                errored:true,
            }
        case RegisterActionEnum.CHANGE_ADDRESS:
            return{
                ...state,
                address:payload,
                address_error: '',
                errored: payload == ''
            }
        case RegisterActionEnum.CHANGE_ADDRESS_ERROR:
            return{
                ...state,
                address_error: payload,
                errored:true,
            }
        case RegisterActionEnum.CHANGE_AVATAR:
            return{
                ...state,
                avatar:payload,
                avatar_name: payload.name,
                avatar_error: '',
                errored: payload == ''
            }
        case RegisterActionEnum.CHANGE_AVATAR_ERROR:
            return{
                ...state,
                avatar_error: payload,
                errored:true,
            }
        
        case RegisterActionEnum.RESET:
            return{
                ...payload
            }
        default:
            return state;
        }
}