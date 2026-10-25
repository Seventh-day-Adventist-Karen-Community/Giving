'use client'

import { notFound } from 'next/navigation';
import React from 'react'
import FetchAdventistBeliefs from '@data/adventist_beliefs';
import { BeliefsType, CreateBeliefsType } from 'types/detailsType';
import ActivityForm from '../../form';

const FetchBelief = async (pslug:string) =>{
    let data = FetchAdventistBeliefs(pslug)
    return(data)
  }

const Page = async ({ params, searchParams,}:{
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const beliefs = await FetchBelief(params.slug)
    if (beliefs == undefined){
      return notFound()
    }
    let belief:BeliefsType = beliefs[0]
    function FormatData():CreateBeliefsType{
        return({
            ...belief,
            categoryLabel:belief.category?.name,
            categoryName: belief.category?.id,
            errored: false, 
            mainPictureName: belief.mainPicture,
            mainPicture: '',       
        })
    }
    const activity = FormatData()
  return (  
        <>
            <ActivityForm initData={activity}/>
        </>
  )
}

export default Page
