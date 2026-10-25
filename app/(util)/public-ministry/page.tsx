'use client'

import { ApolloError } from '@apollo/client';
import Link from 'next/link';
import React, { useReducer , useState, useEffect} from 'react'
import {FaRegHandSpock} from "react-icons/fa";
import { PrimarySubmitButton } from '@components/buttons';
import FormUtils from '@components/utils/form-utils';
import InputComponent, { TextAreaComponent } from '@components/utils/input-component';
import TinyMCEEditor from '@components/utils/TinyMCE/tiny-mce-editor';
import { PostQuote } from '@data/post-quote';
import { QuoteActionEnum, QuoteReducer } from '@reducers/quoteReducer';

const Page = () => {
  const initData ={
    id:'',
    title:'',
    reference:'',
    content: '',
    errored: true
}

const [state, dispatch] = useReducer(QuoteReducer, initData);
const [Loading, setLoading] = useState(false)
const [errors, setErrors] = useState<string>()
const [success, setSuccess] = useState(false)
const [errored, setErrored] = useState(true)


const SubmitForm = async (e:any) =>{
    e.preventDefault();
    setSuccess(false)
    CheckMandatory()
    if (!errored){
        setErrors('')
        setLoading(true)
        try{
          const {data, errors} = await PostQuote({...state}) 
          if(data){
            setSuccess(true)
            dispatch({type: QuoteActionEnum.RESET, payload: initData})
          } else{
            setSuccess(false)
            setErrors(errors?.[0].message)
          }
        }
        catch (e:any) {
          console.log(e['message'])
          if(e['networkError'])
            setErrors(e['networkError']);
          if(e['message'])
            setErrors(e['message']); 
       }
        setLoading(false)
    }

}

  const CheckMandatory =() =>{
    if(state.title == undefined || state.title.trim() == '')
        dispatch({type: QuoteActionEnum.CHANGE_TITLE_ERROR, payload:'title is a required field!'})
    if(state.reference == undefined || state.reference.trim() == '')
        dispatch({type: QuoteActionEnum.CHANGE_REFERENCE_ERROR, payload:'reference is a required field!'})
    if(state.content == undefined || state.content.trim() =='')
        dispatch({type: QuoteActionEnum.CHANGE_CONTENT_ERROR, payload:'message is a required field'})
  }
  useEffect(() => {
      if(state.errored)   
          setErrored(true)
      else
          setErrored(false)

  }, [state])
  return (
    <>
      <div className='flex flex-row justify-center py-6'>
        <div className='w-full md:w-1/2 px-4 md:px-8 py-6 shadow-md bg-white rounded-md'>
          <h2 className='flex text-3xl text-center font-bold justify-center text-gray-900 '>Hello!<FaRegHandSpock size="30px" color="maroon"/></h2>
          <form className="mt-6 flex flex-col gap-y-2 relative " onSubmit={SubmitForm} method='post'>
            <div className='w-full flex justify-center'>
              <h4 className='text-xl text-green-400 text-center font-bold my-3 md:w-4/5'>{success?'Your message has been sent for review, You can write another and resubmit': 'Are you interested in writing uplifting quotes for those in need?'}</h4>
            </div>
            <FormUtils errors={errors} loading={Loading} success={success}/>        
            <InputComponent type='text' placeholder='Example: Love' value={state.title} error={state.title_error} name='Title' onChange={(e:any) => dispatch({type: QuoteActionEnum.CHANGE_TITLE, payload: e.target.value})} />
            <InputComponent type='text' placeholder='Example: John 3:16' value={state.reference} error={state.reference_error} name='Reference' onChange={(e:any) => dispatch({type: QuoteActionEnum.CHANGE_REFERENCE, payload: e.target.value})} />
            {/* <TextAreaComponent value={state.content} error={state.content_error} name='Message' onChange={(e:any) => dispatch({type: QuoteActionEnum.CHANGE_CONTENT, payload: e.target.value})} /> */}
            <TinyMCEEditor textareaName='Message' className='w-full' error={state.content_error} value={state.content} onEditorChange={(a:string) => dispatch({type: QuoteActionEnum.CHANGE_CONTENT, payload: a})}/>
            <div className="flex justify-center py-7 px-7">
                <PrimarySubmitButton type='submit' text="Submit your message" />
              </div>
              <div className="text-xs font-light text-center text-gray-700">
                <Link href='/' className="font-medium hover:underline">
                    Back Home
                </Link>
              </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Page
