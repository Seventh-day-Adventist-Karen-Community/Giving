import ValidateEmail, { ValidatePhoneNumber } from "../utils/validate-util";
import { Option } from "../components/utils/select/components/type";
import { CreateDepartmentsType } from "../types/department";


export enum DepartmentActionEnum {
    CHANGE_MAIN='change_main',
    CHANGE_MAIN_ERROR='change_main_error',
    CHANGE_TITLE='change_title',
    CHANGE_TITLE_ERROR='change_title_error',
    CHANGE_DESCRIPTION='change__description',
    CHANGE_DESCRIPTION_ERROR='change__description_error',
    CHANGE_DEPT_TYPE='change_dept_type',
    CHANGE_DEPT_TYPE_ERROR='change_dept_type_error',
    CHANGE_IMAGE='change_image',
    CHANGE_IMAGE_ERROR='change_image_error',
    RESET='reset'
}

const keys = Object.keys(DepartmentActionEnum)

interface ActionType  {
    type: DepartmentActionEnum;
    payload?: any;
}

export function DepartmentReducer(state:CreateDepartmentsType, action:ActionType):CreateDepartmentsType{
    const {type, payload} = action
    switch(type){
        case DepartmentActionEnum.CHANGE_TITLE:
            return {
                ...state,
                title: payload,
                title_error: undefined,
                errored:false,
            }
        case DepartmentActionEnum.CHANGE_TITLE_ERROR:
            return {
                ...state,
                title_error: payload,
                errored:true,
            }
            
        case DepartmentActionEnum.CHANGE_DESCRIPTION:
            return{
                ...state,
                description: payload,
                description_error: undefined,
                errored:false,
            }
        case DepartmentActionEnum.CHANGE_DESCRIPTION_ERROR:
            return{
                ...state,
                description_error: payload,
                errored:true,
            }
        case DepartmentActionEnum.CHANGE_DEPT_TYPE:
            return{
                ...state,
                deptType: payload.value,
                deptType_Label: payload.label,
                deptType_error: undefined,
                errored:false,
            }
        case DepartmentActionEnum.CHANGE_DEPT_TYPE_ERROR:
            return{
                ...state,
                deptType_error: payload,
                errored:true,
            }
            
        case DepartmentActionEnum.CHANGE_IMAGE:
            return{
                ...state,
                image: payload,
                imageName: payload.name,
                image_error: '',
                errored: false
            } 
        case DepartmentActionEnum.CHANGE_IMAGE_ERROR:
            return{
                ...state,
                image_error: payload,
                errored:true,
            } 

        case DepartmentActionEnum.RESET:
            return{
                ...payload
            }
            
        default:
            return state;
        }
}