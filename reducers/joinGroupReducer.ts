import ValidateEmail, { ValidatePhoneNumber } from "../utils/validate-util";
import { GroupMemberType } from "../types/groupMemberType";

export enum GroupMemberActionEnum {
    CHANGE_FIRSTNAME='change_first_name',
    CHANGE_FIRSTNAME_ERROR='change_first_name_error',
    CHANGE_LASTNAME='change_last_name',
    CHANGE_LASTNAME_ERROR='change_last_name_error',
    CHANGE_EMAILADDRESS='change_email_address',
    CHANGE_EMAILADDRESS_ERROR='change_email_address_error',
    CHANGE_PHONENO='change_phone_no',
    CHANGE_PHONENO_ERROR='change_phone_no_error',
    TOGGLE_CONTACT_METHOD='toggle_contact_method',
    RESET='reset'
}


interface ActionType  {
    type: GroupMemberActionEnum;
    payload?: any;
}

export function GroupMemberReducer(state:GroupMemberType, action:ActionType):GroupMemberType{
    const {type, payload} = action
    switch(type){
        case GroupMemberActionEnum.CHANGE_FIRSTNAME:
            return {
                ...state,
                firstName: payload,
                firstName_error: undefined,
                errored:false,
            }
        case GroupMemberActionEnum.CHANGE_FIRSTNAME_ERROR:
            return {
                ...state,
                firstName_error: payload,
                errored:true,
            }
            
        case GroupMemberActionEnum.CHANGE_LASTNAME:
            return{
                ...state,
                lastName: payload,
                lastName_error: undefined,
                errored:false,
            }
        case GroupMemberActionEnum.CHANGE_LASTNAME_ERROR:
            return{
                ...state,
                lastName_error: payload,
                errored:true,
            }
        case GroupMemberActionEnum.CHANGE_EMAILADDRESS:
            return{
                ...state,
                emailAddress: payload,
                emailAddress_error: ValidateEmail(payload)? undefined:'Invalid Email Address',
                errored: ValidateEmail(payload) ? false: true
            }
        case GroupMemberActionEnum.CHANGE_EMAILADDRESS_ERROR:
            return{
                ...state,
                emailAddress_error: payload,
                errored:true,
            }
            
        case GroupMemberActionEnum.CHANGE_PHONENO:
            return{
                ...state,
                phoneNo: payload,
                phoneNo_error: ValidatePhoneNumber(payload)? undefined:'Invalid Phone Number!',
                errored: ValidatePhoneNumber(payload) ? false: true
            } 
        case GroupMemberActionEnum.CHANGE_PHONENO_ERROR:
            return{
                ...state,
                phoneNo_error: payload,
                errored:true,
            } 

        case GroupMemberActionEnum.TOGGLE_CONTACT_METHOD:
            let contactMethods = state.contactMethods
            if (state.contactMethods){
                if(state.contactMethods.indexOf(payload) !== -1){
                    contactMethods =  state.contactMethods.filter((method) => method !== payload)
                }
                else{
                    contactMethods = [...state.contactMethods, payload]
                }
            }
            else
                contactMethods = [payload]
            console.log(contactMethods)            
            return{
                ...state,
                contactMethods: contactMethods 
            }
           
        case GroupMemberActionEnum.RESET:
            return{
                ...payload
            }
            
        default:
            return state;
        }
}