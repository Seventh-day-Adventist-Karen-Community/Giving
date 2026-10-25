'use client'

import React, { useEffect, useReducer, useState, useContext } from 'react';
import FormUtils from '@components/utils/form-utils';
import InputComponent from '@components/utils/input-component';
import { LoginActionEnum, LoginReducer } from '@reducers/loginReducer';
import { MessageContext,MessagesContextType } from '@components/toast/context';
import { AuthContextType } from '@context/types';
import { login } from '@app/actions/auth';

export const metadata = {
    title: "Account Login | Karen Community SDA",
    description: "Account Login | Seventh Day Adventist Church Karen Community",
    openGraph: {
        title: 'Account Login | Karen Community SDA',
        description: 'Account Login | Seventh Day Adventist Church Karen Community',
      },
  };
  
const Login = ({ params,searchParams,}: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined }}) => {
    const next = Array.isArray( searchParams?.['next']) ?  searchParams?.['next'][0] : searchParams?.['next']
    const initData ={
        username:'',
        password:'',
        password1:'',
        password2: '',
        email: '',
        errored: true
    }

    const [state, dispatch] = useReducer(LoginReducer, initData);
    const [Loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<string>()
    const [success, setSuccess] = useState(false)
    const [errored, setErrored] = useState(true)
    const Messages = useContext(MessageContext) as MessagesContextType
   
    const SubmitForm = async (e:any) =>{
        e.preventDefault();
        setSuccess(false)
        const hasError = CheckMandatory()
        if (!hasError){
           if (!hasError){
            setErrors('')
            setLoading(true)
            const errors = await login({
                        username: state.username, 
                        password: state.password, 
                    }, next)

            if (errors){
                const errorMessage = Object.values(errors as Record<string, { message: string }[]>)[0][0].message
                setErrors(errorMessage)
                Messages.setErrors(errorMessage, {position: 'top-center'})
            } else{
                Messages.setSuccess('Login Successfull, Redirecting...', {position:'top-center'})
            }
            setLoading(false)
        }
    }
    }

    const CheckMandatory = () =>{
        let hasError = false
        if(state.username == undefined || state.username == ''){
            dispatch({type: LoginActionEnum.CHANGE_USERNAME_ERROR, payload:'Username is a required Field!'})
            hasError = true
        }
        if(state.password == undefined || state.password == ''){
            dispatch({type: LoginActionEnum.CHANGE_PASSWORD_ERROR, payload:'Password is a required Field!'})
            hasError = true
        }
        return(hasError)
    }

    useEffect(()=>{
        if (next){
            Messages.setAlert('Your session has been terminated due to security reasons', {position:'bottom-center'})
            }
    }, [next])
    return (
        <>                
            <form className="mt-6 flex flex-col gap-y-2 relative" onSubmit={SubmitForm} method='post'>
                <FormUtils errors={errors} loading={Loading} success={success}/>        
                <p className='text-sm '>{`Please enter your credentials to login.`}</p>
                <InputComponent type='text' value={state.username} error={state.username_error} name='Username' onChange={(e:any) => dispatch({type: LoginActionEnum.CHANGE_USERNAME, payload: e.target.value})} />
                <InputComponent type='password' value={state.password} error={state.password_error} name='Password' onChange={(e:any) => dispatch({type: LoginActionEnum.CHANGE_PASSWORD, payload: e.target.value})} />
                <a href="/auth/password-reset" className="text-xs text-maroon-600 hover:underline" >
                    Forgot Password?
                </a>
                <div className="mt-6">
                    <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-maroon-700 rounded-md hover:bg-maroon-600 focus:outline-none focus:bg-maroon-600">
                        Login
                    </button>
                </div>
            </form>
        </>
    );
}

export default Login
