'use client'

import { notFound } from 'next/navigation';
import React, {useContext} from 'react'
import { AccountContext } from '../../../../context/account';
import { AccountContextType } from '../../../../context/types';
import { CreateDepartmentsType } from '../../../../types/department';
import DepartmentForm from '../form';

const Page = async () =>{
    const Account = useContext(AccountContext) as AccountContextType
    if(!Account.data.me?.isStaff){
        return(notFound())
    }
    function FormatData():CreateDepartmentsType{
        return({
            id:'',
            no:'',
            main: true,
            parent:'',
            title:'',
            description:'',
            deptType:'',
            imageName: '',
            image: '',
            deptType_Label:'',
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