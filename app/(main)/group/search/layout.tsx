import React from 'react'
import { FaAngleRight, } from 'react-icons/fa'
import { PrimaryButton, TextButton } from '../../../../components/buttons'


export const metadata = {
  title: "Search For LIfe Groups | Karen Community SDA",
  description: "You were designed by God to live in community. Now is the perfect time to join a LifeGroup, where you can be real and belong.",
  openGraph: {
      title: 'Search For LIfe Groups | Karen Community SDA',
      description: 'You were designed by God to live in community. Now is the perfect time to join a LifeGroup, where you can be real and belong.',
    },
};

const Layout = ({children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
        <div className='bg-gray-100 py-3'>
            <div className=' flex flex-col gap-y-3 text-center   md:flex-row justify-center gap-x-4 align-middle mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 '>

                <div className='my-auto text-lg'>
                    Take your first step to become a KarenGroup leader today.
                </div>
                <PrimaryButton link='/account/groups/new' text='Start a KarenGroup'/>
            </div>
        </div>
        <div className='mx-auto max-w-7xl pt-7 pb-3 px-2 sm:px-6 lg:px-8 '>
            <h1 className='text-xl font-bold'>
                Find a KarenGroup or Local Mission Partner
            </h1>
        </div>
    {children}
    </div>
  )
}

export default Layout