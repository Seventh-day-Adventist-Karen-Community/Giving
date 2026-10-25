import React from 'react'
import styling from "../../../../styles/styles.js"


const Page = () => {
  return (
    <>
    <div className='h-80 bg-black relative'></div>
    <div className='absolute top-20 flex justify-center text-align flex-col w-full'>
    <span className='text-4xl text-white  md:text-4xl lg:text-6xl text-800 pt-9 font-bold flex justify-center text-center'>Tools for growth</span>
    <span className='text-xl text-white text-200 pt-9 font-medium flex justify-center text-center'>Spiritual growth doesn’t just happen during services. Use these apps and resources to seek God during the week.</span>
    </div> 
    <div className='text-4xl text-black text-500 pt-9 font-bold flex justify-center text-center'>Take your faith deeper</div>
    </>
  )
}

export default Page
