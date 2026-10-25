import React from 'react'
import Card from '../../../../../components/card';
import { Constants } from "../../../../../utils/constants";

export const metadata = {
  title: "Parents | Karen Community SDA",
  description: "Every family needs a place to belong—somewhere your kids love to be and where you have the support and friendships you need. Whether you're at home or at church, we want to connect you to relationships and resources to help you parent with confidence!.",
  openGraph: {
      title: 'Parents | Karen Community SDA',
      description: `Every family needs a place to belong—somewhere your kids love to be and where you have the support and friendships you need. Whether you're at home or at church, we want to connect you to relationships and resources to help you parent with confidence!.`,
      images: [`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kids8.jpeg`]
    },
};


const TextComponent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="mx-auto max-w-7xl pt-9 px-2 sm:px-6 lg:px-8 py-10 text-center flex flex-col gap-y-3">
      <h3 className="text:xl md:text-2xl font-bold text-gray-900">{title}</h3>
      <h2 className="relative text-md sm:text-lg md:text-xl w-full text-center md:w-3/4 self-center text-gray-600">
        {description}
      </h2>
    </div>
  );
};

const Page = () => {
  return (
    <>
    <div  className='mx-auto max-w-7xl pt-9 px-2 sm:px-6 lg:px-8'>
    <Card
      image={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kids8.jpeg`}
      excerpt="Every family needs a place to belong—somewhere your kids love to be and where you have the support and friendships you need. Whether you're at home or at church, we want to connect you to relationships and resources to help you parent with confidence!."
      title="Karen Community is ready for your Family"
      reverse            
      />
    </div>
    
    </>
  )
}

export default Page
