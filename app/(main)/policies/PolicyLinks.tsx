'use client'

import React, { useState, useCallback, useEffect } from 'react'
import NavbarTertiary from '../../../components/navbarTertiary'
import StaticPages from '../../../data/static_pages'
import { StaticPagesTypeChoices } from '../../../types/enums'

const PolicyLinks = () => {
  
  const [links, setLinks] = useState([{
    name:'default',
    path:'/'
  }
  ])

  const FetchData = useCallback(async() =>{
    const policies = await StaticPages({type:StaticPagesTypeChoices.POLICIES})
    if (policies) {
      let reqlinks = policies.map((policy)=>{
        return({
          name:policy.name,
          path: `/policies/${policy.slug}`
        })
      })
      setLinks(reqlinks)
    }
  },[])
  useEffect(() => {
    FetchData()
  }, [FetchData])
  

  return (
    <NavbarTertiary title='title' links={links}/>
  )
}

export default PolicyLinks