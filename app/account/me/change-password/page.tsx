'use client'

import React,{useReducer, useState, useEffect, useContext} from 'react'
import FormUtils from '@components/utils/form-utils';
import InputComponent from '@components/utils/input-component';
import { AuthContext } from '@context/auth';
import { MessageContext,MessagesContextType } from '@components/toast/context';
import { AuthContextType } from '@context/types';
import { PasswordChange } from '@data/auth_mutation';
import { RegisterActionEnum, RegisterReducer } from '@reducers/registerReducer';

const Page = () => {
    
    const initData ={
        username:'',
        password:'',
        password1:'',
        password2: '',
        email: '',
        errored: true
    }

    const auth = useContext(AuthContext) as AuthContextType
    const [state, dispatch] = useReducer(RegisterReducer, initData);
    const [Loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<string>()
    const [success, setSuccess] = useState(false)
    const [errored, setErrored] = useState(true)
    const Messages = useContext(MessageContext) as MessagesContextType
    const SubmitForm = async (e:any) =>{
        e.preventDefault();
        setSuccess(false)
        CheckMandatory()
        if (!errored){
            setErrors('')
            setLoading(true)
            try{

                const data = await PasswordChange(
                    {
                        oldPassword: state.password, 
                        newPassword1: state.password1, 
                        newPassword2: state.password2, 
                    }) 
                    if(data.success){
                        setSuccess(true)
                        RegisterActionEnum.RESET
                        auth.login(data.token)
                        Messages.setSuccess('Password Change Successful')
                    } else{
                        let errorMessage = Object.values(data.errors)[0][0].message
                        if(errorMessage)
                            setErrors(errorMessage)
                        else
                            setErrors('Failed to update password!')
                    }
                }
                catch (e:any) {
                    // for(let i in e){
                    //   console.log(i, e[i])
                    // }
                    if(e['networkError']){
                        setErrors(e['networkError'].split('\n')[0]);
                        Messages.setErrors([e['networkError'].split('\n')[0]])
                    }
                    if(e['message']){
                        setErrors(e['message']);    
                        Messages.setErrors([e['message'].split('\n')[0]])
                    }                 
                 }
            setLoading(false)
        }
    }

    const CheckMandatory =() =>{
        if(state.password == undefined || state.password == '')
            dispatch({type: RegisterActionEnum.CHANGE_PASSWORD_ERROR, payload:'Password is a required Field!'})
        if(state.password1 == undefined || state.password1 == '')
            dispatch({type: RegisterActionEnum.CHANGE_PASSWORD1_ERROR, payload:'New Password is a required Field!'})
        if(state.password == undefined || state.password == '')
            dispatch({type: RegisterActionEnum.CHANGE_PASSWORD2_ERROR, payload:'Confirmation Password is a required Field!'})
        
    }
    useEffect(() => {
         if(state.errored)   
            setErrored(true)
        else
            setErrored(false)
        if(success){
        }
    }, [state, success])
  return (
    <div>
      <h1 className='text-xl font-bold'>
        Change Password
      </h1>
      <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            <div className="flex flex-col bg-gray-100 dark:bg-gray-950 py-4 px-4 rounded-xl">
            <form className="mt-6 flex flex-col gap-y-2 relative" onSubmit={SubmitForm} method='post'>
                <FormUtils errors={errors} loading={Loading} success={success} dark/>        
                <p className='text-sm '>{`Please fillin the below form to change your password`}</p>
                <InputComponent dark type='password' value={state.password} error={state.password_error} name='Old Password' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_PASSWORD, payload: e.target.value})} />
                <InputComponent dark type='password' value={state.password1} error={state.password1_error} name='New Password' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_PASSWORD1, payload: e.target.value})} />
                <InputComponent dark type='password' value={state.password2} error={state.password2_error} name='Confirm New Password' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_PASSWORD2, payload: e.target.value})} />
                <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-maroon-700 rounded-md hover:bg-maroon-600 focus:outline-none focus:bg-maroon-600">
                        Change
                    </button>
                </div>
            </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Page
