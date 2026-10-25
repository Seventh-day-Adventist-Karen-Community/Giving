'use client'

import {useState, useEffect, useRef} from 'react'

const CountDownRenderer = ({days, hours, minutes, seconds, completed }:{days:number, hours:number, minutes:number, seconds:number, completed:boolean }) => {
      return(
        <>
            {completed?
                <CompleteCounter caption='Countdown Complete'/>
            :
                <div className='flex flex-row justify-between gap-1 sm:justify-start sm:gap-7'>
                    <Counter caption='Days' count={days} />    
                    <Counter caption='Hours' count={hours} />    
                    <Counter caption='Minutes' count={minutes} />    
                    <Counter caption='Seconds' count={seconds} />    
                </div>
            }
        </>
    )
};

export default CountDownRenderer

const Counter = ({caption, count}:{caption:string,count:number})=>{
    let [counter, setCounter] = useState(count)
    useEffect(()=>{
        setCounter(count)
    }, [count])
    return(
    <div className='p-4 text-2xl font-bold bg-slate-100 rounded-md flex flex-col text-gray-900 text-center'>
        <div>
            {counter}
        </div>
        <div className='font-normal text-xs uppercase'>
            {caption}
        </div>
    </div>
    )
}

const CompleteCounter = ({caption}:{caption:string})=>{
    return(
    <div className='p-4 text-xl font-bold bg-slate-100 rounded-md flex flex-col text-gray-900 text-center'>
        <div className='uppercase'>
            {caption}
        </div>
    </div>
    )
}
