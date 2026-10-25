import React from 'react'
import { gql } from '@apollo/client'
import client from '../apollo-client'
import { TransactionType } from '../types/quickbooks'


export const FetchTransactions = async () => {
  const {data, loading}= await client.query({
    query: gql`
        query CustomerTransactions{
            quickbooksCustomerTransactions
        }
    `,
  })

  let result:{transactions: TransactionType[], summary:TransactionType} = {
    transactions: data.quickbooksCustomerTransactions.rows,
    summary: data.quickbooksCustomerTransactions.summary
  }
  return {data:result, loading}
}
