import Link from 'next/link';
import React from 'react'
import HeroSecondary from '@components/heroSecondary'
import {FetchAdventistBeliefsCategorized} from '@data/adventist_beliefs';
import { BeliefsCategoryType } from '@customTypes/detailsType';
import { Constants } from '@utils/constants';
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

const FetchBeliefs = async () =>{
    let data = await FetchAdventistBeliefsCategorized()
    return data
}

const Page = async () => {
  const beliefsCategorized = await FetchBeliefs()
  return (
    <>
      {/* <div className='w-full'>
        <iframe src="https://www.adventist.org/beliefs/" className='w-full h-screen' name='Adventist Beliefs'></iframe>
      </div> */}
      <HeroSecondary
      title='Our Adventist Beliefs.' 
      description='Seventh-day Adventist beliefs are meant to permeate your whole life. Growing out of scriptures that paint a compelling portrait of God, you are invited to explore, experience and know the One who desires to make us whole.'
      center={false}
      dark
      bgImageSmall= {`${Constants.IMAGE_BASE_URL}/kcc/Resources/elders.webp`}
      bgImageLarge={`${Constants.IMAGE_BASE_URL}/kcc/Resources/elders.webp`}
      />
      <div className='mx-auto max-w-7xl px-2 sm:px-44 lg:px-52 text-gray-900 my-6'>
        <div className='py-4 font-semibold text-2xl'>
          <h2>The 28 Fundamental Beliefs can be organized into six categories of doctrine: God, man, salvation, the church, daily Christian life, and last-day events (restoration).</h2>
        </div>
        <ol>
        {
          beliefsCategorized &&
          beliefsCategorized.map(category =>{
            return(
              <div key={category.id} className='my-4'>
                <h3 className='font-semibold text-xl my-0.5'>{category.name}</h3>
                {category.beliefs.map((belief) => {
                  return(
                    <li key={belief.id}> <Link href={`/who-we-are/our-beliefs/${belief.slug}`} className='pl-1 sm:pl-2 md:pl-3 text-blue-600 hover:text-blue-800 transition-all'>{belief.sequenceNo}. {belief.name}</Link></li>
                    )
                  })}
              </div>
              )
            })
          }
        </ol>
      </div>
    </>
  )
}

export default Page