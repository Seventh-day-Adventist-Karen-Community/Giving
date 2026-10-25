import { SectionContent } from "../types/sectionContent";

export enum ActionEnum {
    CHANGE_TITLE='change_title',
    CHANGE_MESSAGE='change_message',
    UPLOAD_IMAGE='upload_image',
    UPLOAD_BGIMAGE='upload_bgimage',
    UPLOAD_BGIMAGERIGHT='upload_bgimage_right',
    UPLOAD_BGIMAGELEFT='upload_bgimage_left',
    TOGGLE_CENTER='toggle_center',
    TOGGLE_BGCOLOR= 'toggle_bgcolor',
    TOGGLE_REVERSE='toggle_reverse',
    TOGGLE_INDENT='toggle_indent',
    RESET='reset'
}

interface ActionType  {
    type: ActionEnum;
    payload?: any;
}

export function contentReducer(state:SectionContent, action:ActionType){
const {type, payload} = action
switch(type){
    case ActionEnum.CHANGE_TITLE:
        return {
            ...state,
            title: payload
        }
    case ActionEnum.CHANGE_MESSAGE:
        return{
            ...state,
            message: payload
        }
    case ActionEnum.UPLOAD_IMAGE:
        return{
            ...state,
            image: payload
        }
    case ActionEnum.UPLOAD_BGIMAGE:
        return{
            ...state,
            bgImage: payload
        }
    case ActionEnum.UPLOAD_BGIMAGELEFT:
        return{
            ...state,
            bgImageRight: payload
        }
    case ActionEnum.UPLOAD_BGIMAGERIGHT:
        return{
            ...state,
            bgImageLeft: payload
        }
        
    case ActionEnum.TOGGLE_BGCOLOR:
        return{
            ...state,
            bg_dark: !state.bg_dark
        }
    case ActionEnum.TOGGLE_CENTER:
        return{
            ...state,
            center: !state.center
        }
    case ActionEnum.TOGGLE_REVERSE:
        console.log(state.reverse)
        return{
            ...state,
            reverse: !state.reverse
        } 
    case ActionEnum.TOGGLE_INDENT:
        console.log(state.indent)
        return{
            ...state,
            indent: !state.indent
        }
    case ActionEnum.RESET:
        return{
            ...payload
        }
        
    default:
        return state;
    }
}