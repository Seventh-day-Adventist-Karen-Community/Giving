'use client'

import React from 'react'
import Table from '../../../components/table'
import FormUtils from '../../../components/utils/form-utils';
import { FetchTransactions } from '../../../data/quickbooks';
import { TransactionType } from '../../../types/quickbooks';

export const revalidate = 2000

const Page =  () =>{

    const [transactions, setTransactions] = React.useState<TransactionType[]>()
    const [summary, setSummary] = React.useState<TransactionType>()
    const [loading, setLoading] = React.useState(true)
   
    const fetchData  =   React.useCallback(async () =>{
        const {data, loading} = await FetchTransactions()
        setLoading(loading)
        setTransactions(data.transactions)
        setSummary(data.summary)
    }, [])

    React.useEffect(()=>{
       fetchData()
    }, [fetchData])

    return (
        <>
            <div className='relative'>
                <FormUtils loading={loading} dark/>
                {summary &&
                    <div className='flex flex-row gap-4 justify-end'>
                        <div>{summary?.tx_date} (KES):</div>
                        <div className='font-bold'>{summary?.amount}</div>
                    </div>
                }
                <Table columns={column()} rows={(transactions && transactions) || []} 
                    table_header= {`All Transactions`}  export_csv_file={`All Transactions`}
                    />
            </div>
        </>
    )
}
function column() {
  return [
    {
      use_in_display: true,
      field: "doc_num",
      use: "Document No.",
      primary: true,
      user_primary: true
    }, 
    {
      use_in_display: true,
      field: "tx_date",
      use: "Date",
      use_in_sorting: true
    },
    {
        field: "txn_type",
        use: "Transaction Type",
        use_in_search:true,
        use_in_sorting: true
      },
    {
       use_in_display: true,
      field: "is_no_post",
      use: "Posting",
      use_in_search: true,
    },
    {
      field: "memo",
      use: "Memo/Description",
      use_in_search:true,
      use_in_sorting: true
    },
    {
      field: "account_name",
      use: "Account",
      use_in_search:true,
      use_in_sorting: true
    },    
    {
      field: "amount",
      use: "Amount (KES)",
      use_in_search:false,
      use_in_sorting: true
    }
  ]
}

export default Page