'use client'

import {useState, useEffect} from 'react'
import { NormifyURL } from '../utils/normify-url'

const UseProgressiveImage = (src:string) => {  
    const [sourceLoaded, setSourceLoaded] = useState<string|null>(null)
  
    useEffect(() => {
      const img = new Image()
      img.src =  NormifyURL(src)
      img.onload = () => setSourceLoaded(src)
    }, [src])
  
    return sourceLoaded 
  }

export default UseProgressiveImage