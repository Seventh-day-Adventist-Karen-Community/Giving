'use client'

import { notFound } from 'next/navigation';
import React, {useContext} from 'react'
import { AccountContext } from '../../../../context/account';
import { AccountContextType } from '../../../../context/types';
import { CreateActivityType } from '../../../../types/activities';
import ActivityForm from '../form';

const Page = async () =>{
    const Account = useContext(AccountContext) as AccountContextType
    if(!Account.data.me?.isStaff){
        return(notFound())
    }
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
            endDate: new Date()           
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