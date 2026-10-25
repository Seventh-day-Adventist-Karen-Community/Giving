import React from 'react'

const MenuGroups = ({title, children, className}:{title?:string, children?:React.ReactNode, className?: string}) => {
  return (
    <div className={className}>
        {title && 
        <div className='text-lg font-bold pt-7'>
            {title}
        </div>}
        <div className='flex flex-col'>
            {children}
        </div>
    </div>
  )
}

export default MenuGroups