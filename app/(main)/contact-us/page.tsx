import React from 'react'
import {HiOutlineMailOpen} from 'react-icons/hi'
import { FaFacebook, FaInstagram, FaMailBulk, FaMap, FaMapPin, FaNetworkWired, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa'

const ContactItem = ({icon, text, href}:{icon:React.ReactNode, text:string,href?:string}) =>{
  return(
    <div className='flex flex-row justify-start '>
      <div className='w-10 flex-0 text-maroon-800'>{icon}</div>
      {href? 
        <a className='flex-1 text-maroon-800 hover:text-gray-600 transition-all' href={href}>{text}</a>
        :
        <div className='flex-1'>{text}</div>
      }
    </div>
  )
}

const Page = () => {
  return (
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4 text-gray-800'>     
      <div className='flex flex-col lg:flex-row justify-between gap-x-7 gap-y-3'> 
        <div className='w-full lg:w-2/3'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.673007094344!2d36.75901001415778!3d-1.3728832361125265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f05fb8f8c8c43%3A0x374cb87546ea813b!2sS.D.A.%20Church%2C%20Karen%20Community!5e0!3m2!1sen!2ske!4v1670438067312!5m2!1sen!2ske" width="600" height="450" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full'></iframe>
        </div>       
       <div className='py-6'>
        <h1 className='text-3xl font-bold'>Contact Information</h1>
        <p className='text-gray-500 italic'>Please visit us as show shown on the map, or contact us using us the details below</p>
        <div className='pt-9'>
          <h2 className='font-semibold'>S.D.A. Church Karen Community</h2>
          <div className='flex flex-col gap-y-3 py-4'>
            <ContactItem icon={<HiOutlineMailOpen size={20}/>} text='P.O Box 15973 - 00502 Karen, Nairobi Kenya'/>
            <ContactItem icon={<FaMapPin size={20}/>} text='Mukoma Road, Karen Nairobi'/>
            <ContactItem icon={<FaMailBulk size={20}/>} text='info@sdackc.org' href='mailto:info@sdackc.org'/>
            <ContactItem icon={<FaPhone size={20}/>} text='+ 254 748 826 726' href='tel:+254748826726'/>
            <ContactItem icon={<FaNetworkWired size={20}/>} text='www.sdackc.org'/>
            <ContactItem icon={<FaFacebook size={20}/>} text='SDAChurchKaren' href='https://www.facebook.com/SDAChurchKaren/' />
            <ContactItem icon={<FaTwitter size={20}/>} text='@SDAChurchKaren'href='https://twitter.com/SDAChurchKaren'/>
            <ContactItem icon={<FaInstagram size={20}/>} text='@sdachurchkaren' href='https://www.instagram.com/sdachurchkaren/'/>
            <ContactItem icon={<FaYoutube size={20}/>} text='Seventh-Day Adventist Church Karen Community' href='https://www.youtube.com/channel/UC4M1zkAjPAbM7vbmiQaJTSA'/>
            <ContactItem icon={<FaMap size={20}/>} text='Get Directions' href='https://goo.gl/maps/WYys2vLjbEy5k7Pv6'/>
       
          </div>
        </div>      
      </div>
      </div>
    </div>
  )
}

export default Page