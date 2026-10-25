import React from 'react'

const NotFound = () => {
  return (
    <div className='mx-auto h-70vh flex flex-col justify-center text-gray-600'>
        <div className='font-serif mx-auto flex gap-2 flex-col align-middle'>
            <div className=' font-bold text-8xl text-gray-200 dark:text-gray-700 text-center py-2 border-gray-400 my-auto'>
                  404
              </div>
              <div className='my-auto text-center font-sans text-md'>
                  Sorry, this page could not be found.
              </div>
        </div>
    </div>
  )
}

export default NotFound