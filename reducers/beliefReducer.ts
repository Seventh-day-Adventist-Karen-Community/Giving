import { CreateBeliefsType } from "../types/detailsType";

export enum BeliefsActionEnum {
    CHANGE_NAME='change_name',
    CHANGE_NAME_ERROR='change_name_error',
    CHANGE_SEQUENCE_NO='change_sequence_no',
    CHANGE_SEQUENCE_NO_ERROR='change_sequence_no_error',
    CHANGE_CATEGORY='change_category_type',
    CHANGE_CATEGORY_ERROR='change_category_type_error',
    CHANGE_IMAGE='change_image',
    CHANGE_IMAGE_ERROR='change_image_error',
    CHANGE_DESCRIPTION='change_description',
    CHANGE_DESCRIPTION_ERROR='change_description_error',       
    RESET='reset'
}

const keys = Object.keys(BeliefsActionEnum)

interface ActionType  {
    type: BeliefsActionEnum;
    payload?: any;
}

export function BeliefReducer(state:CreateBeliefsType, action:ActionType):CreateBeliefsType{
    const {type, payload} = action
    switch(type){
        case BeliefsActionEnum.CHANGE_NAME:
            return {
                ...state,
                name: payload,
                name_error: undefined,
                errored:false,
            }
        case BeliefsActionEnum.CHANGE_NAME_ERROR:
            return {
                ...state,
                name_error: payload,
                errored:true,
            }
            
        case BeliefsActionEnum.CHANGE_DESCRIPTION:
            return{
                ...state,
                content: payload,
                content_error: undefined,
                errored:false,
            }
        case BeliefsActionEnum.CHANGE_DESCRIPTION_ERROR:
            return{
                ...state,
                content_error: payload,
                errored:true,
            }
        case BeliefsActionEnum.CHANGE_CATEGORY:
            return{
                ...state,
                categoryName: payload.value,
                categoryLabel: payload.label,
                categoryName_error: undefined,
                errored:false,
            }
        case BeliefsActionEnum.CHANGE_CATEGORY_ERROR:
            return{
                ...state,
                categoryName_error: payload,
                errored:true,
            }
            
        case BeliefsActionEnum.CHANGE_IMAGE:
            return{
                ...state,
                mainPicture: payload,
                mainPictureName: payload.name,
                mainPicture_error: '',
                errored: false
            } 
        case BeliefsActionEnum.CHANGE_IMAGE_ERROR:
            return{
                ...state,
                mainPicture_error: payload,
                errored:true,
            } 
        case BeliefsActionEnum.CHANGE_SEQUENCE_NO:
            return{
                ...state,
                sequenceNo: payload,
                sequenceNo_error: '',
                errored: false
            } 
        case BeliefsActionEnum.CHANGE_SEQUENCE_NO_ERROR:
            return{
                ...state,
                sequenceNo_error: payload,
                errored:true,
            } 

        case BeliefsActionEnum.RESET:
            return{
                ...payload
            }
            
        default:
            return state;
        }
}