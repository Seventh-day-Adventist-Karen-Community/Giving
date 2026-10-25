import React, { MouseEventHandler } from 'react';
import Link from 'next/link';


export interface LinkInput {
    text: string,
    title?: string,
    link: string,
    icon?: React.ReactNode,
    reverse?: boolean,
    className?: string,
    dark?: boolean,
    onClick?:Function,
    // Optional overrides for this button's background. Pass Tailwind
    // classes (e.g. bg="bg-blue-600" hoverBg="hover:bg-blue-700"). When
    // omitted, each component falls back to its existing default color.
    bg?: string,
    hoverBg?: string,
}
export interface ButtonInput {
    text: string,
    title?: string,
    icon?: React.ReactNode,
    disabled?:boolean,
    reverse?: boolean,
    type?: 'submit' | 'reset' | 'button' | undefined;
    className?: string,
    onClick?:MouseEventHandler<Element> | undefined,
    // Optional overrides for this button's background. Pass Tailwind
    // classes (e.g. bg="bg-blue-600" hoverBg="hover:bg-blue-700"). When
    // omitted, each component falls back to its existing default color.
    bg?: string,
    hoverBg?: string,
}
export const PrimaryButton = (ButtonInput: LinkInput) => {
  const bg = ButtonInput.bg || "bg-maroon-600"
  const hoverBg = ButtonInput.hoverBg || "hover:bg-maroon-700"
  return (
      <Link href = {ButtonInput.link} title={ButtonInput.title} className={`w-full md:w-auto ${bg} ${hoverBg} text-white py-2 px-7 rounded-full shadow-md backdrop:shadow-sm hover:shadow-lg font-semibold z-0 flex flex-nowrap gap-3 content-center items-center ${ButtonInput.reverse? "flex-row-reverse": "flex-row"} justify-center transition-all text-center`}>
        {ButtonInput.text}
        {ButtonInput.icon &&
          <span className='self-center'>
          {ButtonInput.icon}
          </span>
        }
      </Link>
  )
}
export const PrimarySubmitButton = (ButtonInput: ButtonInput) => {
  const bg = ButtonInput.bg || "bg-maroon-600"
  const hoverBg = ButtonInput.hoverBg || "hover:bg-maroon-700"
  return (
    <button disabled={ButtonInput.disabled} type={ButtonInput.type} onClick={ButtonInput.onClick} title={ButtonInput.title} className={`w-full md:w-auto ${bg} ${hoverBg} text-white py-2 px-7 rounded-full shadow-md backdrop:shadow-sm hover:shadow-lg font-semibold z-0 flex flex-nowrap gap-3 content-center items-center ${ButtonInput.reverse? "flex-row-reverse": "flex-row"} justify-center transition-all text-center ${ButtonInput.className}`}>
      {ButtonInput.text}
      {ButtonInput.icon &&
        <span className='self-center'>
        {ButtonInput.icon}
        </span>
      }
      </button>
  )
}
export const TextFormButton = (ButtonInput: ButtonInput) => {
  const bg = ButtonInput.bg || "bg-transparent"
  return (
    <button disabled={ButtonInput.disabled} type={ButtonInput.type} onClick={ButtonInput.onClick} title={ButtonInput.title} className={`w-full md:w-auto ${bg} border-b-2 border-transparent hover:border-maroon-800  px-7 rounded-full font-semibold z-0 flex flex-nowrap gap-3 content-center items-center ${ButtonInput.reverse? "flex-row-reverse": "flex-row"} justify-center transition-all text-center ${ButtonInput.className}`}>
      {ButtonInput.text}
      {ButtonInput.icon &&
        <span className='self-center'>
        {ButtonInput.icon}
        </span>
      }
      </button>
  )
}



