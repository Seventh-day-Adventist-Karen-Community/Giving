'use client'

import Image from 'next/image'
import React,{useReducer, useRef,  useState} from 'react'
import { FaCloudUploadAlt, FaSave, FaSync, FaUpload } from 'react-icons/fa'
import { ActionEnum, contentReducer } from '../../reducers/section1Reducer'
import { SectionContent } from '../../types/sectionContent'
import { PrimaryButton, SecondaryButton } from '../buttons'
import Carousel from '../carousel'
import Switch from '../utils/switch'
import Uploader from './uploader'


const Section1Edit = (content:SectionContent) => {
    const [state, dispatch] = useReducer(contentReducer, content)
    const [ImageUrl, setImageUrl] = useState<string>(state.image || '')
    const [MImage, setMImage] = useState<boolean>()
    const [BgImageUrl, setBgImageUrl] = useState<string>(state.bgImage || '')
    const [BgImage, setBgImage] = useState<boolean>()
    const [BgImageRightUrl, setBgImageRightUrl] = useState<string>(state.bgImageRight || '')
    const [BgImageRight, setBgImageRight] = useState<boolean>()
    const [BgImageLeftUrl, setBgImageLeftUrl] = useState<string>(state.bgImageLeft || '')
    const [BgImageLeft, setBgImageLeft] = useState<boolean>()
    const imageFile = useRef<HTMLInputElement>(null)
    const bgImageFile = useRef<HTMLInputElement>(null)
    const bgImageRightFile = useRef<HTMLInputElement>(null)
    const bgImageLeftFile = useRef<HTMLInputElement>(null)
    const UploadImage = (e:any) =>{
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        dispatch({type: ActionEnum.UPLOAD_IMAGE, payload: e.target.files[0]})
        if (!state.image) {
            return
        }
        // console.log(state.image);
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setImageUrl(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }
    const UploadBgImage = (e:any) =>{
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        dispatch({type: ActionEnum.UPLOAD_BGIMAGE, payload: e.target.files[0]})
        if (!state.bgImage) {
            return
        }
        console.log(state.bgImage);
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setBgImageUrl(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }
    const UploadBgImageRight = (e:any) =>{
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        dispatch({type: ActionEnum.UPLOAD_BGIMAGERIGHT, payload: e.target.files[0]})
        if (!state.bgImageRight) {
            return
        }
        // console.log(state.image);
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setBgImageRightUrl(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }

    const UploadBgImageLeft = (e:any) =>{
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        dispatch({type: ActionEnum.UPLOAD_BGIMAGELEFT, payload: e.target.files[0]})
        if (!state.bgImageLeft) {
            return
        }
        // console.log(state.image);
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setBgImageLeftUrl(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }

const Reset = () =>{
    dispatch({type: ActionEnum.RESET, payload: content})
    setImageUrl(content.image);
    setBgImageUrl(content.bgImage);
    setBgImageLeftUrl(content.bgImageLeft);
    setBgImageRightUrl(content.bgImageRight);
}

  return (
    <form className={`relative py-7 transition-all`} onClick ={()=>{
        MImage && setMImage(false);
        BgImage && setBgImage(false);
        BgImageLeft && setBgImageLeft(false);
        BgImageRight && setBgImageRight(false);
    }}>
        <div className={`absolute -z-20 top-0 left-0 w-full h-full ${state.bg_dark? 'bg-gray-700':''}`}>
            <div className={`h-full w-full -z-10 top-0 left-0 flex flex-col md:flex-row bg-center bg-no-repeat bg-cover `} style={{backgroundImage: `url(${BgImageUrl})`}}>
                <div className='bg-cover m-0 h-full w-full md:w-1/2 bg-center bg-no-repeat' style={{backgroundImage:`url(${BgImageLeftUrl})`}}>
                </div>
                <div className='bg-cover m-0 h-full w-full md:w-1/2 bg-center bg-no-repeat' style={{backgroundImage:`url(${BgImageRightUrl})`}}>
                </div>
            </div>
        </div>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full my-0 h-full z-20 '>
            <div className={`flex h-full w-full mb-2 z-10 flex-col
                 ${state.reverse? "md:flex-row-reverse": "md:flex-row"}`}>
                <div className={`${state.center?'':'md:w-1/2'} ${state.indent?'lg:pl-44 md:w-5/6':''}  w-full py-10 md:py-0 md:h-96 ${state.reverse?'md:pl-6':'md:pr-6 leading-loose '}`}>
                    <div className={`flex flex-col h-full justify-center text-center ${state.center?'md:px-20':'md:text-left'}`}>           
                        <div className={`${state.bg_dark? 'text-gray-100':'text-gray-900'} font-bold text-xl my-3 leading-loose"`}>
                            <input
                            value={state.title}
                            onChange = {(e) => dispatch({type: ActionEnum.CHANGE_TITLE, payload: e.target.value})}
                            className={`text-3xl md:text-4xl py-5 px-1 hover:border-1 hover:border-gray-500 border-dotted cursor-text bg-transparent outline-none active:border-gray-500 active:border-1 w-full ${state.center?'text-center':''} focus:border-1 focus:border-gray-500`} />
                            
                        </div>
                        <textarea 
                        value={state.message}
                        rows={4}
                        onChange = {(e) => dispatch({type: ActionEnum.CHANGE_MESSAGE, payload:  e.target.value})}
                        className={`${state.bg_dark? 'text-gray-200':'text-gray-700'}  hover:border-1 hover:border-gray-500 border-dotted bg-transparent text-gray-700 text-lg md:text-xl leading-relaxed px-1 py-1 outline-none focus:border-1 focus:border-gray-500 ${state.center?'text-center':''}`}/>

                    <div className={`flex flex-col md:flex-row  my-5 gap-x-2 gap-y-2 md:mt-9 hover:border-1 hover:border-gray-500 border-dotted cursor-pointer ${state.center? 'justify-center':'md:justify-start'} `}>
                        {state.actions &&
                            state.actions.map((action:any) => {
                                return ( action.primary ? 
                                    <PrimaryButton text={action.text} key={action.id} link={action.path}/>
                                :
                                    <SecondaryButton text={action.text} key={action.id} link={action.path}/>
                                )
                            })
                        }
                    </div>
                    </div>
                </div>
                {
                !state.center && 
                    <div className='w-full flex md:w-1/2 md:h-96 justify-center relative'>
                        {state.image && 
                            <div  className={`w-full h-full flex ${state.reverse?"justify-start":"justify-end"} `}>
                                {ImageUrl &&
                                 <Image src={ImageUrl} alt={state.title} width ={600} height={600} className='object-cover w-11/12 bg-center max-h-96 rounded-2xl my-auto' priority={false}/>
                                }
                            </div>
                        }
                        <div className='absolute w-full h-full flex justify-center align-middle'>
                            <div className='h-full w-full my-auto cursor-pointer text-maroon-500 focus:text-maroon-600 hover:bg-opacity-50 rounded-2xl transition-all hover:bg-gray-100 bg-opacity-40 flex' 
                                onClick={() => {
                                    setMImage(true);
                                    setBgImage(false);
                                    setBgImageLeft(false);
                                    setBgImageRight(false);
                                    }
                                }>
                                <div className='m-auto p-5 bg-gray-100 rounded-full bg-opacity-80'>
                                    <FaCloudUploadAlt size={50} className='mx-auto' />
                                </div>
                                <input type="file" name="file_upload" className='hidden' ref={imageFile} accept="image/*" onChange={(e) => UploadImage(e)}/>
                            </div>
                        </div>
                        {state.carousel &&
                         state.carousel.length !== 0 &&
                            <Carousel 
                            listItem={state.carousel}
                            />
                        }
                    </div>
                }
            </div>
        </div>  
        <div className='transition-all absolute flex justify-center py-3 px-12 w-full text-center md:bottom-4 bg-gray-300 gap-3 h-12 text-gray-700 flex-wrap ease-in-out'>
            <div className='text-blue-600 py-1 hover:text-blue-700 hover:border-b-2 hover:border-b-blue-700 font-semibold z-0 flex flex-nowrap gap-3 justify-center transition-all text-center cursor-pointer my-auto text-sm' onClick={() => Reset()}>
                <FaSync size={20}/>
                Reset
            </div>
            <Switch checked = {state.center} text={'Center'} setEnabled ={() => dispatch({type: ActionEnum.TOGGLE_CENTER})}/>
            <Switch checked = {state.reverse} text={'Reverse'} setEnabled={() => dispatch({type: ActionEnum.TOGGLE_REVERSE})}/>
            <Switch checked = {state.bg_dark} text={'Background Dark'} setEnabled={() => dispatch({type: ActionEnum.TOGGLE_BGCOLOR})}/>
            <Switch checked = {state.indent} text={'Indent Text'} setEnabled={() => dispatch({type: ActionEnum.TOGGLE_INDENT})}/>
            <div className='hover:text-blue-700 hover:border-b-2 hover:border-b-blue-700 font-semibold z-0 flex flex-nowrap gap-x-3 justify-center transition-all text-center cursor-pointer text-sm my-auto py-1'
                onClick={() => {
                    setMImage(false);
                    setBgImage(true);
                    setBgImageLeft(false);
                    setBgImageRight(false);
                    }
                }>
                <FaUpload size={20}/>
                Background
                <input type="file" name="bg_upload" className='hidden' ref={bgImageFile} accept="image/*" onChange={(e) => UploadBgImage(e)}/>
            </div>
            
            <div className=' hover:text-blue-700 hover:border-b-2 hover:border-b-blue-700 font-semibold z-0 flex flex-nowrap gap-x-3 justify-center transition-all text-center cursor-pointer text-sm my-auto py-1'
                    onClick={() => {
                        setMImage(false);
                        setBgImage(false);
                        setBgImageLeft(true);
                        setBgImageRight(false);
                        }
                    }
                >
                <FaUpload size={20}/>
                Background Left
                <input type="file" name="bg_left_upload" className='hidden' ref={bgImageLeftFile} accept="image/*" onChange={(e) => UploadBgImageLeft(e)}/>
            </div>
            <div className='hover:text-blue-700 hover:border-b-2 hover:border-b-blue-700 font-semibold z-0 flex flex-nowrap gap-x-3 justify-center transition-all text-center cursor-pointer text-sm my-auto py-1'
                 onClick={() => {
                    setMImage(false);
                    setBgImage(false);
                    setBgImageLeft(false);
                    setBgImageRight(true);
                    }
                }>
                <FaUpload size={20}/>
                Background Right
                <input type="file" name="bg_right_upload" className='hidden' ref={bgImageRightFile} accept="image/*" onChange={(e) => UploadBgImageRight(e)}/>
            </div>
            
            <button className='text-blue-600 hover:text-blue-700 hover:border-b-2 py-1 hover:border-b-blue-700 font-semibold z-0 flex flex-nowrap gap-x-3 justify-center transition-all text-center cursor-pointer my-auto text-sm'>
                <FaSave size={20}/>
                Save
            </button>
        </div>
        {MImage && 
        <Uploader title='Edit Image' onUpload={() => imageFile.current?.click()} onClear={()=>setImageUrl('')} onReset={() => setImageUrl(content.image)} onClose={()=>setMImage(false)}/>
        }  
        {BgImage &&
        <Uploader title='Edit Background Image' onUpload={() => bgImageFile.current?.click()} onClear={()=>setBgImageUrl('')} onReset={() => setBgImageUrl(content.bgImage)} onClose={()=>setBgImage(false)}/>
        }
        {BgImageLeft &&
        <Uploader title='Edit Left Background Image' onUpload={() => bgImageLeftFile.current?.click()} onClear={()=>setBgImageLeftUrl('')} onReset={() => setBgImageLeftUrl(content.bgImageLeft)} onClose={()=>setBgImageLeft(false)}/>
        }
        {BgImageRight &&
        <Uploader title='Edit Right Background Image' onUpload={() => bgImageRightFile.current?.click()} onClear={()=>setBgImageRightUrl('')} onReset={() => setBgImageRightUrl(content.bgImageRight)} onClose={()=>setBgImageRight(false)}/>
        }

    </form>

  )
}

export default Section1Edit