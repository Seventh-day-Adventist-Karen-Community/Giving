import Link from 'next/link'
import React from 'react'
import MenuGroups from './menuGroups'
import MenuItem from './menuItem'
import NavbarMenu from './navbarMenu'

const MainMenu = () => {  
    
  return (
   <> 
   <div className='border-b-1 pb-10'>
      <MenuGroups className='md:hidden'>
        <NavbarMenu main={false} />
      </MenuGroups>
      <MenuGroups title='Ways to Connect'>
        <MenuItem title='Kids' link = '/departments/kids' main={false} description='Check out everything happening involving our kids, our ministry for kids ages birth-6th grade.'/>
        <MenuItem title='Youth' link = '/departments/youth' main={false} description='See how you can get involved in youth programmes, our student ministry for 6th-12th graders.'/>
        <MenuItem title='Church Groups' link = '/groups' main={false} description='Find out how you can grow, laugh, and serve with other believers through a Group.'/>
        <MenuItem title='Whats Next' link = '/departments/whatnext' main={false} description='Let us help you with your next steps as a new believer.'/>
        <MenuItem title='Serving Opportunities' link = '/departments/servingopportunities' main={false} description='God can use your gifts and skills to make a difference in the lives of others at Karen Community.'/>
        <MenuItem title='Tools for Growth' link = '/departments/tools-for-growth' main={false} description='We want to equip you, your family, and your Group to grow as followers of Christ.'/>
        {/* <MenuItem title='Volunteering' link = '/departments/careers' main={false} description="Find out what it's like to work at Karen Community and explore all of our open roles for volunteering"/> */}
        {/* <MenuItem title='careers' link = '/departments/careers' main={false} description="Find out what it's like to work at Karen Community and explore all of our open roles."/> */}
        <MenuItem title='Store' link = '/departments/store' main={false} description='Share some good news with Karen Community apparel. Find your favorites at our online store.'/>
      </MenuGroups>
      <MenuGroups title='A bit about us'>
        <MenuItem title='Our Beliefs' link = '/who-we-are/our-beliefs' main={false} description='Learn more about what we believe as fully devoted followers of Christ.'/>
        <MenuItem title='What to Expect' link = '/who-we-are/what-to-expect' main={false} description="Visiting for the first time? We want you to know what you'll find at Karen Community."/>
        <MenuItem title='Resources' link = '/departments/free-church-resources' main={false} description='Find free tools and resources created by Karen Community for churches around the world.'/>
        <MenuItem title='Missions' link = '/missions' main={false} description='Show God’s love in your city and around the world through Global and Local Mission Partners.'/>
        <MenuItem title='Write a quote' link = '/public-ministry' main={false} description='Give hope and encouragement to a dying world.'/>
      </MenuGroups>
   </div>
   </>
  )
}

export default MainMenu