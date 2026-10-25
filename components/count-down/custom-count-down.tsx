'use client'

import React,{useState, useEffect} from 'react'
import Countdown from 'react-countdown'
import CountDownRenderer from './renderer'
const CustomCountDown = ({date}:{date?:Date|string|number}) => {
    let [countDownTo, setCountDownTo] = useState<Date|string|number|undefined>(date)

    useEffect(() => {
        setCountDownTo(date)        
    }, [date])

   
  return (
    <div>
        <Countdown date={countDownTo} renderer={CountDownRenderer}/>
    </div>
  )
}

export default CustomCountDown
