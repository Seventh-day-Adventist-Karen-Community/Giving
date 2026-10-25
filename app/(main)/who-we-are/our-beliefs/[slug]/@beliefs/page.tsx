import Link from 'next/link';
import React from 'react'
import FetchAdventistBeliefs, {FetchAdventistBeliefsCategorized} from '@data/adventist_beliefs';
import { Constants } from '@utils/constants';
import { TogglerElementType } from '@customTypes/utilTypes';
import TogglerList from '@components/sidemenu/togglerList';
import getObject from '@utils/getObject';
export const revalidate = 0

export const metadata = {
  title: "Our Beliefs | Karen Community SDA",
  description: "Seventh-day Adventist beliefs are meant to permeate your whole life. Growing out of scriptures that paint a compelling portrait of God, you are invited to explore, experience and know the One who desires to make us whole.",
  openGraph: {
      title: 'Our Beliefs | Karen Community SDA',
      description: 'Seventh-day Adventist beliefs are meant to permeate your whole life. Growing out of scriptures that paint a compelling portrait of God, you are invited to explore, experience and know the One who desires to make us whole.',
      images: [
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/elders.webp`
      ]
    },
};

const FetchBeliefs = async (pslug:string) =>{
    let beliefsCategorized = await FetchAdventistBeliefsCategorized()
    let currBelief = await FetchAdventistBeliefs(pslug)
    return {beliefsCategorized, currBelief}
}

const Page =  async ({ params, searchParams,}:{
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) =>{
  const {beliefsCategorized, currBelief} = await FetchBeliefs(params.slug)

  const data = beliefsCategorized?.map(category=>{
    return {id: category.id, title:category.name, active: currBelief?.[0]?.category?.name==category.name, content: category.beliefs.map((belief) => {
        return {id: belief.id, title: belief.name, content:`/who-we-are/our-beliefs/${belief.slug}`, active: belief.slug==params.slug}}
  )}})
  return (
    <>
      <div className='text-gray-900 my-4 '>
        <div className='py-2 font-semibold text-xl px-2 bg-gray-100 mb-1'>
          <h2>Fundermental Beliefs</h2>
        </div>
        {data &&
            <TogglerList data={data} className='sm:w-60 truncate'/>
        }
      </div>
    </>
  )
}

export default Page