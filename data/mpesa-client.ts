
import React from 'react'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { InitiatedPaymentType } from './mpesa';
import { NormifyB64 } from '@utils/normify-url';


export const ConfirmStatus = async (reference:string) => {
    let newRef = NormifyB64(reference)
    const {data, errors} = await client.query({
        query: gql`
            query initiatedPayment($transId:ID!){
                initiatedPayment(id: $transId) {
                    CheckoutRequestID
                    MerchantRequestID
                    ResultCode
                    externalReference
                    reference
                    state
                    ResultDescription
                }
            }                 
        `,
        variables:{ 
            transId: newRef
        },
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
    },
    })
    const result:InitiatedPaymentType = data.initiatedPayment
  return {result:result, errors:errors}
}
