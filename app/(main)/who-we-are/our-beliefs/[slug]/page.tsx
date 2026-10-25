import { notFound } from 'next/navigation';
import React from 'react'
import {ContentContainer} from '@components/cardLarge';
import FetchAdventistBeliefs from '@data/adventist_beliefs';
import data from '@data/adventist_beliefs.json'
import { BeliefsType } from '@customTypes/detailsType';
import { Constants } from '@utils/constants';
export const revalidate = 0

const FetchBelief = async (pslug:string) =>{
  if (Constants.USE_SERVER_API){
    let data = FetchAdventistBeliefs(pslug)
    return(data)
  }else{
    return data.filter(({slug}:{slug:string}) => {
      return slug === pslug;
    })
  }
  }


export async function generateMetadata({ params }:{ params: { slug: string }}) {
  const beliefs = await FetchBelief(params.slug)
  if (beliefs == undefined){
    return notFound()
  }
  let belief:BeliefsType = beliefs[0]
    return {
      title: belief.name,
      description: belief.content,
      openGraph: {
        title: belief.name,
        description: belief.content,
        images: [belief.mainPicture || '/theme-picture.png'],
      },
    };
  }

const page = async ({ params, searchParams,}:{
        params: { slug: string };
        searchParams?: { [key: string]: string | string[] | undefined };
    }) => {
    const beliefs = await FetchBelief(params.slug)
    if (beliefs == undefined){
      return notFound()
    }
    let belief:BeliefsType = beliefs[0]
  return (
    <div className='text-lg px-2 sm:px-4 lg:px-5 text-gray-900 my-3'>
        <div className=''>
            <ContentContainer excerpt={belief.content} image={belief.mainPicture} title = {belief.name} />
        </div>
      </div>
  )
}

export default page
