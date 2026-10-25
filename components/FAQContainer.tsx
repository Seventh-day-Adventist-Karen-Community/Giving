import { FAQType } from '@customTypes/utilTypes'
import React from 'react'
import Faq from './faq'

const FAQContainer = ({data, bg_transparent}: {data: FAQType[], bg_transparent?:boolean}) => {
  return (
    <div className={`${bg_transparent?'bg-transparent':'bg-gray-100' } text-gray-900 py-8`}>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <section className="relative pt-10 pb-10 overflow-hidden">
            <div className="relative z-10 container px-4 mx-auto">
                <div className="md:max-w-4xl mx-auto">
                  <h2 className="mb-16 text-3xl md:text-4xl xl:text-5xl text-center font-bold font-heading tracking-px-n leading-none">Frequently Asked Questions</h2>
                  <div className="mb-11 flex flex-wrap -m-1">
                    <div className="w-full shadow-lg rounded-md">
                        {
                            data.map(({id, title, description} )=> {
                                return(
                                    <Faq key={id} title={title} description={description}/>  
                                )
                            })
                        }
                    </div>                  
                  </div>
                  <p className="text-gray-600 text-center font-medium">
                      <span>Still have any questions? </span>
                      <a className="font-semibold text-maroon-600 hover:text-indigo-700" href="/contact-us">Contact us</a>
                  </p>
              </div>
            </div>
          </section>
        </div>
      </div>
  )
}

export default FAQContainer