import React from 'react'
import { PrimaryButton } from '../../../../components/buttons'
import HeroSecondary from '../../../../components/heroSecondary'
import { Constants } from '../../../../utils/constants'

export const metadata = {
  title: "Life Group Resources | Karen Community SDA",
  description: "Life Group Resources | Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Life Group Resources | Karen Community SDA',
      description: 'Life Group Resources | Seventh Day Adventist Church Karen Community',
    },
};


const Page = () => {
  return (
    <>
    <HeroSecondary
    title="Prayercell resources"
    center={true}
    bgImageLarge="https://production-cms-assets.life.church/pages/lifegroups/tiny-resources-hero.png?fit=auto&auto=format&fm=webp&imgixFP=1348573979&h=0&w=1349&ixlib=react-9.5.4&dpr=1"
    bgImageSmall="https://production-cms-assets.life.church/pages/lifegroups/tiny-resources-hero-mobile.png?fit=auto&auto=format&fm=webp&imgixFP=385566669&h=0&w=1349&ixlib=react-9.5.4&dpr=1"
  />
  <div className=" text-4xl md:text-4xl lg:text-4xl text-800 pt-9 font-bold flex justify-center text-center">
    Hear the word.
  </div>
  <div className="flex justify-center py-10">
      <p className="text-800 text-xl px-14 md:px-22 lg:px-44 text-center  font-medium">
       Attend the prayer meetings organized by the church on wednesday and on friday as from exactly 5:30 PM to 6:30 PM.
       This will help us as christians to grow together.You can join us online but, We encourage you to join us physically 
      </p>
    </div>
    <div className="flex justify-center py-10 px-8">
    <PrimaryButton link={Constants.STUDIO_URL} text="Join online" />
  </div>
    <div className="flex justify-center py-10 px-8">
    <PrimaryButton link="/contact-us" text="See our location" />
  </div>
  <div className=" text-4xl md:text-4xl lg:text-4xl text-800 pt-9 font-bold flex justify-center text-center">
    Have a Question?
  </div>
  <div className="flex justify-center py-10 px-8">
    <PrimaryButton link="/contact-us" text="Connect with our Communication team" />
  </div>
  </>
  )
}

export default Page
