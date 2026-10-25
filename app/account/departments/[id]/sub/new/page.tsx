import { notFound } from 'next/navigation';
import React from 'react'
import { FetchDepartment } from '../../../../../../data/departments';
import { CreateDepartmentsType } from '../../../../../../types/department';
import { NormifyB64 } from '../../../../../../utils/normify-url';
import DepartmentForm from '../../../form';

const Page = async ({ params,searchParams,}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined }}) =>{
    const data = await FetchDepartment(params)
    if(!data){
        return notFound()
    }
    function FormatData():CreateDepartmentsType{
        return({
            id:'',
            no:'',
            main: false,
            parent:NormifyB64(data.id),
            title:'',
            description:'',
            deptType:data.deptType,
            imageName: '',
            image: '',
            deptType_Label:data.deptType,
            errored: false,            
        })
    }
    const department = FormatData()
  return (  
        <>
            <DepartmentForm initData={department} newRecord/>
        </>
  )
}

export default Page