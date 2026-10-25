import React from 'react'
import { FetchDepartment } from '../../../../../../data/departments';
import { CreateActivityType } from '../../../../../../types/activities';
import { CreateDepartmentsType } from '../../../../../../types/department';
import ActivityForm from '../../../../activities/form';

const Page = async ({ params,searchParams,}: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined }}) =>{
    const departments = await FetchDepartment({id: params.id})

    function FormatData():CreateActivityType{
        return({
            id:'',
            no:'',
            title:'',
            description:'',
            imageName: '',
            image: '',
            errored: false, 
            slots: 0,
            amount: 0,
            startDate: new Date(),
            endDate: new Date(),
            department: departments.id,
            department_Label: departments.title     
        })
    }
    const activity = FormatData()
    return (  
      <>
          <ActivityForm initData={activity} newRecord/>
      </>
    )
}

export default Page