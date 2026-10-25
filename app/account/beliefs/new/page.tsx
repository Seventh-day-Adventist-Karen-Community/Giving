import React from 'react'
import { CreateBeliefsType } from 'types/detailsType';
import BeliefForm from '../form';

const Page = async () =>{
    function FormatData():CreateBeliefsType{
        return({
            id:'',
            slug:'',
            name:'',
            content:'',
            mainPicture: '',
            mainPictureName: '',
            categoryName: '',
            errored: false,
            sequenceNo: 1,       
        })
    }
    const activity = FormatData()
    return (  
      <>
          <BeliefForm initData={activity} newRecord/>
      </>
    )
}

export default Page
