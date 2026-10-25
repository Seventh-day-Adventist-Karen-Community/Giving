'use client'

import { notFound } from 'next/navigation';
import React from 'react'
import { FetchDepartment } from '../../../../../data/departments';
import { CreateDepartmentsType } from '../../../../../types/department';
import DepartmentForm from '../../form';

const Page = async ({ params,searchParams,}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined }}) =>{
    const data = await FetchDepartment(params)
    if(!data){
        return notFound()
    }
    function FormatData():CreateDepartmentsType{
        return({
            ...data,
            imageName: data.image,
            image: '',
            deptType_Label:data.deptType,
            errored: false, 
            parent: data.parent?.id        
        })
    }
    const department = FormatData()
  return (  
        <>
            <DepartmentForm initData={department}/>
        </>
  )
}

export default Page