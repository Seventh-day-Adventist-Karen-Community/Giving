'use client'

import React from 'react'
import Table from '../../../components/table'
import { FetchAnalytic } from '../../../data/analytic';
import { AdminTextButtonPlain } from '../../../components/buttons';
import { ImNext, ImPrevious } from 'react-icons/im';
import { AnalyticType } from '../../../types/analytic';
import { PaginationQueryType, PaginationType } from '../../../types/paginationType';
import { AccountContext } from '../../../context/account';
import { AccountContextType } from '../../../context/types';
import { notFound } from 'next/navigation';
import { FaSort } from 'react-icons/fa';
import FormUtils from '../../../components/utils/form-utils';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateRangeType, DateValueType } from 'react-tailwindcss-datepicker/dist/types';

const Page = () =>{

    const [analytics, setAnalytics] = React.useState<AnalyticType[]>()
    const [pagination, setPagination] = React.useState<PaginationType>()
    const [total, setTotal] = React.useState<number>()
    const [distinct, setDistinct] = React.useState<number>()
    const [reverse, setReverse] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    // const [hasPreviousPage, setHasPreviousStage] = React.useState(false)
    const [next, setNext] = React.useState(false)
    const [dateFilter, setDateFilter] = React.useState<DateRangeType>({ 
        startDate: null,
        endDate: null 
        }); 

    const handleDateFilterChange = (newValue:DateValueType) => {
        ResetPagination()
        newValue && setDateFilter(newValue); 
        } 

    const Account = React.useContext(AccountContext) as AccountContextType
    let lparams = next ? {
        last: 100,
        before: pagination?.startCursor || '',
    }:{       
        first: 100,
        after: pagination?.endCursor || '',
    }
    let rparams = next ? {
        first: 100,
        after: pagination?.endCursor || '',
    }:{
        last: 100,
        before: pagination?.startCursor || '',
    }
    const params = reverse ? lparams: rparams
    const fetchData  =  React.useCallback( async (param:PaginationQueryType) =>{
        const dateFilterList = dateFilter.startDate && dateFilter.endDate ? [new Date(dateFilter.startDate).toISOString(), new Date(dateFilter.endDate).toISOString()] : undefined
        const {analytic, total, pageInfo, loading, distinct} = await FetchAnalytic({pagination:param, dateFilter: dateFilterList})
        setLoading(loading)
        setAnalytics(analytic)
        setPagination(pageInfo)
        setTotal(total)
        setDistinct(distinct)
    }, [dateFilter])

    React.useEffect(()=>{
        if(!Account?.data?.me?.setup.isAnalyticAdmin){
            return notFound()
        }
        fetchData({first:100})
    }, [Account?.data?.me?.setup.isAnalyticAdmin, fetchData])

    const ToggleReverse = ()=>{
        ResetPagination()
        setReverse(!reverse)
        fetchData(params)
    }

    const ResetPagination = () =>{
        setPagination({
            startCursor:'',
            endCursor: '',
            hasNextPage: false,
            hasPreviousPage: false
        })
    }

    const Paginate = async (next:boolean) =>{   
        setNext(next)
        await fetchData(params)
    }

    return (
        <>
            <div className='w-full flex flex-col  sm:flex-row justify-end gap-2 content-center'>
                <div className='flex gap-1 flex-wrap-reverse justify-end'>
                        <Datepicker value={dateFilter} onChange={(value)=>handleDateFilterChange(value)} showShortcuts/>
                        <AdminTextButtonPlain text={reverse?'Ascending':'Descending'} className='' title='Toggle the order of dates' icon = {<FaSort />} onClick={()=>ToggleReverse()} reverse/>
                        <AdminTextButtonPlain text='Previous' title='Previous' icon={<ImPrevious />}  onClick={()=>Paginate(false)} reverse/>
                        <AdminTextButtonPlain text='Next' title='Next' icon={<ImNext />} onClick={()=>Paginate(true)}/>
                </div>
                <div className='flex text sm gap-2 bg-slate-200 dark:bg-slate-600 px-3 py-2 rounded content-center flex-col justify-center items-center shadow'>
                    <div className='flex flex-row gap-3 justify-center'>
                        <div className='font-bold'>Total:</div>
                        <div className=''>{total??0}</div>
                    </div>
                    <div className='flex flex-row gap-3 justify-center'>
                        <div className='font-bold'>Distinct:</div>
                        <div className=''>{distinct??0}</div>
                    </div>
                    
                </div>
            </div>
            <div className='relative'>
                <FormUtils loading={loading} dark/>
                <Table columns={column()} rows={analytics || []} 
                    table_header= {`All Analytics`}  export_csv_file={`All Analytics`}
                    />
            </div>
        </>
    )
}
function column() {
  return [
    {
      use_in_display: false,
      field: "id",
      primary: true
    }, 
    {
      use_in_display: true,
      field: "datetime",
      use: "Datetime",
      user_primary: true,
      use_in_sorting: true
    },
    {
        field: "domain",
        use: "Domain",
        use_in_search:true
    },
    {
        use_in_display: true,
      field: "clientIp", //Object destructure
      use: "Ip Address",
      use_in_search: true,
      use_in_sorting: true
    },
    {
      field: "siteName",
      use: "Site Name",
      use_in_search:true,
      use_in_sorting: true
    },
    {
      field: "clientBrowser",
      use: "Browser",
      use_in_search:true
    },
    
    {
      field: "device",
      use: "Device",
      use_in_search:false
    }
  ]
}

export default Page