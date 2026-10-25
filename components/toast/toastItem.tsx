'use client'

import React from 'react'
import { AiOutlineAlert } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import {FcInfo} from 'react-icons/fc'
import { Constants } from '../../utils/constants'
import { ToastType } from './context'
import { motion } from "framer-motion";

const ToastItem = ({message, type, action, position}:{message:string,type: ToastType, action?:Function, position?:string}) => {
    const [show, setShow] = React.useState(true)
    const [hovered, setHovered] = React.useState(false)
    let [delay, setDelay] = React.useState(Constants.TOAST_TIMEOUT);
    let [width, setWidth] = React.useState(100);
    const freq = React.useRef(100)
    const percent = React.useRef((freq.current * 100)/Constants.TOAST_TIMEOUT)

    const Close =()=>{
        setShow(false)
        action &&  action()
    }

    React.useEffect(() => {
        const intervalId = setInterval(()=>{
            if(show && !hovered && delay>0){
                setWidth((width) => { 
                    return(width-percent.current)
                })
                setDelay((delay) =>{
                    return(delay-freq.current)
                })
            }
        }, Constants.TOAST_TIMEOUT/freq.current)
        if(delay<=0){
            clearInterval(intervalId)
            setShow(false)
        }
      return () => {
        clearInterval(intervalId)
        // setShow(false)
      }
    }, [delay, hovered, show])

const getInitialAnimation = ()=>{
    switch (position){
        case 'top-left'||'bottom-left':
            return {opacity:0, x:-50, scale:0.3}
        case 'top-center':
            return {opacity:0, y:-50, scale:0.3}
        case 'top-right'||'bottom-right':
            return {opacity:0, x:50, scale:0.3}
        case 'bottom-center':
            return {opacity:0, y:-50, scale:0.3}        
        default:
            return { opacity: 0, y: -50, scale: 0.3 }
    } 
}
const getExitAnimation = ()=>{
    switch (position){
        case 'top-left'||'bottom-left':
            return {opacity:0, x:-20, scale:0.5}
        case 'top-center':
            return {opacity:0, y:-20, scale:0.5}
        case 'top-right'||'bottom-right':
            return {opacity:0, x:20, scale:0.5}
        case 'bottom-center':
            return {opacity:0, x:-20, scale:0.5}        
        default:
            return { opacity: 0, y: -20, scale: 0.5 }
    } 
}
  return (    
    <>
        {message && show  &&
            <motion.div
                layout
                initial={getInitialAnimation()}
                animate={{ opacity: 1, y: 0, x:0, scale: 1 }}
                exit={getExitAnimation()}
                >
                <div className='transition-all z-50 cursor-pointer delay-75 relative rounded-lg overflow-hidden'
                    onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onTouchStart={()=>setHovered(true)} onTouchEnd={()=>setHovered(false)} >
                    <div id="toast-default" className={`flex text-blue-300 items-center w-full max-w-sm p-4 bg-white rounded-lg shadow-md dark:text-gray-400 dark:bg-gray-910 
                        ${type == ToastType.ERROR ?" bg-red-200 dark:bg-red-200 text-red-700 dark:text-red-700":""} 
                        ${type == ToastType.SUCCESS ?" bg-green-200 dark:bg-green-200  text-green-700 dark:text-green-700":""}
                        ${type == ToastType.ALERT ?" bg-yellow-200 dark:bg-yellow-200  text-yellow-700 dark:text-yellow-700":""}
                        `} role="alert" >
                        <div className="inline-flex items-center justify-center flex-shrink-0">
                            {type == ToastType.ERROR?
                            <BiErrorCircle size={30}/>
                            :
                            type== ToastType.SUCCESS?
                            <BsFillCheckCircleFill size={30} />
                            :
                            type== ToastType.ALERT?
                            <AiOutlineAlert size={30} />
                            :
                            <FcInfo size={30}/>
                            }
                            {/* <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path></svg> */}
                            <span className="sr-only">Fire icon</span>
                        </div>
                        <div className=" ml-3 text-sm font-normal">
                            {message}
                        </div>
                        <button type="button" className={`ml-auto -mx-1.5 -my-1.5 bg-transparent text-gray-400 hover:text-gray-900 rounded-lg p-1.5 inline-flex h-8 w-8  
                            ${type == ToastType.ERROR ?" text-red-700":""} 
                            ${type == ToastType.SUCCESS ?" text-green-700 ":""}
                            ${type == ToastType.ALERT ?" text-yellow-700 ":""}
                            `} 
                            data-dismiss-target="#toast-default" aria-label="Close" onClick={() => Close()}>
                            <span className="sr-only">Close</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className={`absolute h-8 border-b-4  bottom-0 border-blue-700 px-2 transition-all 
                        ${' '}
                        ${type == ToastType.ERROR ? ' border-red-700 dark:border-red-700':''}
                        ${type == ToastType.SUCCESS ? ' border-green-700':''}
                        ${type == ToastType.ALERT ? ' border-yellow-700 ':''}
                        `} style={{width: `${width}%`}}>
                    </div>
                </div>
            </motion.div>
        }
    </>
  )
}

export default ToastItem
