'use client'

import React, {useState, useReducer, useEffect} from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { GroupMemberActionEnum, GroupMemberReducer } from '../../reducers/joinGroupReducer'
import { TextButton } from '../buttons'
import JoinMember from '../../data/join-member'
import ValidateEmail,{ValidatePhoneNumber} from '../../utils/validate-util'
import InputComponent from '../utils/input-component'
import { ContactMethod } from '../../types/groupType'
import FormUtils from '../utils/form-utils'

const JoinGroup = (group:{id:string; contactMethods?: ContactMethod[]}) => {
    
    const initData = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNo: '',
        contactMethod:[],
        group: group.id,
        errored: true
    }
    
const [state, dispatch] = useReducer(GroupMemberReducer, initData);
const [Loading, setLoading] = useState(false)
const [errors, setErrors] = useState<string>()
const [success, setSuccess] = useState(false)
const [errored, setErrored] = useState(true)


const SubmitForm = async (e:any) =>{
    e.preventDefault();
    setSuccess(false)
    CheckMandatory()
    if (!errored && !state.errored){
        setErrors('')
        setLoading(true)
        try{

            const {data, errors} = await JoinMember(
                {
                    firstName: state.firstName, 
                    lastName: state.lastName, 
                    email: state.emailAddress, 
                    group:state.group, 
                    phone: state.phoneNo,
                    contactMethods: state.contactMethods
                }) 
                if(data){
                    setSuccess(true)
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
    if(state.firstName == undefined || state.firstName.trim() == '')
        dispatch({type: GroupMemberActionEnum.CHANGE_FIRSTNAME_ERROR, payload:'First Name is a required Field!'})
    if(state.lastName == undefined || state.lastName.trim() == '')
        dispatch({type: GroupMemberActionEnum.CHANGE_LASTNAME_ERROR, payload:'Last Name is a required Field!'})
    if(state.emailAddress == undefined || state.emailAddress.trim() =='')
        dispatch({type: GroupMemberActionEnum.CHANGE_EMAILADDRESS_ERROR, payload:'Email Address is a required Field!'})
    if(!ValidateEmail(state.emailAddress) && state.emailAddress.trim() != '')
        dispatch({type: GroupMemberActionEnum.CHANGE_EMAILADDRESS_ERROR, payload:'Invalid Email Address!'})
    if(state.phoneNo == undefined || state.phoneNo.trim() == '')
        dispatch({type: GroupMemberActionEnum.CHANGE_PHONENO_ERROR, payload:'Phone No. is a required Field!'})
    if(!ValidatePhoneNumber(state.phoneNo) && state.phoneNo.trim() != '')
        dispatch({type: GroupMemberActionEnum.CHANGE_PHONENO, payload:'Invalid Phone Number!'})   
   
}
    useEffect(() => {
         if(state.errored)   
            setErrored(true)
        else
            setErrored(false)
    
    }, [state])

  return (
    <form action="" onSubmit={(e)=>SubmitForm(e)} className ='relative' method='post'>
        <FormUtils errors={errors} loading={Loading} success={success}/>        
        <div className="my-4 flex flex-col md:flex-row flex-wrap gap-x-3 gap-y-4">
            <h4 className='text-xl text-green-400 font-bold my-3'>{success?'Your Message Has Been Sent': 'Are You Interested in this Karen Group?'}</h4>
            <p>We’ll let the KarenGroup leader know so they can follow up with more details.</p>
            {!success &&
            <>
                <InputComponent type='text' name='First Name' value={state.firstName} error = {state.firstName_error} className='md:w-64'
                    onChange={(e:any)=>dispatch({type: GroupMemberActionEnum.CHANGE_FIRSTNAME, payload: e.target.value})}/>

                <InputComponent type='text' name='Last Name' value={state.lastName} error = {state.lastName_error} className='md:w-64'
                    onChange={(e:any)=>dispatch({type: GroupMemberActionEnum.CHANGE_LASTNAME, payload: e.target.value})}/>
                
                <InputComponent type='email' name='Email Address' value={state.emailAddress} error = {state.emailAddress_error} className='md:w-64'
                    onChange={(e:any)=>dispatch({type: GroupMemberActionEnum.CHANGE_EMAILADDRESS, payload: e.target.value})}/>
            
                <InputComponent type='phone' name='Phone No.' value={state.phoneNo} error = {state.phoneNo_error} className='md:w-64'
                        onChange={(e:any)=>dispatch({type: GroupMemberActionEnum.CHANGE_PHONENO, payload: e.target.value})}/>
                
                <div className='md:w-64'>
                    <fieldset>
                        <legend>Preferred Contact Method</legend>
                    </fieldset>
                    <div className='flex flex-row gap-x-4'>
                        {
                            group.contactMethods?.map(contactMethod=>{
                                return(
                                    <div className='flex flex-row gap-x-2' key={contactMethod.id}>
                                        <input type="checkbox" name={contactMethod.id} id={contactMethod.id} onChange={(e:any)=>dispatch({type: GroupMemberActionEnum.TOGGLE_CONTACT_METHOD, payload: e.target.id})}/>
                                        <label htmlFor={contactMethod.id}>{contactMethod.name}</label>
                                    </div>
                                    )
                            })
                        }
                    </div>                            
                </div>
                <div className='my-6 w-full flex flex-col gap-y-6'>
                    <div className='mx-auto'>
                        <button type="submit" className='md:w-auto bg-maroon-600 hover:bg-maroon-700 text-white py-2 px-7 rounded-full shadow-md backdrop:shadow-sm hover:shadow-lg font-semibold z-0 flex flex-nowrap gap-3 justify-center transition-all text-center'>Submit</button>
                    </div>
                    <div className='mx-auto'>
                        <TextButton text='Search Another Karen Group' link='/group/search' icon ={<FaAngleRight/>} />
                    </div>
                </div>
                </>
            }
            </div>

    </form>
  )
}

export default JoinGroup