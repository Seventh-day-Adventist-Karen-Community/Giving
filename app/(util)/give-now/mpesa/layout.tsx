import { Constants } from '@utils/constants';
import Image from 'next/image';
import React from 'react'

export const metadata = {
  title: "Give Now | Karen Community SDA",
  description: "Give Now | Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Give Now | Karen Community SDA',
      description: 'Give Now | Seventh Day Adventist Church Karen Community',
    },
};
const Layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <div className='bg-slate-50 min-h-screen'>
       <div className='flex flex-row justify-center w-full h-full'>
        <div className='lg:w-1/2 bg-cover hidden lg:block bg-center bg-fixed relative' style={{backgroundImage: `url(${Constants.IMAGE_BASE_URL}/kcc/Resources/giving-kcc-back.jpg)`}}>
         <div className='bg-gray-950 rounded-xl visible text-center p-5 bg-opacity-5 fixed top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2'>
          <div className='flex justify-center'>
            <Image src="/logo.svg" width={300} height={150} alt="Image" />
          </div>
          {/* <h2 className='flex text-lg text-center font-bold justify-center text-gray-200 '>
            Karen Community Seventh Day Adventist
          </h2> */}
          <p className='text-center text-gray-200 font-bold'>Giving Platform</p>
         </div>
        </div>
        
        <div className='w-full lg:w-1/2 md:w-1/2 shadow-md bg-white rounded-md'>
         <div className='bg-cover lg:hidden bg-center ' style={{backgroundImage: `url(${Constants.IMAGE_BASE_URL}/kcc/Resources/giving-kcc-back.jpg)`}}>
         <div className='bg-gray-950 text-center p-5 bg-opacity-5 '>
          <div className='flex justify-center'>
            <Image src="/logo.svg" width={200} height={100} alt="Image" />
            {/* <Image src="/icon-512x512.png" width={100} height={100} alt="Image" /> */}
          </div>
          {/* <h2 className='flex text-md text-center font-bold justify-center text-gray-200 '>
            Karen Community Seventh Day Adventist
          </h2> */}
          <p className='text-center text-sm text-gray-200 font-bold'>Giving Platform</p>
         </div>
        </div>
      {children}
      </div>
      </div>      
      </div>
  )
}

export default Layout
