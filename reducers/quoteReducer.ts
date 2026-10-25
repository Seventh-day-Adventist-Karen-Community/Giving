import { QuoteType } from "../data/post-quote";

export enum QuoteActionEnum {
    CHANGE_TITLE='change_title',
    CHANGE_TITLE_ERROR='change_title_error',
    CHANGE_REFERENCE='change_reference',
    CHANGE_REFERENCE_ERROR='change_reference_error',
    CHANGE_CONTENT='change_content',
    CHANGE_CONTENT_ERROR='change_content_error',
    RESET='reset'
}


interface ActionType  {
    type: QuoteActionEnum;
    payload?: any;
}

export function QuoteReducer(state:QuoteType, action:ActionType):QuoteType{
    const {type, payload} = action
    switch(type){
        case QuoteActionEnum.CHANGE_CONTENT:
            return {
                ...state,
                content: payload,
                content_error: undefined,
                errored:false,
            }
        case QuoteActionEnum.CHANGE_CONTENT_ERROR:
            return {
                ...state,
                content_error: payload,
                errored:true,
            }
            
        case QuoteActionEnum.CHANGE_REFERENCE:
            return {
                ...state,
                reference: payload,
                reference_error: undefined,
                errored:false,
            }
        case QuoteActionEnum.CHANGE_REFERENCE_ERROR:
            return {
                ...state,
                reference_error: payload,
                errored:true,
            }
            
        case QuoteActionEnum.CHANGE_TITLE:
            return {
                ...state,
                title: payload,
                title_error: undefined,
                errored:false,
            }
        case QuoteActionEnum.CHANGE_TITLE_ERROR:
            return {
                ...state,
                title_error: payload,
                errored:true,
            }            
        
        case QuoteActionEnum.RESET:
            return{
                ...payload
            }
            
        default:
            return state;
        }
}