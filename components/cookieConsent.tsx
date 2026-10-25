'use client'

import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { PostCookieConsent } from '../data/analytic'

const CookieConsent = () => {
    let [consented, setConsented] = useState(true)

    const sendConsent = async (consent:boolean) =>{
        let cookie = window.localStorage.getItem('identity')||''
        let consentedJson ={cookie:cookie, consented: consent}
        window.localStorage.setItem('sdakcc', JSON.stringify(consentedJson))
        setConsented(consent)
        await PostCookieConsent(consentedJson)
    }

    useEffect(()=>{
        let consentedJson = {
            consented:false,
            cookie:''
        }
        let consentedJsonString =  window.localStorage.getItem('sdakcc')
        if (consentedJsonString){
            consentedJson = JSON.parse(consentedJsonString)
        }
        setConsented(consentedJson.consented)
        return(()=>{
            setConsented(true)
        })        
        // setCookie(window.localStorage.getItem('identity')||'')
    }, [consented])
    

  return (
        !consented ?
        <div className="flex justify-between items-center gap-2 bg-gray-100 px-4 py-2 fixed bottom-0 left-0 w-full" style={{zIndex:21474830308}}>
            <p className="text-sm text-gray-700">
                We use cookies to ensure you get the best experience on our website. Learn more 
                <Link href="/policies/cookies" className="underline pl-1">here</Link>.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded-full" onClick={()=>sendConsent(true)}>
                Accept
            </button>
        </div>
        :<></>
        
  )
}

export default CookieConsent