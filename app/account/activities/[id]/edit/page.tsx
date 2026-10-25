import { notFound } from 'next/navigation';
import React from 'react'
import { FetchActivity } from '../../../../../data/activities';
import { CreateActivityType } from '../../../../../types/activities';
import ActivityForm from '../../form';

const Page = async ({ params,searchParams,}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined }}) =>{
    const data = await FetchActivity(params)
    if(!data){
        return notFound()
    }
    function FormatData():CreateActivityType{
        return({
            ...data,
            imageName: data.image,
            image: '',
            activityType_Label:data.activityType,
            errored: false, 
            department: data.department?.id,
            department_Label: data.department?.title,     
        })
    }
    const activity = FormatData()
  return (  
        <>
            <ActivityForm initData={activity}/>
        </>
  )
}

export default Page