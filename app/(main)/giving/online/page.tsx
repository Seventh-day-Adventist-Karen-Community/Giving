'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Constants } from '@utils/constants';
import React, { useState, useReducer, useEffect, useCallback, useContext } from 'react'
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
var CryptoJS = require("crypto-js");
import { PrimarySubmitButton, TextFormButton } from '@components/buttons';
import FormUtils from '@components/utils/form-utils';
import { GivingInputComponent } from '@components/utils/input-component';
import { MpesaActionEnum, MpesaReducer } from '@reducers/mpesaReducer';
import { FetchPaymentTypes, FetchChurchUnits, ChurchUnitType, MpesaType, PaymentType, PostMpesa } from '@data/mpesa';
import ValidateEmail, { ValidatePhoneNumber } from '@utils/validate-util';
import { Loader3 } from '@components/loader'
import Switch from '@components/utils/switch';
import { secret_key } from '@utils/client-constants';
import { MessageContext, MessagesContextType } from '@components/toast/context';

const successMessage = 'Transaction initiated. Please enter your MPESA PIN on your phone.';

export const dynamic = 'force-dynamic'

const FIXED_TYPE_PATTERNS = [/tithe/i, /local\s*church\s*budget/i]

const isFixedPayType = (payType: PaymentType) =>
    FIXED_TYPE_PATTERNS.some((pattern) => pattern.test(payType.description) || pattern.test(payType.code))

const GIVING_STEPS = [
    "Enter your correct Safaricom phone number",
    "Enter an amount for any giving categories you'd like",
    "Click on the submit button",
    "You will receive a prompt on your phone to enter your M-PESA pin",
    "Enter your M-PESA pin",
    "You will receive a confirmation message on your phone",
    "Wait for the receipt to be sent to you by SMS/email",
]

