import { TogglerElementType } from '@customTypes/utilTypes'
import React from 'react'
import TogglerElement from './toggler'

const TogglerList = ({data, className}:{data:TogglerElementType[], className?:string}) => {
  return (
<div className={`px-2 py-2 shadow-md bg-maroon-50 ${className}`}>
{
     data.map(content =>{
        return (
        <div  key={content.id}>
                 <TogglerElement {...content} />
        </div>
        )
        })
}
</div>
  )
}

export default TogglerList