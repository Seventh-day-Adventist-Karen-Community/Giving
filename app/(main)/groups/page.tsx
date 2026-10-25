import React from "react";
import HeroSecondary2 from "../../../components/herosecondary2";
import Card from "../../../components/card";
import { PrimaryButton } from "../../../components/buttons";
import data from '../../../data/prayfaqs.json'
import FAQContainer from "../../../components/FAQContainer";
import CardStack from "../../../components/cardStacked";
import { Constants } from "../../../utils/constants";


const Page = () => {
  return (
    <>
      <HeroSecondary2
        title="Find your people"
        description="You were designed by God to live in community. Now is the perfect time to join a LifeGroup, where you can be real and belong."
        bgImageSmall={`${Constants}/kcc/media/groups/group4.jpeg`}
        bgImageLarge={`${Constants}/kcc/media/groups/group4.jpeg`}
        // bgImageSmall="https://production-cms-assets.life.church/pages/lifegroups/lg-hero-mobile-2.png?fit=auto&auto=format&fm=webp&imgixFP=1739398625&h=0&w=1349&ixlib=react-9.5.4&dpr=1"
        // bgImageLarge="https://production-cms-assets.life.church/pages/lifegroups/lg-hero-2.png?fit=auto&auto=format&fm=webp&imgixFP=1129606798&h=0&w=1349&ixlib=react-9.5.4&dpr=1"
        secondaryLink={{ link: "/group/search", title: "Find a prayercell" }}
        dark
        outlineLink={{ link: "/contact-us", title: "Form a prayercell" }}
      />
      <div className="mx-auto max-w-7xl pt-9 px-2 sm:px-6 lg:px-8 flex flex-col gap-y-9 ">
          <Card
            image="https://production-cms-assets.life.church/pages/kids/media/kids_media_1.jpeg?auto=format&imgixFP=1952626795&fm=webp&ixlib=react-9.5.4&w=600&dpr=1&q=75"
            excerpt="LifeGroups create a space for people to intentionally share their lives with others, grow spiritually together, and encourage each other through the highs and lows of life."
            title="Life is better together."
            subtitle="LifeGroups gather in homes, coffee shops, and other places where people love to connect—including online  through the live programmes"
            links={[
              {
                link: "https://www.youtube.com/c/AdventistChildrensMinistries/playlists",
                title: "Watch Online",
              },
            ]}
          />
        <div className=" text-2xl md:text-4xl lg:text-4xl text-800 font-bold flex justify-center text-center">
          Find the group for this season of your life.
        </div>
          <Card
            noShadow
            textPaddingLarge
            image="https://production-cms-assets.life.church/pages/lifegroups/tiny-mu-4.png?auto=format&imgixFP=505002621&fm=webp&ixlib=react-9.5.4&w=800&dpr=1&q=75https://production-cms-assets.life.church/pages/kids/media/kids_media_1.jpeg?auto=format&imgixFP=1952626795&fm=webp&ixlib=react-9.5.4&w=600&dpr=1&q=75"
            title="Discover existing prayergroups"
            excerpt="Select your location and the days that fit your life, then check out the groups meeting near you."
          />
          <Card
            noShadow
            textPaddingLarge
            title="Customize Your Search"
            excerpt="Filter by groups for women, men, singles, married couples, young adults, and more. You can even filter for groups that meet digitally or where kids are welcome!"
            image="https://production-cms-assets.life.church/pages/lifegroups/tiny-mu-3.png?auto=format&imgixFP=1169985515&fm=webp&ixlib=react-9.5.4&w=800&dpr=1&q=75"
            reverse
          />
        <div className="flex justify-center py-10">
          <PrimaryButton link="/group/search" text="Find a prayercell" />
        </div>
      </div>
      <div className="bg-gray-100 pt-16">
        <div className=" text-3xl md:text-4xl lg:text-4xl text-800 font-bold flex justify-center text-center">
          Interested in starting a prayercell?
        </div>
        <div className="flex justify-center py-10">
          <p className="text-800 text-xl px-12 text-justify font-medium">
            {`It's easy to start a prayer group and we are with you every step of
            the way`}
          </p>
        </div>
        <div className="mx-auto max-w-7xl pt-9 px-2 sm:px-6">
          <div className="flex flex-row justify-center xl:justify-between flex-wrap gap-x-5 gap-y-10">
              <CardStack 
                excerpt="Fill out the Volunteer Application to start the process of becoming a LifeGroup Leader." 
                title="Step 1" 
                image="https://hilmus-tutor.s3.af-south-1.amazonaws.com/kcc/media/groups/group3.webp" 
                links={[{
                  title:'Volunteer Application',
                  link:'/groups'}]}
                  />
              <CardStack 
                excerpt="Your KarenGroups/KarenMissions team will connect with you to help you prepare to lead your group." 
                title="Step 2" 
                image="https://hilmus-tutor.s3.af-south-1.amazonaws.com/kcc/media/groups/group2.jpg" 
                
                />
              <CardStack 
                excerpt="Invite people to join your group and start meeting!" 
                title="Step 3" 
                image="https://hilmus-tutor.s3.af-south-1.amazonaws.com/kcc/media/groups/group1.webp" 
              
                />
            </div>
        </div>
        <div className="flex flex-wrap justify-center py-7  ">
          <div className="pr-5 my-7">
            <PrimaryButton
              link="https://www.revivalandreformation.org/resources"
              text="Prayer resources"
            />
          </div>
          </div>
      </div>
      <div className=" text-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <section className="relative pt-10 pb-10 overflow-hidden">
            <div className="relative z-10 container px-4 mx-auto">
              <div className="md:max-w-4xl mx-auto">
                
                <div className="mb-11 flex flex-wrap -m-1">
                  <div className="w-full">
                    <FAQContainer data={data} bg_transparent/>
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