export const SecondaryButton = (ButtonInput: LinkInput) => {
  const bg = ButtonInput.bg || (ButtonInput.dark ? "bg-gray-900" : "bg-white")
  const hoverBg = ButtonInput.hoverBg || (ButtonInput.dark ? "hover:bg-gray-800" : "hover:bg-gray-100")
  return (
    <Link href={ButtonInput.link} title={ButtonInput.title} className={`w-full md:w-auto ${bg} ${ButtonInput.dark?"border-gray-900 text-white":"border-white text-maroon-600 hover:text-maroon-700"} py-2 px-7 rounded-full shadow-md hover:shadow-lg ${hoverBg} font-semibold border-1 z-0 text-center flex flex-nowrap gap-3 content-center items-center ${ButtonInput.reverse? "flex-row-reverse": "flex-row"} justify-center transition-all ${ButtonInput.className}`}>
        {ButtonInput.text}
        {ButtonInput.icon &&
          <span className='self-center'>
              {ButtonInput.icon}
          </span>
        }
    </Link>
  )
}
export const OutlineButton = (LinkInput: LinkInput) => {
  const bg = LinkInput.bg || "bg-transparent"
  const hoverBg = LinkInput.hoverBg || "hover:bg-maroon-600"
  return (
    <Link href={LinkInput.link} title={LinkInput.title} className={`w-full md:w-auto ${bg} ${LinkInput.dark?"text-gray-900":"text-white"} py-2 px-7 rounded-full shadow-md hover:shadow-lg ${hoverBg} hover:text-white font-semibold z-0 border-1 ${LinkInput.dark?"border-gray-900":"border-white"} hover:border-maroon-600 text-center flex flex-nowrap gap-3 content-center items-center ${LinkInput.reverse? "flex-row-reverse": "flex-row"} justify-center transition-all ${LinkInput.className}`}>
        {LinkInput.text}
        {LinkInput.icon &&
          <span className='self-center'>
              {LinkInput.icon}
          </span>
        }
    </Link>
  )
}
export const OutlineButton2 = (LinkInput: LinkInput) => {
  const bg = LinkInput.bg || "bg-transparent"
  const hoverBg = LinkInput.hoverBg || "hover:bg-maroon-600"
  return (
    <Link href={LinkInput.link} title={LinkInput.title} className={`w-full md:w-auto ${bg} text-maroon-600 py-2 px-7 rounded-full shadow-md hover:shadow-lg ${hoverBg} hover:text-gray-100 font-semibold z-0 border-1 border-white hover:border-maroon-600 text-center flex flex-nowrap gap-3 content-center items-center ${LinkInput.reverse? "flex-row-reverse": "flex-row"} justify-center transition-all ${LinkInput.className}`}>
        {LinkInput.text}
        {LinkInput.icon &&
          <span className='self-center'>
              {LinkInput.icon}
          </span>
        }
    </Link>
  )
}

export const SuccessLink = (LinkInput: LinkInput) => {
  const bg = LinkInput.bg || "bg-green-500"
  const hoverBg = LinkInput.hoverBg || "hover:bg-green-600"
  return (
    <Link href={LinkInput.link} title={LinkInput.title} className={`w-full md:w-auto ${bg} text-gray-50 py-2 px-7 rounded-full shadow-md hover:shadow-lg ${hoverBg}  font-semibold z-0 border-1 border-green-500 hover:border-green-600 text-center flex flex-nowrap gap-3 content-center items-center ${LinkInput.reverse? "flex-row-reverse": "flex-row"} justify-center transition-all ${LinkInput.className}`}>
        {LinkInput.text}
        {LinkInput.icon &&
          <span className='self-center'>
              {LinkInput.icon}
          </span>
        }
    </Link>
  )
}

export const TextButton = (LinkInput: LinkInput) => {
  const bg = LinkInput.bg || "bg-transparent"
  const hoverBg = LinkInput.hoverBg || "hover:bg-text-900"
  return (
    <Link href={LinkInput.link} title={LinkInput.title} className={`w-full md:w-auto ${bg}  text-maroon-600 rounded-full ${hoverBg} font-semibold z-0 border-none text-center flex flex-nowrap gap-3 flex-row justify-items-center align-middle content-center items-center ${LinkInput.reverse? "flex-row-reverse": "flex-row"} transition-all`}>
        {LinkInput.text}
        {LinkInput.icon &&
          <span className='self-center'>
              {LinkInput.icon}
          </span>
        }
    </Link>
  )
}

