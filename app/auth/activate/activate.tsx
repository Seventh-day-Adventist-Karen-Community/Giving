'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FormUtils from '@components/utils/form-utils'
import { VerifyAccount } from '@data/auth_mutation'

const Activate = ({params}:{params:{id: string}}) => {
    const [token, setToken] = useState<string>(params.id)
    const [Loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<string>()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const ActivateUser = async () =>{
            setSuccess(false)
            setErrors('')
            setLoading(true)
            try{

                const data = await VerifyAccount(
                    {
                        token: token
                    }) 
                    console.log(data)
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
        ActivateUser();
    }, [token])
  return (
    <div className='relative'>
        <div className='py-3 w-full'>
            <h1 className="text-3xl font-semibold text-center w-full text-maroon-700 underline decoration-wavy">
                Account Activation
            </h1>
        </div>     
        <FormUtils errors={errors} loading={Loading} success={success} successMessage='Account activation successful.'/>
        <p className='text-sm '>{`Activate your account using a token.`}</p>
        <div className="mt-6 w-full">
            <Link href={'/auth/login'} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-maroon-700 rounded-md hover:bg-maroon-600 focus:outline-none focus:bg-maroon-600">
                Login
            </Link>
        </div>
    </div>
  )
}

export default Activate
