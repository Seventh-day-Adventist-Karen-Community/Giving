'use client'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF,FaInstagram,FaTiktok, FaYoutube, FaTwitter, FaPinterestP, FaLinkedinIn} from 'react-icons/fa';
import { Constants } from '../utils/constants';

const Footer = () => {
  return (
    <footer className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-sm pb-9 pt-4 mt-7 border-t-1'>
        <div className='flex justify-center md:flex-row flex-col md:justify-between align-middle my-4'>
          <div className='text-center md:text-left'>
            <p>Join us at <Link className='text-blue-500 hover:border-b-2 hover:border-blue-500 leading-tight transition-all' href={'https://www.youtube.com/@seventh-dayadventistchurch1345'}>Church Online</Link> or <Link className = 'text-blue-500 hover:border-b-2 hover:border-blue-500 leading-tight transition-all' href={'https://www.google.com/maps/place/S.D.A.+Church,+Karen+Community/@-1.3728886,36.7611987,17z/data=!3m1!4b1!4m6!3m5!1s0x182f05fb8f8c8c43:0x374cb87546ea813b!8m2!3d-1.3728886!4d36.7611987!16s%2Fg%2F11h57xrn9q?hl=en'}>Mukoma Road, Karen.</Link></p>
          </div>
            <div className='hidden md:flex flex-row flex-wrap gap-x-3 none'>
                <a className='text-blue-500 hover:border-b-2 hover:border-blue-500 leading-tight transition-all' href={Constants.STUDIO_URL}>Watch</a>
                <Link className='text-blue-500 hover:border-b-2 hover:border-blue-500 leading-tight transition-all' href={'/contact-us'}>Contact Us</Link>
                <Link className='text-blue-500 hover:border-b-2 hover:border-blue-500 leading-tight transition-all' href={'/giving'}>Give</Link>
                <Link className='text-blue-500 hover:border-b-2 hover:border-blue-500 leading-tight transition-all' href={'/departments/tools-for-growth'}>Tools</Link>
                <Link className='text-blue-500 hover:border-b-2 hover:border-blue-500 leading-tight transition-all' href={'/departments/free-church-resources'}>For Churches</Link>
                <Link className='text-blue-500 hover:border-b-2 hover:border-blue-500 leading-tight transition-all' href={'/departments/servingopportunities'}>Serving Opportunities</Link>
                <a className='text-blue-500 hover:border-b-2 hover:border-blue-500 leading-tight transition-all' href={Constants.ECOMMERCE_URL}>Shop</a>
            </div>
        </div>
        <div className='flex md:flex-row flex-col justify-between align-middle'  >
          <div className='text-center md:text-left'>
            <p>© {(new Date().getFullYear())} Karen Community All rights reserved. <Link className='text-blue-500 hover:border-b-2 hover:border-blue-500 leading-tight transition-all' href={'/policies/privacy'}>Privacy Policy </Link> | <Link className='text-blue-500 hover:border-b-2 hover:border-blue-500 leading-tight transition-all' href={'/policies/terms-of-use'}>Terms of Use </Link></p>
          </div>
          <div className='flex self-center md:self-end flex-row flex-wrap gap-x-4 none py-4 md:py-0' >
            <a className='border-gray-900 text-gray-900 rounded-full p-2' href={'https://www.facebook.com/SDAChurchKaren/'} style={{border: '1px solid  #ccc'}}>
              <FaFacebookF />
            </a>
             <a className='border-gray-900 text-gray-900 rounded-full p-2' href={'https://www.instagram.com/sdachurchkaren/'} style={{border: '1px solid #ccc'}}>
              <FaInstagram />
            </a>
             <a className='border-gray-900 text-gray-900 rounded-full p-2' href={'/'} style={{border: '1px solid #ccc'}}>
              <FaTiktok />
            </a>
             <a className='border-gray-900 text-gray-900 rounded-full p-2' href={'https://www.youtube.com/channel/UC4M1zkAjPAbM7vbmiQaJTSA'} style={{border: '1px solid #ccc'}}>
              <FaYoutube />
            </a>
             <a className='border-gray-900 text-gray-900 rounded-full p-2' href={'https://twitter.com/SDAChurchKaren'} style={{border: '1px solid #ccc'}}>
              <FaTwitter />
            </a>
             <a className='border-gray-900 text-gray-900 rounded-full p-2' href={'/'} style={{border: '1px solid #ccc'}}>
              <FaPinterestP />
            </a>
             <a className='border-gray-900 text-gray-900 rounded-full p-2' href={'/'} style={{border: '1px solid #ccc'}}>
              <FaLinkedinIn />
            </a>            
          </div>
        </div>
    </footer>
  )
}

export default Footer