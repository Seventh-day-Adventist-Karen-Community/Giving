import Link from 'next/link'
import React from 'react'
import { Constants } from '@utils/constants'

const NotFound = () => {
  return (
    <div className='mx-auto h-screen flex flex-col justify-center text-gray-600'>
        <div className='font-serif mx-auto flex gap-2 flex-col align-middle'>
            <div className=' font-bold text-8xl text-gray-200 text-center py-2 border-gray-400 my-auto'>
                  404
              </div>
              <div className='my-auto text-center font-sans text-md'>
                  Sorry, this page could not be found, below are some useful links
              </div>
            <div className=' py-3 my-auto flex flex-row justify-center font-sans text-center gap-3 h-12 font-normal'>
                <Link className='font-semibold text-maroon-700 hover:border-b-2 hover:border-maroon-700 leading-tight transition-all' href={'/'}>Back Home</Link>
                <a className='font-semibold text-maroon-700 hover:border-b-2 hover:border-maroon-700 leading-tight transition-all' href={Constants.STUDIO_URL}>Watch</a>
                <Link className='font-semibold text-maroon-700 hover:border-b-2 hover:border-maroon-700 leading-tight transition-all' href={'/contact-us'}>Contact Us</Link>
                <Link className='font-semibold text-maroon-700 hover:border-b-2 hover:border-maroon-700 leading-tight transition-all' href={'/giving'}>Give</Link>
                <Link className='font-semibold text-maroon-700 hover:border-b-2 hover:border-maroon-700 leading-tight transition-all' href={'/auth/login'}>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound