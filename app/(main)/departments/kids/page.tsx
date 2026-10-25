import React from "react";
import HeroSecondary from "../../../../components/heroSecondary";
import { PrimaryButton } from "../../../../components/buttons";
import Image from "next/image.js";
import FAQContainer from "../../../../components/FAQContainer";
import data from '../../../../data/kids_faq.json'
import { Constants } from "../../../../utils/constants";

const TextComponent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="py-10 text-center flex flex-col gap-y-5 ">
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
      <HeroSecondary
        title="About SDA Church Karen Community Kids"
        center={true}
        bgImageLarge={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid6.jpeg`}
        bgImageSmall={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid6.jpeg`}
        dark
      />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-gray-900">
        <div className="flex justify-center">
          <Image
            src={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/vbs.jpeg"`}
            alt=""
            className="max-w-xs"
            width={800}
            height = {600}
          />
        </div>

        <TextComponent
          title="SDA Church Karen Community Kids is the children’s ministry at SDA Karen Community Church."
          description={`We’re dedicated to partnering with parents to lead children to become fully devoted followers of Christ. Through age-specific lessons, activities, and small groups, children ages birth to 15 years learn biblical truths and real-life lessons they can apply to their lives every week in KarenCommunityKids.`}
        />
        <div className="flex flex-wrap justify-center py-7  ">
          <div className="pr-5 my-10">
            <PrimaryButton
              link="https://www.youtube.com/@seventh-dayadventistchurch1345/videos"
              text="Watch Karen kids videos"
            />
          </div>

          <div className="my-10">
            <PrimaryButton
              link="/contact-us"
              text="Find a location"
            />
          </div>
        </div>

        <TextComponent
          title="Is your family new to SDA Church Karen community Church?"
          description={`We would love to know more about your family and connect you with someone from a Karen community Church or Karen community Church Online.`}
        />
        <div className="flex justify-center py-7">
          <PrimaryButton  link="/contact-us" text="Tell us about your family" />
        </div>
      </div>
      <div className="p-2">
      <HeroSecondary
      title=""
        center={true}
        bgImageLarge={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kids7.jpeg`}
        bgImageSmall={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kids7.jpeg`}
      />
      </div>
      
      <div className="flex justify-center">
        <Image 
          src={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid2.jpeg`}
          alt=""
          width={400}
          height = {600}
          /> 
          <Image 
          src={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid5.jpeg`}
          alt=""
          width={400}
          height = {600}
          />
      </div>
      

      <div className="bg-gray-100 text-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <section className="relative pt-10 pb-10 overflow-hidden">
            <div className="relative z-10 container px-4 mx-auto">
              <div className="md:max-w-4xl mx-auto">
                <div className="mb-11 flex flex-wrap -m-1">
                  <div className="w-full shadow-lg">
                    <FAQContainer data={data}/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Page;
