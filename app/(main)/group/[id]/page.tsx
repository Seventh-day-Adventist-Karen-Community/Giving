import { notFound } from 'next/navigation';
import React from 'react'
import JoinGroup from '../../../../components/groups/join-group'
import { FetchContactMethods, FetchGroup } from '../../../../data/groups'
export const revalidate = 3600
export async function generateMetadata({ params }:{ params: { id: string }}) {
    const data = await FetchGroup(params)

    return {
      title: data.title,
      description: data.description,
      openGraph: {
        title: data.title,
        description: data.description,
        images: [data.image || '/theme-picture.png'],
      },
    };
  }

const Page = async ({ params,searchParams,}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined }}) =>{
    const data = await FetchGroup(params)
    const contactMethods = await FetchContactMethods()
    if(!data){
        return notFound()
    }
  return (  
    <div>
        <div className='w-full bg-green-400 h-36 text-white flex flex-row justify-center'>
            <p className='flex m-auto text-3xl font-bold'>
            Karen Groups
            </p>
        </div>

        <div className='w-full my-7 flex flex-col xl:flex-row justify-center  text-gray-900 px-2 mx-auto max-w-7xl pt-1 py-7 sm:px-6 lg:px-8'>
            <div className='mx-auto w-full sm:w-3/5 shadow-lg px-5 py-5 rounded-md'>
                <h1 className='text-xl font-bold'>{data.title}</h1>
                <h2 className='text-md text-gray-500'>{data.location}</h2>
                <div className='my-3'>
                    <div dangerouslySetInnerHTML={{__html:data.description}}>
                    </div>
                    <div className='flex flex-row justify-center md:justify-between gap-x-2 gap-y-5 flex-wrap my-6'>
                        <CategoryComponent title='Age' description={data.ageGroup}/>
                        <CategoryComponent title='Community Type' description={data.category}/>
                        <CategoryComponent title='Are Children Allowed' description={data.kidsAllowed?'YES':'NO'}/>
                        <CategoryComponent title='Schedule' description={`${data.days} at ${data.time}`}/>
                        <CategoryComponent title='Leaders' description={data.leaders?.map(leader =>{return (leader.fullName +', ')})}/>
                        <CategoryComponent title='Location' description={data.location}/>
                    </div>
                </div>
            </div>
            <div className='my-7 lg:my-3 mx-auto lg:px-5 w-full sm:w-3/5 '>
                
                <JoinGroup id={data.id} contactMethods={contactMethods}/>
            </div>
        </div>
    </div>
  )
}

const CategoryComponent = ({title,description}:{title:string, description?:string|string[]}) =>{
    return(
        <div className='w-full md:w-44 text-gray-800'>
            <h3 className='text-md font-bold'>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default Page