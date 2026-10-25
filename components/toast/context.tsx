'use client'

import React,{useCallback} from 'react'
import Toast from './toast'

interface props {
    children: React.ReactNode
}
export interface ToastParameterType {
    position?:'top-left'|'top-center'|'top-right'|'bottom-left' |'bottom-center'|'bottom-right'
} 
export enum ToastType {
    INFO = 'INFO',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    ALERT = 'ALERT'
}

export interface MessageType {
    index: number,
    type: ToastType,
    message: string,
}
export type MessagesContextType = {
    messages?: MessageType[],
    setErrors: (data:string[]|string, parameters?: ToastParameterType) => void,
    setSuccess: (data:string[]|string, parameters?: ToastParameterType) => void,
    setInfo: (data:string[]|string, parameters?: ToastParameterType) => void,
    setAlert: (data:string[]|string, parameters?: ToastParameterType) => void,
    reset: () => void,
}


export const MessageContext = React.createContext<MessagesContextType | null>(null)

const MessageProvider = ({children}: props) => {
    const [messages, setMessages] = React.useState<MessageType[]>()
    const [index, setIndex] = React.useState(0)
    const [position, setPosition] = React.useState<string>('top-right')
    const setSingleMessage = useCallback((NewMessage:string, type: ToastType)=>{ 
            setIndex(index+1)       
            if(messages)
                setMessages([{index:index,message: NewMessage, type:type}, ...messages])
            else
                setMessages([{index:index, message: NewMessage, type:type}])
    },[messages, index])

    const setAllMessages =useCallback((NewMessage:string|string[], type: ToastType)=>{
        if (Array.isArray(NewMessage)){
            NewMessage.map(SingleMessage=>{
                setSingleMessage(SingleMessage, type)
            })
        }else{
            setSingleMessage(NewMessage, type)
        }
    },[setSingleMessage])

    const setErrors= useCallback((data:string[]|string, parameters?: ToastParameterType) => {
        setAllMessages(data, ToastType.ERROR)
        if(parameters?.position){
            setPosition(parameters.position)
        }
    },[setAllMessages]) 

    const setSuccess = useCallback((data:string[]|string, parameters?: ToastParameterType) =>{
        setAllMessages(data, ToastType.SUCCESS)
        if(parameters?.position){
            setPosition(parameters.position)
        }
    }, [setAllMessages])

    const setInfo = useCallback((data: string[]|string, parameters?: ToastParameterType) =>{
        setAllMessages(data, ToastType.INFO)
        if(parameters?.position){
            setPosition(parameters.position)
        }
        }, [setAllMessages])

    const setAlert = useCallback((data: string[]|string, parameters?: ToastParameterType) =>{
        setAllMessages(data, ToastType.ALERT)
        if(parameters?.position){
            setPosition(parameters.position)
        }
        }, [setAllMessages])
        
    const reset = () => {
        // setMessages([]);
        // setIndex(0);
        };
    return (
        <MessageContext.Provider value={{messages, setErrors, setSuccess,setAlert, setInfo, reset}}>
            {messages && 
                <Toast messages={messages} position={position}/>
            }
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProvider