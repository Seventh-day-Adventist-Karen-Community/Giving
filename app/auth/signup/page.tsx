'use client'

import Link from 'next/link';
import React, { useEffect, useReducer, useState } from 'react';
import FormUtils from '@components/utils/form-utils';
import InputComponent from '@components/utils/input-component';
import { SignUpUser } from '@data/auth_mutation';
import { RegisterActionEnum, RegisterReducer } from '@reducers/registerReducer';
import ValidateEmail from '@utils/validate-util';



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
        setErrors('')
        setSuccess(false)
        await CheckMandatory()
        if (!errored){
            setLoading(true)
            try{

                const data = await SignUpUser(
                    {
                        username: state.username, 
                        password1: state.password1, 
                        password2: state.password2, 
                        email:state.email,
                    }) 
                    if(data.success){
                        setSuccess(true)
                    } else{
                        let errorMessage = Object.values(data.errors)[0][0].message
                        if(errorMessage)
                            setErrors(errorMessage)
                        else
                            setErrors('An Error Occurred while performing an operation!')
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

    const CheckMandatory = async () =>{
        if(state.username == undefined || state.username == '')
            dispatch({type: RegisterActionEnum.CHANGE_USERNAME_ERROR, payload:'Username is a required Field!'})
        if(state.password1 == undefined || state.password1 == '')
            dispatch({type: RegisterActionEnum.CHANGE_PASSWORD1_ERROR, payload:'Password is a required Field!'})
        if(state.password2 == undefined || state.password2 == '')
            dispatch({type: RegisterActionEnum.CHANGE_PASSWORD2_ERROR, payload:'Repeat Password is a required Field!'})
        if(state.email == undefined || state.email == '')
            dispatch({type: RegisterActionEnum.CHANGE_EMAIL_ERROR, payload:'Email Address is a required Field!'})
        if(!ValidateEmail(state.email) && state.email != '')
            dispatch({type: RegisterActionEnum.CHANGE_EMAIL_ERROR, payload:'Invalid Email Address!'})
        if(state.password1 !== state.password2)
            dispatch({type: RegisterActionEnum.CHANGE_PASSWORD2_ERROR, payload:'Passwords Do not Match!'})
       
    }
    useEffect(() => {
         if(state.errored)   
            setErrored(true)
        else
            setErrored(false)
    
    }, [state])

    return (
        <>
            <div className='py-3 w-full'>
                <h1 className="text-3xl font-semibold text-center w-full text-maroon-700 underline decoration-wavy">
                    Sign Up
                </h1>
            </div>                
            <form className="mt-6 flex flex-col gap-y-2 relative" onSubmit={SubmitForm} method='post'>
                <FormUtils errors={errors} loading={Loading} success={success} successMessage='Account creation successful, please verify your email to complete registration by clicking on the link sent to it.'/>        
                <p className='text-sm '>{`Please enter details you'll use to authenticate to SDA Karen Community account.`}</p>
                <InputComponent type='text' value={state.username} error={state.username_error} name='Username' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_USERNAME, payload: e.target.value})} />
                <InputComponent type='email' value={state.email} error={state.email_error} name='Email' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_EMAIL, payload: e.target.value})} />
                <InputComponent type='password' value={state.password1} error={state.password1_error} name='Password' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_PASSWORD1, payload: e.target.value})} />
                <InputComponent type='password' value={state.password2} error={state.password2_error} name='Repeat Password' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_PASSWORD2, payload: e.target.value})} />
                <div className='text-xs'>
                    {`Aready Registered? `}
                    <Link href='/auth/resend' className=" text-maroon-600 hover:underline">
                        Resend Activation Email
                    </Link>                
                </div>
                
                <div className="mt-6">
                    <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-maroon-700 rounded-md hover:bg-maroon-600 focus:outline-none focus:bg-maroon-600">
                        Signup
                    </button>
                </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
                {" "}
                {`Have an account?`}{" "}
                <Link href='/auth/login' className="font-medium text-maroon-600 hover:underline">
                    Login
                </Link>
                
            </p>
        </>
    );
}
export default Page
