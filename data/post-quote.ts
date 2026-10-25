'use server'

import React from 'react'
import { gql } from "@apollo/client";
import client from "../apollo-client";

export type QuoteType ={
    id?: string;
    title: string;
    title_error?: string;
    content: string;
    content_error?: string;
    reference: string;
    reference_error?: string;
    errored?:boolean
}

export const PostQuote = async (QuoteData:{title:string, reference:string, content:string}) => {
    
    const {data, errors} = await client.mutate({
        mutation: gql`
            mutation CreateQuote($title:String!,$reference:String!, $content:String!){
                createQuotes(input: {title:$title,reference:$reference,content:$content})
                {
                    clientMutationId
                    quote{
                        id
                        title
                        content
                        reference
                    }
                }
            }                    
        `,
        variables:{ 
            ...QuoteData
        },
    })
    console.log(data, errors)
    const quote:QuoteType = data.createQuotes.quote
  return {data:quote, errors:errors}
}
