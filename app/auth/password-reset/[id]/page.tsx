'use client'

import Link from 'next/link'
import React, { useEffect, useReducer, useState } from 'react'
import FormUtils from '../../../../components/utils/form-utils'
import InputComponent from '../../../../components/utils/input-component'
import { PasswordReset } from '../../../../data/auth_mutation'
import { RegisterActionEnum, RegisterReducer } from '../../../../reducers/registerReducer'

const Page = ({params}:{params:{id: string}}) => {
    const initData ={
        username:'',
        password:'',
        password1:'',
        password2: '',
        email: '',
        errored: true
    }
    const [state, dispatch] = useReducer(RegisterReducer, initData);
    const [token, setToken] = useState<string>(params.id)
    const [Loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<string>()
    const [success, setSuccess] = useState(false)
    const [errored, setErrored] = useState(true)

    const SubmitForm = async (e:any) =>{
        e.preventDefault();
        await CheckMandatory();
        setSuccess(false)
        setErrors('')
        setLoading(true)
        try{
            if (!errored){
                const data = await PasswordReset(
                    {
                        token: token,
                        newPassword1: state.password1,
                        newPassword2: state.password2
                    }) 
                    console.log(data)
                    if(data.success){
                        setSuccess(true)
                    } else{
                        let errorMessage = Object.values(data.errors)[0][0].message
                        if(errorMessage)
                            setErrors(errorMessage)
                        else
                            setErrors('Invalid Token!')
                    }
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
    const CheckMandatory =async () =>{
        if(state.password1 == undefined || state.password1 == '')
            dispatch({type: RegisterActionEnum.CHANGE_PASSWORD1_ERROR, payload:'Password is a required Field!'})
        if(state.password2 == undefined || state.password2 == '')
            dispatch({type: RegisterActionEnum.CHANGE_PASSWORD2_ERROR, payload:'Repeat Password is a required Field!'})
        }
    useEffect(() => {
         if(state.errored)   
            setErrored(true)
        else
            setErrored(false)
    
    },[state])
  return (
    <>
        <div className='py-3 w-full'>
            <h1 className="text-3xl font-semibold text-center w-full text-maroon-700 underline decoration-wavy">
                Reset Password
            </h1>
        </div>
        <form className="mt-6 flex flex-col gap-y-2 relative" onSubmit={(e)=>SubmitForm(e)}  method='post'>
            <FormUtils errors={errors} loading={Loading} success={success} successMessage={`Password reset successful, you can go ahead to login`}/>                
            <p className='text-sm '>{`Please enter your new password.`}</p>
            <InputComponent type='password' value={state.password1} error={state.password1_error} name='Password' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_PASSWORD1, payload: e.target.value})} />
            <InputComponent type='password' value={state.password2} error={state.password2_error} name='Repeat Password' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_PASSWORD2, payload: e.target.value})} />
            <div className="mt-6">
                <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-maroon-700 rounded-md hover:bg-maroon-600 focus:outline-none focus:bg-maroon-600">
                    Reset
                </button>
            </div>
        </form>
        <p className="mt-2 text-xs font-light text-center text-gray-700">
            <Link href='/auth/login' className="font-medium text-maroon-600 hover:underline">
                    Login
            </Link>
        </p>
    </>
  )
}

export default Page
