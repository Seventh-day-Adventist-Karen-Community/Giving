import React from 'react'
import HeroSecondary from '../../../../components/heroSecondary'
import StaticPages from '../../../../data/static_pages'
import { StaticPagesTypeChoices } from '../../../../types/enums'
import { FormatHumanFriendlyDate } from '../../../../utils/constants'
import { NormifyURL } from '../../../../utils/normify-url'
import PolicyLinks from '../PolicyLinks'

const Page = async ({ params,searchParams,}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined }}) =>{
  const policy = await StaticPages({type:StaticPagesTypeChoices.POLICIES, slug:params.slug})
  const date = FormatHumanFriendlyDate(policy[0].modifiedAt, true)
  const background = NormifyURL(policy[0].background)
  return (
    <div>
      <HeroSecondary title={policy[0].name} description={`Last updated: ${date}`} center 
          className=' text-white bg-maroon-800' height='28rem' bgImageLarge={background} bgImageSmall={background}/>
      <div>
        <PolicyLinks />
      </div>
      <div className='w-full mx-auto max-w-7xl px-2 sm:px-6 lg:px-16 my-8'>
        <iframe src="" srcDoc={policy[0].content} className='w-full min-h-screen h-max'>
        </iframe>
      </div>
    </div>
  )
}

export default Page