export const AdminTextLink = (LinkInput: LinkInput) => {
  const bg = LinkInput.bg || "bg-maroon-600"
  const hoverBg = LinkInput.hoverBg || "hover:bg-maroon-700"
  return (
    <Link href={LinkInput.link} title={LinkInput.title} className={`text-gray-100 text-sm ${bg} dark:bg-gray-600 py-2 px-4 rounded-md hover:dark:bg-gray-700 transition-all ${hoverBg} flex flex-nowrap gap-3 flex-row justify-items-center align-middle focus:ring-2 focus:ring-maroon-700 content-center items-center ${LinkInput.reverse? "flex-row-reverse": "flex-row"} transition-all`}>
        {LinkInput.text}
        {LinkInput.icon &&
          <span className='self-center'>
              {LinkInput.icon}
          </span>
        }
    </Link>
  )
}

export const AdminTextLinkBorder = (LinkInput: LinkInput) => {
  const hoverBg = LinkInput.hoverBg || "hover:bg-maroon-700"
  return (
    <Link href={LinkInput.link} title={LinkInput.title} className={`text-sm border border-maroon-600 dark:border-slate-600 py-2 px-4 rounded-md hover:dark:bg-slate-700 transition-all ${hoverBg} hover:text-slate-100 flex flex-nowrap gap-3 flex-row justify-items-center align-middle focus:ring-2 focus:ring-maroon-700 content-center items-center ${LinkInput.reverse? "flex-row-reverse": "flex-row"} transition-all ${LinkInput.className}`}>
        {LinkInput.text}
        {LinkInput.icon &&
          <span className='self-center'>
              {LinkInput.icon}
          </span>
        }
    </Link>
  )
}
export const AdminTextLinkPlain = (LinkInput: LinkInput) => {
  const hoverBg = LinkInput.hoverBg || "hover:bg-maroon-700"
  return (
    <Link href={LinkInput.link} title={LinkInput.title} className={`text-sm py-2 px-4 rounded-md hover:dark:bg-slate-700 transition-all ${hoverBg} hover:text-slate-100 flex flex-nowrap gap-3 flex-row justify-items-center align-middle focus:ring-2 focus:ring-maroon-700  content-center items-center ${LinkInput.reverse? "flex-row-reverse": "flex-row"} transition-all ${LinkInput.className}`}>
        {LinkInput.text}
        {LinkInput.icon &&
          <span className='self-center'>
              {LinkInput.icon}
          </span>
        }
    </Link>
  )
}


export const AdminTextLinkPlain2 = (LinkInput: LinkInput) => {
  return (
    <Link href={LinkInput.link} title={LinkInput.title} className={`text-base py-1 px-2 rounded-md transition-all hover:text-maroon-400 flex flex-nowrap gap-3 flex-row justify-items-center align-middle focus:ring-2 focus:ring-maroon-700  content-center items-center ${LinkInput.reverse? "flex-row-reverse": "flex-row"} transition-all ${LinkInput.className}`}>
        {LinkInput.text}
        {LinkInput.icon &&
          <span className='self-center'>
              {LinkInput.icon}
          </span>
        }
    </Link>
  )
}

export const AdminTextButtonPlain = (ButtonInput: ButtonInput) => {
  const hoverBg = ButtonInput.hoverBg || "hover:bg-maroon-700"
  return (
   
    <button type={ButtonInput.type} onClick={ButtonInput.onClick} title={ButtonInput.title} className={`text-sm py-2 px-4 rounded-md hover:dark:bg-slate-700 transition-all ${hoverBg} hover:text-slate-100 flex flex-nowrap gap-3 flex-row justify-items-center align-middle focus:ring-2 focus:ring-maroon-700 content-center items-center  ${ButtonInput.reverse? "flex-row-reverse": "flex-row"} transition-all ${ButtonInput.className}`}>
        {ButtonInput.text}
        {ButtonInput.icon &&
          <span className='self-center'>
              {ButtonInput.icon}
          </span>
        }
    </button>
  )
}


export const AdminTextButtonPlain2 = (ButtonInput: ButtonInput) => {
  return (
    <button type={ButtonInput.type && ButtonInput.type} onClick={ButtonInput.onClick} title={ButtonInput.title} className={`text-base py-1 px-2 rounded-md transition-all hover:text-maroon-400 flex flex-nowrap gap-3 flex-row justify-items-center align-middle focus:ring-2 focus:ring-maroon-700 content-center items-center  ${ButtonInput.reverse? "flex-row-reverse": "flex-row"} transition-all ${ButtonInput.className}`}>
        {ButtonInput.text}
        {ButtonInput.icon &&
          <span className='self-center'>
              {ButtonInput.icon}
          </span>
        }
    </button>
  )
}