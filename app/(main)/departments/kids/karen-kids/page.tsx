import React from "react";
import HeroSecondary from "../../../../../components/heroSecondary";
import { OutlineButton2, PrimaryButton } from "../../../../../components/buttons";
import Image from "next/image";
import Card from "../../../../../components/card";
import { Constants } from "../../../../../utils/constants";

export const metadata = {
  title: "Parents | Karen Community SDA",
  description: "Karen Kids is the children’s ministry at Karen Community. We’re dedicated to partnering with parents to lead children to become fully devoted followers of Christ",
  openGraph: {
      title: 'Parents | Karen Community SDA',
      description: `Karen Kids is the children’s ministry at Karen Community. We’re dedicated to partnering with parents to lead children to become fully devoted followers of Christ`,
      images: [
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid5.jpeg`,
        `${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/vbs.jpeg`
      ],

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
    <div className="py-10 text-center flex flex-col gap-y-3 px-20">
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
      <HeroSecondary
        title="Leading the next generation"
        center={true}
        bgImageLarge={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid5.jpeg`}
        bgImageSmall={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/Kid5.jpeg`}
      />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-gray-900 w-full">
        <div className="text-center w-full hidden">
          <Image alt="Kids" src={`${Constants.IMAGE_BASE_URL}/kcc/Resources/Kids/vbs.jpeg`}
            width={150} height={80}
            className='mx-auto'
            />
        </div>
        <TextComponent
          title="Karen Kids is the children’s ministry at Karen Community. We’re dedicated to partnering with parents to lead children to become fully devoted followers of Christ"
          description={``}
          
        />
        <div className="flex flex-wrap justify-center py-7  ">
          <div className="pr-2 my-5">
            <PrimaryButton
              link="/who-we-are/what-to-expect"
              text="More about Karen kids"
            />
          </div>

          <div className="my-5">
            <OutlineButton2
              link="/contact-us"
              text="Tell us about your family"
            />
          </div>
        </div>

        <div className="flex justify-center my-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Videos for your kids
          </h1>
        </div>
        <div className="flex justify-center">
        </div>
        <div className="py-7 justify-center md:w-full flex flex-col gap-x-4 gap-y-8 flex-wrap">
          <Card 
            image="https://production-cms-assets.life.church/pages/kids/media/kids_media_1.jpeg?auto=format&imgixFP=1952626795&fm=webp&ixlib=react-9.5.4&w=600&dpr=1&q=75"
            excerpt="The curriculum for Beginners ministers to children ages birth through 2 years. However, both the Beginner and the Kindergarten
            materials are adaptable to 3-year-olds"
            title="Beginner"
            subtitle="Birth to 2 years"
            links={[
              {
                link: 'https://www.youtube.com/c/AdventistChildrensMinistries/playlists',
                title: 'watch Adventist children videos'
              },
              {
                link: 'https://www.faithfinders.com/video',
                title: 'Find more resources here'
              }              
            ]}
          />
          <Card
            image="https://production-cms-assets.life.church/pages/kids/media/kids_media_1.jpeg?auto=format&imgixFP=1952626795&fm=webp&ixlib=react-9.5.4&w=600&dpr=1&q=75"
            excerpt="The curriculum for kindergarten ministers to children ages 3 to 4 years."
            title="Kindergarten"
            subtitle="3 to 4 years"
            reverse
            links={[
              {
                link: 'https://www.gracelink.net/kindergarten',
                title: 'see more resources here'
              },
              {
                link: 'https://www.youtube.com/c/AdventistChildrensMinistries/playlists',
                title: 'See more videos here'
              }              
            ]}
          />
          <Card 
            image="https://production-cms-assets.life.church/pages/kids/media/kids_media_1.jpeg?auto=format&imgixFP=1952626795&fm=webp&ixlib=react-9.5.4&w=600&dpr=1&q=75"
            excerpt="The curriculum for primary ministers to children ages 5 to 9 years. "
            title="Primary"
            subtitle="5 to 9 years"
            links={[
              {
                link: 'https://www.youtube.com/c/AdventistChildrensMinistries/playlists',
                title: 'watch Adventist children videos'
              },
              {
                link: 'https://www.gracelink.net/primary',
                title: 'Find more resources here'
              }              
            ]}
          />
          <Card
            image="https://production-cms-assets.life.church/pages/kids/media/kids_media_1.jpeg?auto=format&imgixFP=1952626795&fm=webp&ixlib=react-9.5.4&w=600&dpr=1&q=75"
            excerpt="The curriculum for junior ministers to children ages 10 to 14 years."
            title="Juniors"
            subtitle="10 to 14"
            reverse
            links={[
              {
                link: 'https://www.juniorpowerpoints.org/',
                title: 'see resources for junior class here'
              },
              {
                link: 'https://www.youtube.com/c/AdventistChildrensMinistries/playlists',
                title: 'See more videos here'
              }              
            ]}
          />
          <Card 
            image="https://production-cms-assets.life.church/pages/kids/media/kids_media_1.jpeg?auto=format&imgixFP=1952626795&fm=webp&ixlib=react-9.5.4&w=600&dpr=1&q=75"
            excerpt="The curriculum for real time faith ministers to children ages 14 to 17 years. "
            title="Real time faith "
            subtitle="14 to 17 years"
            links={[
              {
                link: 'https://www.realtimefaith.net/page2566',
                title: 'See realtime faith resources here'
              },
              {
                link: 'https://www.gracelink.net/primary',
                title: 'Find more resources here'
              }              
            ]}
          />
          <Card
            image="https://production-cms-assets.life.church/pages/kids/media/kids_media_1.jpeg?auto=format&imgixFP=1952626795&fm=webp&ixlib=react-9.5.4&w=600&dpr=1&q=75"
            excerpt="The curriculum for cornerstone ministers to children ages 17 to 19 years."
            title="cornerstone"
            subtitle="17 to 19"
            reverse
            links={[
              {
                link: 'https://www.cornerstoneconnections.net/lessons',
                title: 'see resources for cornerstone class here'
              },
              {
                link: 'https://www.youtube.com/c/AdventistChildrensMinistries/playlists',
                title: 'See more videos here'
              }              
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
