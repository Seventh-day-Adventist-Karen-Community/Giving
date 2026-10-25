'use server'

import React from 'react'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { NormifyB64 } from '@utils/normify-url';

export type MpesaLinestype = {
    code: string;
    amount: number | string;
}

export type InitiatedPaymentType = {
    id: string;
    externalReference: string;
    reference: string;
    state: 'INITIATED' | 'FAILED' | 'COMPLETED';
    ResultDescription: string;
}

// Type for fetched Church Unit Nodes
export type ChurchUnitType = {
    id: string;
    name: string;
}

export type MpesaType = {
    name: string;
    name_error?: string;
    phone: string;
    phone_error?: string;
    district?: string;
    church?: string;
    email: string;
    email_error?: string;
    lines?: MpesaLinestype[];
    errored: boolean;
    total?: number;
    save: boolean;
    unit: string;          // Selected ChurchUnit ID (relay global ID, not the unit's name)
    unit_error?: string;   // Optional error field
}

export type PaidTransactionLineType = {
    code: string;
    amount: number;
    description: string;
    name: string;
}

export type PaidTransactionType = {
    no: string;
    name: string;
    phone: string;
    district?: string;
    church?: string;
    email: string;
    reference: string;
    externalReference: string;
    createdAt: Date;
    paymentMode: string;
    lines: PaidTransactionLineType[];
    amount: number;
}

export type PaymentType = {
    code: string;
    sequenceNo: number;
    description: string;
    name: string;
}

// Fetch all Church Units (Follows existing Apollo Query pattern)
export const FetchChurchUnits = async (): Promise<ChurchUnitType[]> => {
    const { data } = await client.query({
        query: gql`
            query ChurchUnits {
                churchUnits {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        `,
        fetchPolicy: 'no-cache',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
    });

    const churchUnits: ChurchUnitType[] = data.churchUnits.edges.map((edge: any) => ({
        ...edge.node,
    }));

    return churchUnits;
};

export const PostMpesa = async (MpesaData: MpesaType) => {
    let error_message = 'Oops! It looks like there are no contributions entered. Please check and try again.'

    let lines = MpesaData.lines?.filter(line => (
        line !== undefined && 
        line !== null && 
        line.amount !== undefined && 
        line.amount !== null && 
        line.amount !== '' && 
        line.amount !== 0 && 
        line.amount !== '0'
    )).map(line => {

        return{
            code: line.code,
            amount: line.amount
        }
    })

    let payload = {
        phone: MpesaData.phone,
        email: MpesaData.email,
        name: MpesaData.name,
        district: MpesaData.district || '',
        church: MpesaData.church || '',
        unit: MpesaData.unit || '', // Church Unit's ID — see note on the mutation's $unit: ID below
        lines: lines
    }

    if (lines == undefined || lines.length == 0) {
        return { errors: [{ message: error_message }] }
    }

    try {
        const { data, errors } = await client.mutate({
            mutation: gql`
                mutation CreateMpesa($phone: String!, $email: String!, $name: String!, $lines: [InitiateLineType]!, $unit: ID) {
                    initiateMpesaExpressPayment(
                        input: { phone: $phone, email: $email, name: $name, lines: $lines, unit: $unit }
                    ) {
                        initiateMpesaExpress {
                            CheckoutRequestID
                            MerchantRequestID
                            ResultCode
                            externalReference
                            ResultDescription
                            mode
                            reference
                            id
                        }
                    }
                }                    
            `,
            variables: { 
                ...payload
            },
            fetchPolicy: "no-cache",
            context: {
                fetchOptions: {
                    next: { revalidate: 0 },
                },
            }
        })

        const result: InitiatedPaymentType = data.initiateMpesaExpressPayment.initiateMpesaExpress
        return { result: result, errors: errors }
    } catch (e: any) {
        // A network- or schema-level failure (e.g. a GraphQL 400 from a bad
        // variable) throws here rather than returning { errors } — without
        // this catch, that exception crashes the whole Server Action as an
        // unhandled 500 instead of surfacing a normal error to the form.
        console.log(e?.message || e)
        return {
            errors: [{ message: e?.message || 'Something went wrong while initiating your payment. Please try again.' }],
        }
    }
}

export const ConfirmStatus = async (reference: string) => {
    const { data, errors } = await client.query({
        query: gql`
            query initiatedPayment($transId: ID!) {
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
        variables: { 
            transId: reference
        },
        fetchPolicy: 'no-cache',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
    })
    const result: InitiatedPaymentType = data.initiatedPayment
    return { result: result, errors: errors }
}

export const FetchPaymentTypes = async () => {
    const { data } = await client.query({
        variables: { 
            active: true,
        },
        query: gql`
            query PaymentTypes {
                paymentTypes(active: true) {
                    edges {
                        node {
                            code
                            id
                            description
                            priority
                            sequenceNo
                            name
                        }
                    }
                }
            }          
        `,
        fetchPolicy: 'no-cache',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            }
        }
    })
    const payTypes: PaymentType[] = data.paymentTypes.edges.map((type: any) => ({
        ...type.node
    }))
    return payTypes
}

export const FetchPaymentType = async (code: string) => {
    const { data } = await client.query({
        variables: { 
            code: code
        },
        query: gql`
            query PaymentTypes($code: String) {
                paymentTypes(code: $code) {
                    edges {
                        node {
                            code
                            id
                            description
                            priority
                            sequenceNo
                            name
                        }
                    }
                }
            }          
        `,
        fetchPolicy: 'no-cache',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            }
        }
    })
    const payTypes: PaymentType[] = data.paymentTypes.edges.map((type: any) => ({
        ...type.node
    }))
    return payTypes
}

export const FetchTransactionReceipt = async (reference: string) => {
    reference = NormifyB64(reference)
    const { data, errors } = await client.query({
        query: gql`
            query TranSactions($reference: String) {
                transactions(reference: $reference) {
                    edges {
                        node {
                            id
                            no
                            notified
                            reference
                            phone
                            paymentMode
                            createdAt
                            confirmationCode
                            amount
                            church
                            district
                            email
                            name
                            transactionLines {
                                edges {
                                    node {
                                        amount
                                        createdAt
                                        id
                                        paymentType {
                                            code
                                            description
                                            name
                                            sequenceNo
                                        }
                                    }
                                }
                            }
                            status
                        }
                    }
                }
            }          
        `,
        variables: { 
            reference: reference
        }
    })
    const result: PaidTransactionType = data.transactions.edges.map((transaction: any) => ({
        ...transaction.node,
        lines: transaction.node.transactionLines.edges.map((line: any) => ({
            ...line.node,
            ...line.node.paymentType
        }))
    }))[0]

    return { result: result, errors: errors }
}