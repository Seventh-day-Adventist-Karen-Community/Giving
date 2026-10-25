import Navbar from '@components/navbar'
import Footer from '@components/footer'
import DropDownProvider from '@context/dropdown'
import DropdownManager from '@utils/dropdownManager'
import MenuProvider from '@context/menu'
import Nucleus from '../nucleus'
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Nucleus />
      <MenuProvider>
        <DropDownProvider>
          <Navbar />
            <DropdownManager>
              <main className='mt-8 pt-8 z-0 scroll-smooth duration-200' >
                {children}
              </main> 
            </DropdownManager>
          <Footer />      
        </DropDownProvider>
      </MenuProvider>
    </>
  )
}
