import React from 'react'
import HeroSecondaryShop from '../../../../components/heroSecondary'

const Page = () => {
  return (
    <>
    <HeroSecondaryShop 
        title='Let your Apparel be an honour to God.' 
        description='You can preach about the love of Jesus by wearing properly , we can help you in that.'
        bgImageSmall='https://hilmus-tutor.s3.af-south-1.amazonaws.com/kcc/media/homepage_sections/Merchendise.png'
        bgImageLarge='https://hilmus-tutor.s3.af-south-1.amazonaws.com/kcc/media/homepage_sections/Merchendise.png'
        secondaryLink={{link:'/',title:'coming soon'}}
        outlineLink={{link:'/',title:'Contact Us'}}
        />
        <div className='text-4xl text-black text-500 pt-9 font-bold flex justify-center text-center'>Look out for our opening dates</div>
    </>
    
  )
}

export default Page
