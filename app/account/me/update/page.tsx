'use client'

import { getCookie } from 'cookies-next';
import React,{useReducer, useState, useEffect, useContext} from 'react'
import FormUtils from '@components/utils/form-utils';
import InputComponent, { FileComponent } from '@components/utils/input-component';
import { AccountContext } from '@context/account';
import { MessageContext,MessagesContextType} from '@components/toast/context';
import { AccountContextType } from '@context/types';
import { UpdateAccount } from '@data/auth_mutation';
import { RegisterActionEnum, RegisterReducer } from '@reducers/registerReducer';

const Page = () => {
    const account = useContext(AccountContext) as AccountContextType;
    const initData ={
        firstname: account.data.me?.firstName || '',
        lastname: account.data.me?.lastName || '',
        phone_number: account.data.me?.setup.phoneNumber || '',
        address: account.data.me?.setup.address || '',
        avatar: '',
        avatar_name: account.data.me?.setup.avatar || '',
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
    const Messages = useContext(MessageContext) as MessagesContextType
    const SubmitForm = async (e:any) =>{
        e.preventDefault();
        setSuccess(false)
        CheckMandatory()
        if (!errored){
            setErrors('')
            setLoading(true)
            try{

                const data = await UpdateAccount(
                    {
                        firstName: state.firstname || '', 
                        lastName: state.lastname || '', 
                        address: state.address || '',
                        phoneNumber: state.phone_number || '',
                        avatar: state.avatar
                    }) 
                    if(data.success){
                        setSuccess(true)
                        let me = account.data.me
                        if(me){
                            account?.setCMe?.({
                                ...me,
                                firstName: state.firstname||'',
                                lastName: state.lastname || '', 
                                setup:{
                                    ...me.setup,
                                    address: state.address || '',
                                    phoneNumber: state.phone_number || me.setup.phoneNumber,
                                    avatar: state.avatar ? URL.createObjectURL(state.avatar): me.setup.avatar
                                }
                            })
                        }
                        Messages.setSuccess('Account Update Successful')
                    } else{
                        let errorMessage = Object.values(data.errors)[0][0].message
                        if(errorMessage)
                            setErrors(errorMessage)
                        else
                            setErrors('Failed to update account!')
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
        if(state.firstname == undefined || state.firstname == '')
            dispatch({type: RegisterActionEnum.CHANGE_FIRSTNAME_ERROR, payload:'First Name is a required Field!'})
        if(state.lastname == undefined || state.lastname == '')
            dispatch({type: RegisterActionEnum.CHANGE_LASTNAME_ERROR, payload:'Last Name is a required Field!'})  
        if(state.phone_number == undefined || state.phone_number == '')
            dispatch({type: RegisterActionEnum.CHANGE_PHONE_NUMBER_ERROR, payload:'Phone Number is a required Field!'})  
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
        Update Account
      </h1>
      <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            <div className="flex flex-col rounded-xl bg-gray-100 dark:bg-gray-950 py-4 px-4">
            <form className="mt-6 flex flex-col gap-y-2 relative" onSubmit={SubmitForm} method='post'>
                <FormUtils errors={errors} loading={Loading} success={success} dark/>        
                <p className='text-sm '>{`Please fill in the form below to update your details`}</p>
                <InputComponent dark type='text' value={state.firstname || ''} error={state.firstname_error} name='First Name' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_FIRSTNAME, payload: e.target.value})} />
                <InputComponent dark type='text' value={state.lastname || ''} error={state.lastname_error} name='Last Name' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_LASTNAME, payload: e.target.value})} />
                <InputComponent dark type='phone' value={state.phone_number || ''} error={state.phone_number_error} name='Phone Number' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_PHONE_NUMBER, payload: e.target.value})} />
                <InputComponent dark type='text' value={state.address || ''} error={state.address_error} name='Address' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_ADDRESS, payload: e.target.value})} />
                <FileComponent fileName={state.avatar_name} dark accept='image/*' error={state.avatar_error} name='Avatar' onChange={(e:any) => dispatch({type: RegisterActionEnum.CHANGE_AVATAR, payload: e.target.files[0]})} />
                <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-maroon-700 rounded-md hover:bg-maroon-600 focus:outline-none focus:bg-maroon-600">
                        Update
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
