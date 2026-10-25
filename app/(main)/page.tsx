import Hero from '@components/hero'
import Card from '@components/home/card'
import homepage_sections from '@data/homepage_sections'
import SectionWrapper from '@components/home/sectionWrapper' 
export const revalidate = 7200
export const metadata = {
  title: "Seventh-Day Adventist Church Karen Community",
  keywords: "Seventh, Seventh Day, Seventh-Day, Seventh-Day Adventist, Adventist Church, Seventh Day Adventist Church, Karen, Karen Community, Karen Community Church, Karen Community SDA, Karen Community seventh, Karen Community Seventh Day Adventist, Community Seventh, Community Seventh Day, Community Seventh Day Adventist, Adventist Church, Karen Church, Karen SDA, Karen SDA Church, Online Church, Giving, Tithe, Offering, Karen Community Church, Karengata Church, North West Kenya Conference",
  description: "Welcome to SDA KAREN COMMUNITY. A family of faithful worshippers, fellow shipping friends and fruitful witnesses. ·..THE SABBATH WAS MADE. for man and not man for the Sabbath.",
  openGraph: {
    title: 'You are welcomed Here',
    description: "At Karen Community we want to help you become the person God made you to be. You'll find a safe place to explore.",
    url: 'https://www.sdackc.org',
    siteName: 'Karen Community SDA',
    images: [
      {
        url: '/church.png',
        width: 800,
        height: 400,
      },          
      {
        url: '/global-logo.svg',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};

const FetchData = async () =>{
    return homepage_sections()
}

export default async function Home() {
const {homepages, carousels} = await FetchData();
  return (
    <div>
      <Hero carousels={carousels}/>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 -translate-y-32 sm:-translate-y-28 w-full'>
        <div className='mx-auto w-full flex md:flex-row flex-col align-middle justify-center gap-x-3 gap-y-8'>
          <Card delay={10} title='Youth Ministry' description='Research indicates that when young people are active in the evangelistic mission of the church, they remain in the church. ' sub='Youths' image='https://hilmus-tutor.s3.af-south-1.amazonaws.com/kcc/Resources/induction-2.webp' link='/departments/youth'/>
          <Card delay={50} title='Children Ministry' description='The Mission of the Children Ministry Department is to nature children into a loving, serving relationship with jesus.' sub='Children Only' image='https://hilmus-tutor.s3.af-south-1.amazonaws.com/kcc/Resources/Kids/Kid4.jpeg' link='/departments/kids'/>
          <Card delay={90} title='Women Ministry' description={`The Department of Women's Ministries exists to uphold, encourage, and challenge Adventist women in their pilgrimage as disciples of Jesus Christ and members of His world church.`} sub='Women Only' image='https://hilmus-tutor.s3.af-south-1.amazonaws.com/kcc/Resources/AWM.webp' link='/departments/kids/parents'/>
        </div>
      </div>
    
    {
      homepages.map((section) =>  {
        return(          
          <SectionWrapper key={section.id} {...section} />
        )
      })
    }

    </div>

  )
}
