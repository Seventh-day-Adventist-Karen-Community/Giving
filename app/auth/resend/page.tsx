'use client'

import Link from 'next/link'
import React, { useEffect, useReducer, useState } from 'react'
import FormUtils from '@components/utils/form-utils'
import InputComponent from '@components/utils/input-component'
import { ResendActivationEmail } from '@data/auth_mutation'
import { RegisterActionEnum, RegisterReducer } from '@reducers/registerReducer'
import ValidateEmail from '@utils/validate-util'

const Page = () => {
    const initData ={
        username:'',
        password:'',
        password1:'',
        password2: '',
        email: '',
        errored: true
    }

    const [state, dispatch] = useReducer(RegisterReducer, initData);
    const [Loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<string>()
    const [success, setSuccess] = useState(false)
    const [errored, setErrored] = useState(true)

    const SubmitForm = async (e:any) =>{
        e.preventDefault();
        await CheckMandatory()
        setSuccess(false)
        if (!errored){
            setErrors('')
            setLoading(true)
            try{

                const data = await ResendActivationEmail(
                    {
                        email: state.email
                    }) 
                    if(data.success){
                        setSuccess(true)
                    } else{
                        let errorMessage = Object.values(data.errors)[0][0].message
                        if(errorMessage)
                            setErrors(errorMessage)
                        else
                            setErrors('Email Not Found!')
                    }
                }
                catch (e:any) {
                    // for(let i in e){
                    //   console.log(i, e[i])
                    // }
                    console.log(e['message'])
                    if(e['networkError'])
                      setErrors(e['networkError']);
                    if(e['message'])
                      setErrors(e['message']);
                    
                 }
            setLoading(false)
        }

    }
    const CheckMandatory =async () =>{
        if(state.email == undefined || state.email == '')
            dispatch({type: RegisterActionEnum.CHANGE_EMAIL_ERROR, payload:'Email Address is a required Field!'})
        if(!ValidateEmail(state.email) && state.email != '')
            dispatch({type: RegisterActionEnum.CHANGE_EMAIL_ERROR, payload:'Invalid Email Address!'})
    }
    useEffect(() => {
        if(state.errored)   
           setErrored(true)
       else
           setErrored(false)
   
   }, [state])

  return (
    <div>
         <div className='py-3 w-full'>
            <h1 className="text-3xl font-semibold text-center w-full text-maroon-700 underline decoration-wavy">
                Resend Activation Email
            </h1>
        </div>  
        <form className="mt-6 flex flex-col gap-y-2 relative" onSubmit={(e)=>SubmitForm(e)}  method='post'>
            <FormUtils errors={errors} loading={Loading} success={success} successMessage={`An activation link has been sent to the email. Thats if its registered.`}/>
            <p className='text-sm '>{`Didn't receive an activation link? Enter the email you used to create the account. A reset link will be sent to the email.`}</p>
            <InputComponent type='email' value={state.email} error={state.email_error} name='Email' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_EMAIL, payload: e.target.value})} />
            <div className="mt-6">
                <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-maroon-700 rounded-md hover:bg-maroon-600 focus:outline-none focus:bg-maroon-600">
                    Send Email
                </button>
            </div>
        </form>
        <p className="mt-2 text-xs font-light text-center text-gray-700">
            <Link href='/auth/login' className="font-medium text-maroon-600 hover:underline">
                    Login
            </Link>
        </p>
    </div>
  )
}

export default Page
