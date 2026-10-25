import React from 'react'
import HeroSecondary from '../../../../../components/heroSecondary'

export const metadata = {
  title: "Crypto-Currency | Ways of Giving :: Karen Community SDA",
  description: "Crypto-Currency | Ways of Giving :: Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Crypto-Currency | Ways of Giving :: Karen Community SDA',
      description: 'Crypto-Currency | Ways of Giving :: Seventh Day Adventist Church Karen Community',
      images: ['https://production-cms-assets.life.church/pages/what-to-expect/WTE-Mobile.jpg']
    },
};

const Page = () => {
  return (
    <>
      <HeroSecondary
      title='Crypto Currency.' 
      center={true}
      bgImageLarge = 'https://production-cms-assets.life.church/pages/what-to-expect/WTE-Mobile.jpg?fit=auto&auto=format&fm=webp&imgixFP=252392830&h=0&w=1349&ixlib=react-9.5.4&dpr=1'
      bgImageSmall='https://production-cms-assets.life.church/pages/what-to-expect/WTE-Desktop.jpg?fit=auto&auto=format&fm=webp&imgixFP=726071103&h=0&w=1349&ixlib=react-9.5.4&dpr=1'
      />
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>Crypto Currency</div>
    </>
  )
}

export default Page