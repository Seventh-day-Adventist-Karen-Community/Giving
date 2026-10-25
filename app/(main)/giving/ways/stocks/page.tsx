import React from 'react'
import Faq from '../../../../../components/faq'
import HeroSecondary from '../../../../../components/heroSecondary'

export const metadata = {
  title: "Stocks | Ways of Giving | Karen Community SDA",
  description: "Stocks | Ways of Giving | Seventh Day Adventist Church Karen Community",
  openGraph: {
      title: 'Stocks | Ways of Giving | Karen Community SDA',
      description: 'Stocks | Ways of Giving | Seventh Day Adventist Church Karen Community',
    },
};

const Page = () => {
  return (
    <>
    
      <HeroSecondary
        title='Unleash your generosity by donating stocks.' 
        className = 'text-gray-900 bg-white'
        primaryLink={{
            link:'https://donate.overflow.co/kcc/stock/select-flow',
            title:'Give Stock'
        }}
        />
      <div className='bg-gray-100 text-gray-900 py-8'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='py-6 md:px-8 text-2xl mx-auto md:w-2/3 text-gray-600 text-center'>
                <p>{`Donating stock can be one of the most tax-efficient ways to act on your generosity. We've partnered with Overflow to make donating stock online quick, easy, and secure.`}</p>
            </div>
          <section className="relative pt-10 pb-10 overflow-hidden">
            <div className="relative z-10 container px-4 mx-auto">
                <div className="md:max-w-4xl mx-auto">
                  <h2 className="mb-16 text-6xl md:text-8xl xl:text-5xl text-center font-bold font-heading tracking-px-n leading-none">Frequently Asked Questions</h2>
                  <div className="mb-11 flex flex-wrap -m-1">
                    <div className="w-full shadow-lg">
                      <Faq title='What is overflow' description='Overflow is a digital solution for donating non-cash assets, helping you give in a tax-efficient way. Right from your mobile device, you’ll experience the ease of giving via stock or crypto in less than five minutes. Overflow also provides you with access to a private Donor Portal that provides visibility into your transaction history, transaction statuses, and the ability to update connected financial accounts.'/>   
                      <Faq title='What is the tax benefit of donating appreciating stock' description={`Donating appreciated stock that you've held for over a year could allow you to save up to 20% in capital gains taxes and potentially up to 37% in federal income taxes on the charitable donation value of your gift based on your tax bracket when itemizing deductions. To understand the full tax benefits of giving appreciated stock, including potential state tax savings, please consult with your tax professional for information about your personal tax implications.`} />   
                      <Faq title='Is giving through Overflow safe and secure' description={`Overflow's Information Security Program is SOC 2 compliant, a widely respected information security auditing procedure. Overflow does not have access to or store any brokerage account usernames or passwords. They use Yodlee, a third-party provider, that handles the brokerage log-in process. Over 600 companies including, PayPal, Mint, and Amazon, use Yodlee to connect their clients’ accounts.`}/>   
                      <Faq title='Can I give a company stock outside of the trading window' description='If you received company-distributed stock as an employee and the trading window is not open, your brokerage will likely reject the transfer request. We highly advise you ask your company for the trading windows so you can give during those time periods, which are typically open quarterly for three to four weeks at a time.'/>   
                      <Faq title='What specific stock can I donate?' description='If you received company-distributed stock as an employee and the trading window is not open, your brokerage will likely reject the transfer request. We highly advise you ask your company for the trading windows so you can give during those time periods, which are typically open quarterly for three to four weeks at a time.'/>   
                      <Faq title='What is the most cost effective method of giving' description='The most cost-effective method of giving to Karen Community Church is the “bank account” option. This method has the lowest processing costs which allows us to put more of your gift to work in ministry.'/>   
                      <Faq title='Does Overflow supports gifts from my brokerage account' description={`Overflow currently supports more than 10 brokerages via their self-guided platform, including the most popular brokers such as Charles Schwab, Fidelity, and E*Trade. If Overflow doesn't have a direct connection to your brokerage account, your gift can still be fulfilled through their off-platform concierge service. If you are in Overflow's donor experience and your brokerage account is not one of the 10+ currently supported with a direct connection, you'll be taken to a form to contact Overflow's transaction operations team. Email stockgifts@overflow.co to choose to opt into Overflow's fully-guided concierge service. `}/>   
                    </div>                  
                  </div>
                  <p className="text-gray-600 text-center font-medium">
                      <span>Still have any questions? </span>
                      <a className="font-semibold text-maroon-600 hover:text-indigo-700" href="#">Contact us</a>
                  </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Page