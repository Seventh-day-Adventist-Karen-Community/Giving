'use client'

import React, { useState, useEffect } from 'react';
import { ConfirmStatus } from '@data/mpesa-client';
import { PaymentLoader } from '@components/loader';
import { IoIosCloseCircleOutline, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PrimaryButton, SuccessLink, TextButton } from '@components/buttons';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = ({ params }: { params: { id: string } }) => {
  const [Loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>();
  const [receipt, setReceipt] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (success || failed) {
        clearInterval(interval);
        return;
      }
      try {
        let { result, errors } = await ConfirmStatus(params.id);
        if (result) {
          switch (result.state) {
            case 'COMPLETED':
              setSuccess(true);
              setFailed(false);
              setLoading(false);
              setMessage(result.ResultDescription);
              setReceipt(result.reference);
              clearInterval(interval);
              break;
            case 'FAILED':
              setSuccess(false);
              setFailed(true);
              setLoading(false);
              setMessage(result.ResultDescription);
              clearInterval(interval);
              break;
            case 'INITIATED':
              // Continue polling
              if(counter>10000){
                window.location.reload()
              }
              setCounter(counter+5000)
              break;
            default:
              setFailed(true);
              setLoading(false);
              setMessage(errors?.[0].message || 'A transaction with that reference not found!!!');
              clearInterval(interval);
              break;
          }
        } else {
          setFailed(true);
          setLoading(false);
          setMessage(errors?.[0].message);
          clearInterval(interval);
        }
      } catch (e: any) {
        console.log(e.message);
        setMessage(e.message || e.networkError || 'An error occurred');
        setFailed(true);
        setLoading(false);
        clearInterval(interval);
      }
    }, 3000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [params.id, success, failed, counter]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
          {Loading &&
            <div className="flex flex-col items-center gap-y-4 py-6">
              <PaymentLoader />
              <p className="text-sm text-gray-500">
                Confirming your payment — this usually takes a few seconds.
              </p>
            </div>
          }

          {success &&
            <div className="flex flex-col items-center gap-y-3 py-4">
              <IoMdCheckmarkCircleOutline className="w-16 h-16 sm:w-20 sm:h-20 text-green-500" />
              <p className="text-green-600 text-lg sm:text-xl font-semibold leading-snug">
                {message}
              </p>
              <div className="w-full pt-3">
                <SuccessLink link={`/give-now/receipt/${receipt}`} text="View Receipt" className="w-full" />
              </div>
            </div>
          }

          {failed &&
            <div className="flex flex-col items-center gap-y-3 py-4">
              <IoIosCloseCircleOutline className="w-16 h-16 sm:w-20 sm:h-20 text-red-500" />
              <p className="text-red-600 text-lg sm:text-xl font-semibold leading-snug">
                {message}
              </p>
              <div className="w-full pt-3">
                <PrimaryButton link="/give-now/mpesa" text="Try Again" className="w-full" />
              </div>
            </div>
          }
        </div>

        <div className="flex gap-6 justify-center pt-5">
          <TextButton link="/" text="Back Home" />
          <TextButton link="/give-now/mpesa" text="Give Again" />
        </div>
      </div>
    </div>
  );
}

export default Page;