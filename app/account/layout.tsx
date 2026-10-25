import Image from "next/image"
import Link from "next/link"
import Breadcrumb from "@components/account/breadcrumb"
import MobileSidebar from "@components/account/mobile-sidebar"
import Sidebar from "@components/account/sidebar"
import UserMenu from "@components/account/user-menu/userMenu"
import AccountProvider from "@context/account"

export const metadata = {
  title: "Member Account::Karen Community SDA",
  description: "View Information associated with your account at karen Community.",
  openGraph: {
      title: 'Member Account::Karen Community SDA',
      description: 'View Information associated with your account at karen Community.',
    },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <AccountProvider>
        <div className="bg-slate-50 dark:bg-gray-950">  
            <nav className="fixed top-0 z-50 w-full bg-slate-50 border-b border-slate-200 dark:bg-gray-950 dark:border-none dark:shadow-gray-800 shadow">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <MobileSidebar />
                        <Link href="/account" className="flex ml-2 md:mr-24">
                            <Image src="/logo.png" className="h-8 mr-3" alt="SDAKCC Logo" width={100} height={20}/>
                        </Link>
                    </div>
                    <UserMenu />
                    </div>
                </div>
            </nav>
            <Sidebar />
            <div className="p-4 sm:ml-64 bg-slate-50 dark:bg-gray-920">
                <div  className="py-2 sm:px-3 sm:py-3 rounded-lg mt-14 min-h-screen dark:text-slate-100">
                    <Breadcrumb />
                    {children}  
                </div>
            </div>
        </div>
    </AccountProvider>
  )
}
