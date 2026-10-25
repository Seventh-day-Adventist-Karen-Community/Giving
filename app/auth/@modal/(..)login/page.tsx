import Link from 'next/link';
import React from 'react'
import Login from '../../login/login';

export const metadata = {
    title: "Account Login | Karen Community SDA",
    description: "Account Login | Seventh Day Adventist Church Karen Community",
    openGraph: {
        title: 'Account Login | Karen Community SDA',
        description: 'Account Login | Seventh Day Adventist Church Karen Community',
      },
  };
  
const Page = ({ params,searchParams,}: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined }}) => {
    
    return (
        <>
            <div className='py-3 w-full'>
                <h1 className="text-3xl font-semibold text-center w-full text-maroon-700 underline decoration-wavy">
                    Sign In
                </h1>
            </div>                
           <Login params={params} searchParams={searchParams} />
            <p className="mt-8 text-xs font-light text-center text-gray-700">
                {" "}
                {`Don't have an account?`}{" "}
                <Link href='/auth/signup' className="font-medium text-maroon-600 hover:underline">
                    Sign up
                </Link>
            </p>
        </>
    );
}

export default Page