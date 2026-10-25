import React from 'react'
const Layout = ({children, beliefs
}: {
  children: React.ReactNode,
  beliefs: React.ReactNode
}) => {
  return (
    <>
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex flex-col-reverse sm:flex-row justify-start'>
    {beliefs}
    {children}
    </div>
    </>
  )
}

export default Layout