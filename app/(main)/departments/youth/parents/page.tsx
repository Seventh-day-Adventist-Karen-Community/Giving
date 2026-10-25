import Image from "next/image";
import React from "react";
import { FaHeart } from "react-icons/fa";
import Card from "../../../../../components/card";
import { Constants } from "../../../../../utils/constants";

export const metadata = {
  title: "Parents | Karen Community SDA",
  description: `From childhood to adulthood we have been led by your loving hand`,
  openGraph: {
      title: 'Parents | Karen Community SDA',
      description: `From childhood to adulthood we have been led by your loving hand`,
      images: [`${Constants.IMAGE_BASE_URL}/kcc/Resources/AWM.webp`]
    },
};

const page = () => {
  return (
    <>
    <div className="text-center w-full text-gray-800 md:my-4 flex flex-col gap-y-2">
      <h1 className="text-xl md:text-4xl font-bold">
        Dear parents 
      </h1>
      <h5 className="md:text-xl">
        From childhood to adulthood we have been led by your loving hand
      </h5>
    </div>

      <div className="flex justify-center">
        <Image
          src={`${Constants.IMAGE_BASE_URL}/kcc/Resources/AWM.webp`}
          alt=""
          width={450}
          height={400}
        />
      </div>
      <h1 className="text-2xl my-4 md:text-3xl font-bold text-gray-800 flex justify-center">
        {" "}
        Thank you <FaHeart />
      </h1>
      {/* <div className="flex justify-center"> */}

      <div className="border-r bg-gray-100 flex flex-col justify-center leading-normal">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-8">
          <p className="text-sm text-gray-600 flex justify-center">
            <svg
              className="fill-current text-gray-500 w-3 h-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"></path>
            </svg>
            We appreciate your support
          </p>
          <div className="text-gray-800 font-bold text-xl mb-2 flex justify-center">
            A note for you
          </div>
          <div className=" overflow-y-hidden w-full ">
            <p className="text-gray-700 text-base ">
              “Memories are one of the true riches That life offers, and right
              now, So many wonderful thoughts fill our mind. They are very
              special because They are our own to treasure forever. From the
              time we was a child, we have been blessed with The strength and
              support you give. You have placed your trust in me, And we know I
              can never repay you No matter how hard we try. we have seen in you
              a God-given love And you have shown this love for me In everything
              you have done. May God bless your lives As fully as we have been
              blessed because of you. We Love You!”
            </p>
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default page;
