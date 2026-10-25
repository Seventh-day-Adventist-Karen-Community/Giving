import React from 'react'
import { PrimaryButton } from '../../../../components/buttons'
import Image from "next/image.js";
import HeroSecondary2 from '../../../../components/herosecondary2'
import { Constants } from '../../../../utils/constants';

const TextComponent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="py-3 text-center flex flex-col gap-y-5 ">
      <h3 className="text:2xl md:text-3xl font-bold text-gray-800">{title}</h3>
      <h2 className="relative text-md sm:text-lg md:text-xl w-full text-center md:w-3/4 self-center text-gray-600">
        {description}
      </h2>
    </div>
  );
};

const Page = () => {
  return (
    <>
    <HeroSecondary2
    title="Remember your creator"
    dark
    description="The Seventh-day Adventist Church began like a start-up—led by young people with vision and passion for a cause."
    // bgImageSmall="https://production-cms-assets.life.church/pages/lifegroups/lg-hero-2.png?fit=auto&auto=format&fm=webp&imgixFP=934751933&h=0&w=1349&ixlib=react-9.7.0&dpr=1"
    bgImageSmall={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Youth.jpeg`}
    bgImageLarge={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Youth.jpeg`}
    secondaryLink={{ link: "/contact-us", title: "Contact the youth leader" }}
    outlineLink={{ link: "/group/search", title: "Find a LifeGroup" }}
  />
   <div className=" text-2xl md:text-4xl lg:text-4xl text-800 pt-9 font-bold flex justify-center text-center">
       {` What's our calling as the youth?`}
      </div>
      <div className="flex justify-center py-10">
          <p className="text-800 text-xl px-11 md:px-22 lg:px-64 text-center font-medium">
         {` “Like arrows in the hands of a warrior,” (Psalms 127:4) our youth and young adults are designed by God to be sent into the world with the three angels message (Revelation 14:6-12).  This urgent and prophetic message lifts up Jesus as the world’s Savior and His free gift of righteous by faith.

We also call upon young people to go and be the “Hands and feet of Jesus” in their local churches, on campuses, in the cities, as well as in the unreached countries of the world! In these trying times, the world need Adventists more than ever! We fervently pray that every Seventh-day Adventist young person from ages 4 to 30 will join the world church in saying “I Will Go!”`}
          </p>
        </div>
      <div className="flex justify-center">
          <Image
            src="https://www.gcyouthministries.org/wp-content/uploads/I_Will_GO_bright-blue.svg"
            alt=""
            className="max-w-xs"
            width={800}
            height = {600}
          />
          </div>
          <div className=" text-2xl md:text-4xl lg:text-4xl text-800 pt-9 pt-18 pb-10 underline underline-offset-8 font-bold flex justify-center text-center">
        Ministries under the youth.
      </div>
<div className="py-4 px-2 sm:px-6 lg:px-8 text-gray-900">
        <div className="flex justify-center">
          <Image
            src="https://www.gcyouthministries.org/wp-content/uploads/Adventurer_Logo-300x267.png.webp"
            alt=""
            className="max-w-xs"
            width={800}
            height = {600}
          />
        </div>

        <TextComponent
          title="Adventurers"
          description={`The Adventurer Club is a Seventh-day Adventist Church-sponsored ministry open to all families of children in grades pre-kindergarten - 4 (kids ages 4-9). `}
        />
        <div className="flex flex-wrap justify-center py-3  ">
                 <div className="my-10">
            <PrimaryButton
              link="/contact-us"
              text="Find out more"
            />
          </div>
        </div>
      </div>
<div className="py-4 sm:px-6 lg:px-8 text-gray-900 bg-gray-200 px-3">
        <div className="flex justify-center">
          <Image
            src="https://www.gcyouthministries.org/wp-content/uploads/2020/06/Ambassador_logo-200x200.png.webp"
            alt=""
            className="max-w-xs"
            width={800}
            height = {600}
          />
        </div>

        <TextComponent
          title="Ambassadors"
          description={`The Ambassador Club is not intended as a replacement of, but instead, will strengthen the current Senior Youth/ Young Adult Ministry of our Church. For ages 16-21. `}
        />
        <div className="flex flex-wrap justify-center py-3 px-3  ">
                 <div className="my-10">
            <PrimaryButton
              link="/contact-us"
              text="Find out more"
            />
          </div>
        </div>
      </div>
<div className="py-4 px-2 sm:px-6 text-gray-900">
        <div className="flex justify-center">
          <Image
            src="https://www.gcyouthministries.org/wp-content/uploads/2020/06/AY_Logo-1600x600.png"
            alt=""
            className="max-w-xs"
            width={800}
            height = {600}
          />
        </div>

        <TextComponent
          title="Young adults"
          description={`The story of the Adventist Youth Society began over 125 years ago along a dusty country lane in Michigan with two young boys kneeling in prayer and today serves ages 21-30. `}
        />
        <div className="flex flex-wrap justify-center py-3  ">
                 <div className="my-10">
            <PrimaryButton
              link="/contact-us"
              text="Find out more"
            />
          </div>
        </div>
      </div>
<div className="py-4 sm:px-6 lg:px-8 text-gray-900 bg-gray-200 px-3">
        <div className="flex justify-center">
          <Image
            src="https://www.gcyouthministries.org/wp-content/uploads/2020/06/pcm-200x200.png.webp"
            alt=""
            className="max-w-xs"
            width={800}
            height = {600}
          />
        </div>

        <TextComponent
          title="Public campus ministries"
          description={`Transforming students on non-Adventist campuses into Seventh-day Adventist ambassadors of Christ in colleges/universities, churches, communities, and the world at large.`}
        />
        <div className="flex flex-wrap justify-center py-3  ">
                 <div className="my-10">
            <PrimaryButton
              link="/contact-us"
              text="Find out more"
            />
          </div>
        </div>
      </div>
      <div>
      </div>
      <div>
        <h2 className="flex justify-center items-center text-2xl">
          {`Do you have any more questions?`}
        </h2>
      <div className="flex flex-wrap justify-center py-3  ">
                 <div className="my-10">
            <PrimaryButton
              link="/contact-us"
              text="Find out more"
            />
          </div>
          </div>
          </div>
  </>
  )
}

export default Page