const Page = () => {
    const Messages = useContext(MessageContext) as MessagesContextType

    const initData = {
        name: '',
        phone: '',
        email: '',
        district: '',
        church: '',
        unit: '',
        errored: true,
        save: false,
        lines: []
    }
    const [state, dispatch] = useReducer(MpesaReducer, initData);
    const [Loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<string>()
    const [success, setSuccess] = useState(false)
    const [page, setPage] = useState(1);
    const [payTypes, setPayTypes] = useState<PaymentType[]>()
    const [churchUnits, setChurchUnits] = useState<ChurchUnitType[]>()
    const [addedOtherIndexes, setAddedOtherIndexes] = useState<number[]>([])
    const [showInstructions, setShowInstructions] = useState(false)
    const router = useRouter()

    const formErrored = Boolean(state.name_error || state.phone_error || state.email_error)

    const FetchTypes = async () => {
        try {
            let data = await FetchPaymentTypes();
            setPayTypes(data);
        }
        catch (e: any) {
            if (e['networkError'])
                Messages.setErrors(e['networkError']);
            if (e['message'])
                Messages.setErrors(e['message']);
        }
    }

    const FetchUnits = async () => {
        try {
            let data = await FetchChurchUnits();
            setChurchUnits(data);
        }
        catch (e: any) {
            if (e['networkError'])
                Messages.setErrors(e['networkError']);
            if (e['message'])
                Messages.setErrors(e['message']);
        }
    }

    const SubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Loading) return
        setSuccess(false)
        if (!formErrored) {
            setErrors('')
            setLoading(true)
            try {
                const { result, errors } = await PostMpesa({ ...state })
                SaveDefault()
                if (result) {
                    setSuccess(true)
                    Messages.setSuccess(successMessage, { position: 'top-right' })
                    dispatch({ type: MpesaActionEnum.RESET, payload: initData })
                    router.push(`/give-now/confirm/${result.id}`)
                } else {
                    setSuccess(false)
                    setErrors(errors?.[0]?.message)
                    Messages.setErrors(errors?.[0]?.message || 'There was an error!', { position: 'top-right' });
                }
            }
            catch (e: any) {
                if (e['networkError']) {
                    setErrors(e['networkError']);
                    Messages.setErrors(e['networkError']);
                }
                if (e['message']) {
                    setErrors(e['message']);
                    Messages.setErrors(e['message'], { position: 'top-right' });
                }
            }
            setLoading(false)
        }
    }

    const MoveNext = async () => {
        if (payTypes === undefined)
            await FetchTypes();
        if (churchUnits === undefined)
            await FetchUnits();
        if (!formErrored)
            setPage(2)
    }

    const updateLines = (index: number, newValue: number) => {
        const updatedLines = state.lines !== undefined ? [...state.lines] : [];
        updatedLines[index] = { code: payTypes?.[index].code || '', amount: newValue };
        dispatch({ type: MpesaActionEnum.CHANGE_LINES, payload: updatedLines });
    };

    const AddGivingCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index = Number(e.target.value)
        if (!Number.isNaN(index) && !addedOtherIndexes.includes(index)) {
            setAddedOtherIndexes((prev) => [...prev, index])
        }
        e.target.value = ''
    }

    const RemoveGivingCategory = (index: number) => {
        updateLines(index, 0)
        setAddedOtherIndexes((prev) => prev.filter((i) => i !== index))
    }

    const CheckMandatory = useCallback(() => {
        if (state.name == undefined || state.name.trim() == '')
            dispatch({ type: MpesaActionEnum.CHANGE_NAME_ERROR, payload: 'Name is a required field!' })
        else
            dispatch({ type: MpesaActionEnum.CHANGE_NAME_ERROR, payload: '' })

        if (state.phone == undefined || state.phone.trim() == '')
            dispatch({ type: MpesaActionEnum.CHANGE_PHONE_ERROR, payload: 'Phone Number is a required field! i.e 07xxxxxxxx' })
        else if (!ValidatePhoneNumber(state.phone.trim()))
            dispatch({ type: MpesaActionEnum.CHANGE_PHONE_ERROR, payload: 'Invalid Phone Number!' })
        else
            dispatch({ type: MpesaActionEnum.CHANGE_PHONE_ERROR, payload: '' })

        if (state.email && state.email.trim() !== '' && !ValidateEmail(state.email.trim()))
            dispatch({ type: MpesaActionEnum.CHANGE_EMAIL_ERROR, payload: 'Invalid Email Address!' })
        else
            dispatch({ type: MpesaActionEnum.CHANGE_EMAIL_ERROR, payload: '' })

    }, [state.name, state.phone, state.email])

    const SaveDefault = () => {
        if (state.save) {
            window.localStorage.setItem('giving-mpesa', CryptoJS.AES.encrypt(JSON.stringify(state), secret_key).toString())
        }
    }

    const GetDefault = () => {
        let ciphertext = window.localStorage.getItem('giving-mpesa')
        if (!ciphertext) return
        try {
            var bytes = CryptoJS.AES.decrypt(ciphertext, secret_key);
            var decryptedData: MpesaType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            dispatch({ type: MpesaActionEnum.RESET, payload: decryptedData })
        } catch (error) {
            console.log(error)
        }
    }

    const UpdateSave = () => {
        dispatch({ type: MpesaActionEnum.SWITCH_SAVE, payload: '' })
        if (state.save) {
            window.localStorage.removeItem('giving-mpesa')
        }
    }

    useEffect(() => {
        CheckMandatory()
    }, [CheckMandatory])

    useEffect(() => {
        Messages.setAlert("Welcome to our enhanced giving experience! Enjoy a smoother, and more impactful way to support the work of God.", { position: 'top-right' })
        GetDefault()
        FetchTypes();
        FetchUnits();
    }, [])

    useEffect(() => {
        if (!showInstructions) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowInstructions(false)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [showInstructions])

    const indexedPayTypes = (payTypes || []).map((payType, index) => ({ ...payType, index }))
    const fixedPayTypes = indexedPayTypes.filter((payType) => isFixedPayType(payType))
    const otherPayTypes = indexedPayTypes.filter((payType) => !isFixedPayType(payType))
    const addedOtherPayTypes = otherPayTypes.filter((payType) => addedOtherIndexes.includes(payType.index))
    const availableOtherPayTypes = otherPayTypes.filter((payType) => !addedOtherIndexes.includes(payType.index))
    const total = (state.total || 0).toFixed(2)

    return (
        <div className="flex flex-col flex-grow lg:min-h-screen bg-gray-50">
            <section className="relative w-full overflow-hidden text-white">
                <div
                    className="absolute inset-0 bg-cover bg-top bg-fixed"
                    style={{ backgroundImage: `url(${Constants.IMAGE_BASE_URL}/kcc/Resources/giving-kcc-back.jpg)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-rose-900/40 to-rose-800/10" />

                <div className="relative z-10 max-w-lg mx-auto px-6 pt-14 pb-16 sm:pt-16 sm:pb-20 text-center">
                    <div className="flex justify-center mb-6">
                        <Image src="/logo-white.svg" width={160} height={80} alt="Karen Community SDA logo" className="h-12 w-auto" />
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl leading-tight">
                        Give with a cheerful heart
                    </h1>
                    <p className="mt-4 text-gray-50 text-opacity-90 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
                        Support tithes, offerings, church budget, and other giving categories in a few taps.
                    </p>
                </div>
            </section>

            <div className="relative z-20 flex flex-col items-center px-4 pb-16 -mt-8 sm:-mt-10">
                <div className="w-full max-w-md sm:max-w-lg">
                    <form
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 relative"
                        method="post"
                        onSubmit={SubmitForm}
                    >
                        <FormUtils loading={Loading} success={success} successMessage={successMessage} />

                        {page == 1 &&
                            <div className="flex flex-col gap-y-3">
                                <GivingInputComponent
                                    type="text"
                                    placeholder=""
                                    value={state.name}
                                    error={state.name_error}
                                    name="Name"
                                    onChange={(e: any) => dispatch({ type: MpesaActionEnum.CHANGE_NAME, payload: e.target.value })}
                                />
                                <GivingInputComponent
                                    type="phone"
                                    placeholder=""
                                    value={state.phone}
                                    error={state.phone_error}
                                    name="Phone No."
                                    onChange={(e: any) => dispatch({ type: MpesaActionEnum.CHANGE_PHONE, payload: e.target.value })}
                                />
                                <GivingInputComponent
                                    type="email"
                                    placeholder=""
                                    value={state.email}
                                    error={state.email_error}
                                    name="Email"
                                    displayName="Email (optional)"
                                    onChange={(e: any) => dispatch({ type: MpesaActionEnum.CHANGE_EMAIL, payload: e.target.value })}
                                />
                                <GivingInputComponent
                                    type="text"
                                    placeholder=""
                                    value={state.district || ''}
                                    name="District"
                                    displayName="District (optional)"
                                    onChange={(e: any) => dispatch({ type: MpesaActionEnum.CHANGE_DISTRICT, payload: e.target.value })}
                                />
                                <GivingInputComponent
                                    type="text"
                                    placeholder=""
                                    value={state.church || ''}
                                    name="Church"
                                    displayName="Church (optional)"
                                    onChange={(e: any) => dispatch({ type: MpesaActionEnum.CHANGE_CHURCH, payload: e.target.value })}
                                />
                                <div className="flex flex-col gap-y-1">
                                    <label htmlFor="church-unit" className="text-sm font-medium text-gray-700">
                                        Church Unit (optional)
                                    </label>
                                    <select
                                        id="church-unit"
                                        value={state.unit || ''}
                                        onChange={(e) => {
                                            dispatch({ type: MpesaActionEnum.CHANGE_UNIT, payload: e.target.value })
                                        }}
                                        className="block px-3 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                                    >
                                        <option value="">Select Church Unit &hellip;</option>
                                        {churchUnits?.map((unit) => (
                                            <option key={unit.id} value={unit.pk}>
                                                {unit.name}
                                            </option>
                                        ))}
                                    </select>
                                    {state.unit_error && (
                                        <span className="text-xs text-rose-600">{state.unit_error}</span>
                                    )}
                                </div>
                                <Switch checked={state.save} text="Remember me" setEnabled={UpdateSave} />
                                <div className="pt-3">
                                    <PrimarySubmitButton
                                        type="button"
                                        text="Next"
                                        onClick={MoveNext}
                                        icon={<MdNavigateNext />}
                                        className="w-full md:w-auto bg-rose-900 hover:bg-rose-950"
                                    />
                                </div>
                            </div>
                        }

                        {page == 2 &&
                            <div className="flex flex-col gap-y-3">
                                <div>
                                    <TextFormButton text="Go Back" onClick={() => setPage(1)} icon={<MdNavigateBefore />} reverse className="px-0 rounded-none" />
                                </div>

                                <p className="text-sm text-gray-500 -mt-1">
                                    Every amount below is optional — give as you&apos;re led.
                                </p>

                                {fixedPayTypes.map((payType) => (
                                    <GivingInputComponent
                                        min={0}
                                        key={payType.code}
                                        type="number"
                                        placeholder="0"
                                        value={state?.lines?.[payType.index]?.amount}
                                        name={payType.code}
                                        displayName={payType.description}
                                        onChange={(e: any) => updateLines(payType.index, e.target.value)}
                                    />
                                ))}

                                {addedOtherPayTypes.length > 0 &&
                                    <div className="flex flex-col gap-y-3 pt-1">
                                        {addedOtherPayTypes.map((payType) => (
                                            <div key={payType.code} className="flex items-end gap-2">
                                                <div className="flex-1">
                                                    <GivingInputComponent
                                                        min={0}
                                                        type="number"
                                                        placeholder="0"
                                                        value={state?.lines?.[payType.index]?.amount}
                                                        name={payType.code}
                                                        displayName={payType.description}
                                                        onChange={(e: any) => updateLines(payType.index, e.target.value)}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    aria-label={`Remove ${payType.description}`}
                                                    onClick={() => RemoveGivingCategory(payType.index)}
                                                    className="mb-4 text-gray-400 hover:text-rose-600 transition-colors shrink-0"
                                                >
                                                    <IoClose size={20} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                }

                                {availableOtherPayTypes.length > 0 &&
                                    <div className="pt-1">
                                        <label htmlFor="add-giving-category" className="block text-sm font-semibold text-gray-800 mb-2">
                                            Add another giving category
                                        </label>
                                        <select
                                            id="add-giving-category"
                                            defaultValue=""
                                            onChange={AddGivingCategory}
                                            className="block px-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-rose-600"
                                        >
                                            <option value="" disabled>Choose a category &hellip;</option>
                                            {availableOtherPayTypes.map((payType) => (
                                                <option key={payType.code} value={payType.index}>{payType.description}</option>
                                            ))}
                                        </select>
                                    </div>
                                }

                                <div className="pt-4">
                                    <PrimarySubmitButton
                                        type="submit"
                                        disabled={Loading}
                                        text={`Give KES ${total}`}
                                        icon={Loading && <Loader3 />}
                                        className="w-full bg-rose-900 hover:bg-rose-950"
                                    />
                                </div>
                            </div>
                        }
                    </form>

                    <div className="text-xs font-light text-center text-gray-500 pt-5 pb-2">
                        <Link href="/" className="font-medium hover:underline">
                            Back Home
                        </Link>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setShowInstructions(true)}
                aria-label="How giving with M-Pesa works"
                className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-rose-900 text-white shadow-lg hover:bg-rose-950 transition-colors"
            >
                <HiOutlineInformationCircle size={26} />
            </button>

            {showInstructions &&
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowInstructions(false)}
                    />
                    <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3 text-rose-700 font-bold">
                                <HiOutlineInformationCircle className="w-6 h-6 shrink-0" />
                                How giving with M-Pesa works
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowInstructions(false)}
                                aria-label="Close"
                                className="text-gray-400 hover:text-rose-900 transition-colors shrink-0"
                            >
                                <IoClose size={22} />
                            </button>
                        </div>
                        <ol className="list-decimal list-inside text-sm sm:text-md leading-6 pl-5 space-y-1">
                            {GIVING_STEPS.map((step) => (
                                <li key={step} className="text-body-2">{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            }
        </div>
    )
}

export default Page;