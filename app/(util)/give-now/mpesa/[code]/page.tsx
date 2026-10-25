'use client'


import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import React, { useReducer, useState, useEffect, useCallback, useContext } from 'react'
import { HiOutlineInformationCircle } from "react-icons/hi2";
var CryptoJS = require("crypto-js");

import { PrimarySubmitButton, TextFormButton } from '@components/buttons';
import FormUtils from '@components/utils/form-utils';
import {GivingInputComponent} from '@components/utils/input-component';
import Toggler from '@components/toggle';
import { MpesaActionEnum, MpesaReducer } from '@reducers/mpesaReducer';
import { FetchPaymentType, MpesaType, PaymentType, PostMpesa } from '@data/mpesa';
import ValidateEmail, { ValidatePhoneNumber } from '@utils/validate-util';
import { Loader3 } from '@components/loader'
import Switch from '@components/utils/switch';
import { secret_key } from '@utils/client-constants';
import { MessageContext, MessagesContextType } from '@components/toast/context';
const successMessage = 'Transaction initiated. Please enter your MPESA PIN on your phone.';

export const dynamic = 'force-dynamic'
const Page = ({ params }: { params: { code: string } }) => {
  const Messages = useContext(MessageContext) as MessagesContextType

  const initData = {
    name: '',
    phone: '',
    email: '',
    district: '',
    church: '',
    errored: true,
    save: false,
    lines: []
  }
  const [state, dispatch] = useReducer(MpesaReducer, initData);
  const [Loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string>()
  const [success, setSuccess] = useState(false)
  const [errored, setErrored] = useState(true)
  const [page, setPage] = useState(1);
  const [payTypes, setPayTypes] = useState<PaymentType[]>()
  const router = useRouter()
  // const [payType, setPayType] = useState<string>()

  const FetchTypes = async () => {
    try {
      let data = await FetchPaymentType(params.code.toUpperCase());
      if (data.length < 1)
        return notFound()
      setPayTypes(data);
    }
    catch (e: any) {
      if (e['networkError'])
        Messages.setErrors(e['networkError']);
      if (e['message'])
        Messages.setErrors(e['message']);
    }
  }

  const SubmitForm = async (e: any) => {
    e.preventDefault();
    if (Loading)
      return
    // FixAmount()
    setSuccess(false)
    if (!errored) {
      setErrors('')
      setLoading(true)
      try {
        const { result, errors } = await PostMpesa({ ...state })
        if (result) {
          setSuccess(true)
          Messages.setSuccess(successMessage, { position: 'top-right' })
          dispatch({ type: MpesaActionEnum.CLEAR_LINES })
          SaveDefault()
          router.push(`/give-now/confirm/${result.id}`)
        } else {
          setSuccess(false)
          setErrors(errors?.[0].message)
          Messages.setErrors(errors?.[0].message || 'There was an error!', { position: 'top-right' });
        }
      }
      catch (e: any) {
        // console.log(e['message'])
        if (e['networkError']) {
          setErrors(e['networkError']);
          Messages.setErrors(e['networkError']);
        }
        if (e['message']) {
          setErrors(e['message']);
          Messages.setErrors(e['message'], { position: 'top-right' });
        }
      }
      setLoading(false)
    }

  }

 
  const updateLines = (index: number, newValue: number) => {
    const updatedLines = state.lines !== undefined ? [...state?.lines] : [];
    updatedLines[index] = { code: payTypes?.[index].code || '', amount: newValue };
    dispatch({ type: MpesaActionEnum.CHANGE_LINES, payload: updatedLines });
  };

  const CheckMandatory = useCallback(() => {
    if (state.name == undefined || state.name.trim() == '')
      dispatch({ type: MpesaActionEnum.CHANGE_NAME_ERROR, payload: 'Name is a required field!' })
    if (state.phone == undefined || state.phone.trim() == '')
      dispatch({ type: MpesaActionEnum.CHANGE_PHONE_ERROR, payload: 'Phone Number is a required field! i.e 07xxxxxxxx' })
    if (state.email == undefined || state.email.trim() == '')
      dispatch({ type: MpesaActionEnum.CHANGE_EMAIL_ERROR, payload: 'Email is a required field!' })
    if (state.email !== '' && !ValidateEmail(state.email.trim()))
      dispatch({ type: MpesaActionEnum.CHANGE_EMAIL_ERROR, payload: 'Invalid Email Address!' })
    if (state.phone !== '' && !ValidatePhoneNumber(state.phone.trim()))
      dispatch({ type: MpesaActionEnum.CHANGE_PHONE_ERROR, payload: 'Invalid Phone Number!' })

  }, [state.name, state.phone, state.email])

  const SaveDefault = () => {
    if (state.save) {
      window.localStorage.setItem('giving-mpesa', CryptoJS.AES.encrypt(JSON.stringify(state), secret_key).toString())
    }
  }
  const GetDefault = () => {
    let ciphertext = window.localStorage.getItem('giving-mpesa')
    if ((ciphertext == null) || (ciphertext == '')) {
      return
    }
    try {
      var bytes = CryptoJS.AES.decrypt(ciphertext, secret_key);
      var decryptedData: MpesaType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      dispatch({ type: MpesaActionEnum.RESET, payload: decryptedData })
      dispatch({ type: MpesaActionEnum.CLEAR_LINES })
    } catch (error) {
      console.log(error)
    }
  }

  const UpdateSave = () => {
    dispatch({ type: MpesaActionEnum.SWITCH_SAVE, payload: '' })
    if (!state.save) {
      window.localStorage.removeItem('giving-mpesa')
    }
  }

  useEffect(() => {
    CheckMandatory()
    setErrored(state.errored || false)
  }, [state.errored, CheckMandatory])

  useEffect(() => {
    GetDefault()
    FetchTypes();
  }, [])

  return (
    <>
      <div className='flex flex-col flex-grow items-center justify-center lg:min-h-screen'>
        <div className='2xl:w-2/4 xl:w-4/5 3xl:w-1/3 w-full'>
          <Toggler className='text-maroon-700 bg-maroon-50 rounded-md p-4' title={
            <div className="font-bold flex align-middle items-center gap-3 lg:w-full">
              <HiOutlineInformationCircle width={50} height={50} className='w-6 h-6' />
              Instructions on how to pay using M-Pesa </div>}
          >
            <ol className='list-decimal list-inside text-md leading-5 pl-5 transition-all duration-1000'>
              <li className="text-body-2"> Enter your correct safaricom phone number </li>
              <li className="text-body-2"> Enter the amount on then options </li>
              <li className="text-body-2"> Click on the submit button </li>
              <li className="text-body-2"> You will receive a prompt on your phone to enter your M-PESA pin </li>
              <li className="text-body-2"> Enter your M-PESA pin </li>
              <li className="text-body-2"> You will receive a confirmation message on your phone </li>
              <li className="text-body-2"> Wait for the receipt to be sent to your by sms/email </li>
            </ol>
          </Toggler>
        </div>
        <div className='2xl:w-2/4 xl:w-4/5 3xl:w-1/3 w-10/12'>
          {/* <Stepper steps={steps} />   */}
          <form className="mt-6 relative xl:mx-5 " method='post' onSubmit={SubmitForm}>
            <FormUtils loading={Loading} success={success} successMessage={successMessage} />
              <div className='flex flex-col gap-y-2 '>
                <GivingInputComponent type='phone' placeholder='' value={state.phone} error={state.phone_error} name='Phone No.' onChange={(e: any) => dispatch({ type: MpesaActionEnum.CHANGE_PHONE, payload: e.target.value })} />
                <GivingInputComponent type='text' placeholder='' value={state.name} error={state.name_error} name='Name' onChange={(e: any) => dispatch({ type: MpesaActionEnum.CHANGE_NAME, payload: e.target.value })} />
                <GivingInputComponent type='email' placeholder='' value={state.email} error={state.email_error} name='Email' onChange={(e: any) => dispatch({ type: MpesaActionEnum.CHANGE_EMAIL, payload: e.target.value })} />
                {/* <GivingInputComponent type='text' placeholder='Enter Your District' value={state.district} name='District' onChange={(e:any) => dispatch({type: MpesaActionEnum.CHANGE_DISTRICT, payload: e.target.value})} /> */}
                {/* <GivingInputComponent type='text' placeholder='Enter Your Church' value={state.church} name='Church' onChange={(e:any) => dispatch({type: MpesaActionEnum.CHANGE_CHURCH, payload: e.target.value})} /> */}
               
                {payTypes && payTypes.map((payType, index) => {
                  return (
                    <GivingInputComponent min={0} key={payType.sequenceNo} type='number' placeholder='Enter Amount' value={state?.lines?.[index]?.amount} name={payType.code} displayName={payType.description} onChange={(e: any) => updateLines(index, e.target.value)} />
                  )
                })}
                <Switch checked={state.save} text='Remember me' setEnabled={UpdateSave} />
                <div className='my-2 hidden md:block w-full'>
                  <PrimarySubmitButton type='submit' disabled={Loading} text={`GIVE: KES ${state.total?.toFixed(2) || 0.00.toFixed(2)}`} icon={Loading && <Loader3 />} />
                </div>
                <div className='flex justify-center w-full left-0 bottom-1 md:hidden z-10 py-4' style={{ zIndex: 99999999999 }}>
                  <PrimarySubmitButton type='submit' disabled={Loading} text={`GIVE ${state.total?.toFixed(2) || 0.00.toFixed(2)}`} className='w-full' icon={Loading && <Loader3 />} />
                </div>
              </div>
          </form>
          <div className="text-xs font-light text-center text-gray-700 pt-3 pb-5">
            <Link href='/' className="font-medium hover:underline">
              Back Home
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}

export default Page
