import { CreateActivityType } from "../types/activities";

export enum ActivityActionEnum {
    CHANGE_TITLE='change_title',
    CHANGE_TITLE_ERROR='change_title_error',
    CHANGE_DESCRIPTION='change__description',
    CHANGE_DESCRIPTION_ERROR='change__description_error',
    CHANGE_ACTIVITY_TYPE='change_activity_type',
    CHANGE_ACTIVITY_TYPE_ERROR='change_activity_type_error',
    CHANGE_IMAGE='change_image',
    CHANGE_IMAGE_ERROR='change_image_error',
    CHANGE_START_DATE='change_start_date',
    CHANGE_START_DATE_ERROR='change_start_date_error',
    CHANGE_END_DATE='change_end_date',
    CHANGE_END_DATE_ERROR='change_end_date_error',
    CHANGE_SLOT='change_slot',
    CHANGE_SLOT_ERROR='change_slot_error',
    CHANGE_AMOUNT='change_amount',
    CHANGE_AMOUNT_ERROR='change_amount_error', 
    CHANGE_DEPARTMENT='change_department',
    CHANGE_DEPARTMENT_ERROR='change_department_error',        
    RESET='reset'
}

const keys = Object.keys(ActivityActionEnum)

interface ActionType  {
    type: ActivityActionEnum;
    payload?: any;
}

export function ActivityReducer(state:CreateActivityType, action:ActionType):CreateActivityType{
    const {type, payload} = action
    switch(type){
        case ActivityActionEnum.CHANGE_TITLE:
            return {
                ...state,
                title: payload,
                title_error: undefined,
                errored:false,
            }
        case ActivityActionEnum.CHANGE_TITLE_ERROR:
            return {
                ...state,
                title_error: payload,
                errored:true,
            }
            
        case ActivityActionEnum.CHANGE_DESCRIPTION:
            return{
                ...state,
                description: payload,
                description_error: undefined,
                errored:false,
            }
        case ActivityActionEnum.CHANGE_DESCRIPTION_ERROR:
            return{
                ...state,
                description_error: payload,
                errored:true,
            }
        case ActivityActionEnum.CHANGE_ACTIVITY_TYPE:
            return{
                ...state,
                activityType: payload.value,
                activityType_Label: payload.label,
                activityType_error: undefined,
                errored:false,
            }
        case ActivityActionEnum.CHANGE_ACTIVITY_TYPE_ERROR:
            return{
                ...state,
                activityType_error: payload,
                errored:true,
            }
            
        case ActivityActionEnum.CHANGE_IMAGE:
            return{
                ...state,
                image: payload,
                imageName: payload.name,
                image_error: '',
                errored: false
            } 
        case ActivityActionEnum.CHANGE_IMAGE_ERROR:
            return{
                ...state,
                image_error: payload,
                errored:true,
            } 
        case ActivityActionEnum.CHANGE_START_DATE:
            return{
                ...state,
                startDate: payload,
                startDate_error: '',
                errored: false
            } 
        case ActivityActionEnum.CHANGE_START_DATE_ERROR:
            return{
                ...state,
                startDate_error: payload,
                errored:true,
            } 
        case ActivityActionEnum.CHANGE_END_DATE:
            return{
                ...state,
                endDate: payload,
                endDate_error: '',
                errored: false
            } 
        case ActivityActionEnum.CHANGE_END_DATE_ERROR:
            return{
                ...state,
                endDate_error: payload,
                errored:true,
            } 
        case ActivityActionEnum.CHANGE_SLOT:
            return{
                ...state,
                slots: payload,
                slots_error: Number.isInteger(Number.parseInt(payload))?'':'Slots must be numeric',
                errored: !Number.isInteger(payload)
            } 
        case ActivityActionEnum.CHANGE_SLOT_ERROR:
            return{
                ...state,
                slots_error: payload,
                errored:true,
            } 
        case ActivityActionEnum.CHANGE_AMOUNT:
            return{
                ...state,
                amount: payload,
                amount_error:  '',
                errored: false
            } 
        case ActivityActionEnum.CHANGE_AMOUNT_ERROR:
            return{
                ...state,
                amount_error: payload,
                errored:true,
            } 
        case ActivityActionEnum.CHANGE_DEPARTMENT:
            return{
                ...state,
                department: payload.value,
                department_Label: payload.label,
                department_error: '',
                errored: false
            } 
        case ActivityActionEnum.CHANGE_DEPARTMENT_ERROR:
            return{
                ...state,
                department_error: payload,
                errored:true,
            } 

        case ActivityActionEnum.RESET:
            return{
                ...payload
            }
            
        default:
            return state;
        }
}