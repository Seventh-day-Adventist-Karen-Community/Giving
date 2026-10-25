import ValidateEmail, { ValidatePhoneNumber } from "../utils/validate-util";
import { CreateGroupType } from "../types/groupType";
import { Option } from "../components/utils/select/components/type";

export enum GroupActionEnum {
    CHANGE_NAME='change_name',
    CHANGE_NAME_ERROR='change_name_error',
    CHANGE_LOCATION='change_location_name',
    CHANGE_LOCATION_ERROR='change_location_name_error',
    CHANGE_MEETING_TIME='change_email_meeting_time',
    CHANGE_MEETING_TIME_ERROR='change_email_meeting_time_error',
    CHANGE_ROUTINE='change_routine_no',
    CHANGE_ROUTINE_ERROR='change_routine_no_error',
    CHANGE_COMMUNITY_TYPE='change_community_type',
    CHANGE_COMMUNITY_TYPE_ERROR='change_community_type_error',
    CHANGE_AGE_GROUP='change_age_group',
    CHANGE_AGE_GROUP_ERROR='change_age_group_error',
    CHANGE_DETAILS='change_details',
    CHANGE_DETAILS_ERROR='change_details_error',
    CHANGE_DESCRIPTION='change_description',
    CHANGE_DESCRIPTION_ERROR='change_description_error',
    CHANGE_MEETING_DAYS='change_meeting_days',
    CHANGE_MEETING_DAYS_ERROR='change_meeting_days_error',
    CHANGE_IMAGE='change_image',
    CHANGE_IMAGE_ERROR='change_image_error',
    RESET='reset'
}

const keys = Object.keys(GroupActionEnum)

interface ActionType  {
    type: GroupActionEnum;
    payload?: any;
}

export function GroupReducer(state:CreateGroupType, action:ActionType):CreateGroupType{
    const {type, payload} = action
    switch(type){
        case GroupActionEnum.CHANGE_NAME:
            return {
                ...state,
                name: payload,
                name_error: undefined,
                errored:false,
            }
        case GroupActionEnum.CHANGE_NAME_ERROR:
            return {
                ...state,
                name_error: payload,
                errored:true,
            }
            
        case GroupActionEnum.CHANGE_LOCATION:
            return{
                ...state,
                location: payload,
                location_error: undefined,
                errored:false,
            }
        case GroupActionEnum.CHANGE_LOCATION_ERROR:
            return{
                ...state,
                location_error: payload,
                errored:true,
            }
        case GroupActionEnum.CHANGE_MEETING_TIME:
            return{
                ...state,
                meetingTime: payload,
                meetingTime_error: undefined,
                errored:false,
            }
        case GroupActionEnum.CHANGE_MEETING_TIME_ERROR:
            return{
                ...state,
                meetingTime_error: payload,
                errored:true,
            }
            
        case GroupActionEnum.CHANGE_ROUTINE:
            return{
                ...state,
                routine: payload.value,
                routineLabel: payload.label,
                routine_error: '',
                errored: false
            } 
        case GroupActionEnum.CHANGE_ROUTINE_ERROR:
            return{
                ...state,
                routine_error: payload,
                errored:true,
            } 

        case GroupActionEnum.CHANGE_COMMUNITY_TYPE:
            return{
                ...state,
                communityType: payload.value,
                communityTypeLabel: payload.label,
                communityType_error: '',
                errored: false
            } 
        case GroupActionEnum.CHANGE_COMMUNITY_TYPE_ERROR:
            return{
                ...state,
                communityType_error: payload,
                errored:true,
            } 

        case GroupActionEnum.CHANGE_AGE_GROUP:
            return{
                ...state,
                ageGroup: payload.value,
                ageGroupLabel: payload.label,
                ageGroup_error:'',
                errored: false
            } 
        case GroupActionEnum.CHANGE_AGE_GROUP_ERROR:
            return{
                ...state,
                ageGroup_error: payload,
                errored:true,
            } 

        case GroupActionEnum.CHANGE_DETAILS:
            return{
                ...state,
                details: payload,
                details_error:'',
                errored: false
            } 
        case GroupActionEnum.CHANGE_DETAILS_ERROR:
            return{
                ...state,
                details_error: payload,
                errored:true,
            } 

        case GroupActionEnum.CHANGE_DESCRIPTION:
            return{
                ...state,
                description: payload,
                description_error:'',
                errored: false
            } 
        case GroupActionEnum.CHANGE_DESCRIPTION_ERROR:
            return{
                ...state,
                description_error: payload,
                errored:true,
            } 
        case GroupActionEnum.CHANGE_MEETING_DAYS:
            return{
                ...state,
                meetingDays: payload,
                meetingDaysList: payload && payload.map((meetingDay:Option)=>{
                    return(meetingDay.value)
                }),
                meetingDays_error:'',
                errored: false
            } 
        case GroupActionEnum.CHANGE_MEETING_DAYS_ERROR:
            return{
                ...state,
                meetingDays_error: payload,
                errored:true,
            } 
        case GroupActionEnum.CHANGE_IMAGE:
            return{
                ...state,
                image: payload,
                imageName: payload.name,
                image_error:'',
                errored: false
            } 
        case GroupActionEnum.CHANGE_IMAGE_ERROR:
            return{
                ...state,
                image_error: payload,
                errored:true,
            }
        case GroupActionEnum.RESET:
            return{
                ...payload
            }
            
        default:
            return state;
        }
}