import React from 'react'
import MenuItem from './menuItem'
import { Constants } from '../../utils/constants'

const NavbarMenu = ({main}:{main?: boolean}) => {
  return (
    <> 
        <MenuItem title='Attend Online' link = {Constants.STUDIO_URL+'/live'} main={main} description='Check out a Karen Community message—live with our Church Online community.'/>
        {/* <MenuItem title='Media' link = '/media' main={main} description="Find Messages, LifeGroups &amp; Kids Content, Worship and more."/> */}
        <MenuItem title='Contact Us' link = '/contact-us' main={main} description="Find out more about our Location In Karen."/>
        <MenuItem title=  'Give Now' link = '/give-now/mpesa'  main={main} description="Give Now With MPESA initiated STK Push"/>
        <MenuItem title=  'Giving' link = '/giving'  main={main} description="Taking action on your generosity is simple. Find out how to give at Karen Community."/>
        <MenuItem title='Who We Are' link = '/who-we-are' main={main} description="Find out how we want to make a lasting difference in your life, our community, and the world."/>
        <MenuItem title='Worship' link = {Constants.STUDIO_URL} main={main} description="Discover original Karen Community Worship music and connect with our team."/>
   </>
  )
}

export default NavbarMenu
