import { HTMLInputTypeAttribute } from "react"
import InputErrorComponent from "./input-errors"

export type InputComponentType = {
    accept?: string,
    alt?: string | undefined;
    autoComplete?: string | undefined;
    autoFocus?: boolean | undefined;
    capture?: boolean | 'user' | 'environment' | undefined; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
    checked?: boolean | undefined;
    crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
    disabled?: boolean | undefined;
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
    type?: HTMLInputTypeAttribute,
    name?: string,
    displayName?: string,
    value?: string | ReadonlyArray<string> | number,
    error?: string,
    onChange: Function,
    className?: string,
    placeholder?: string,
    dark?: boolean,
    fileName?: string,
    options?: { name: string, key: string | number }[],
    max?: number | string | undefined;
    maxLength?: number | undefined;
    min?: number | string | undefined;
    minLength?: number | undefined;
    step?: number | string | undefined;
    ref?: React.RefObject<HTMLInputElement> | React.RefCallback<HTMLInputElement>;
}

const InputComponent = ({ type, name, displayName, value, error, onChange, className, placeholder, dark, autoComplete, autoFocus, capture, crossOrigin, disabled, max, maxLength, min, minLength, step, ref }: InputComponentType) => {

    return (
        <div>
            <div className={`flex flex-col gap-y-2 relative `}>
                <label htmlFor={name} className={`block text-sm font-semibold text-gray-800  ${dark && "dark:text-gray-200"}`}>{displayName || name}</label>

                <input
                    id={name}
                    type={type}
                    name={name}
                    className={`border-1 hover:border-gray-400 ${dark && 'dark:border-gray-500'} border-gray-300 px-3 py-2 rounded w-full snap-mandatory shadow-inner focus:border-maroon-400 focus:ring-maroon-300 focus:outline-none focus:ring focus:ring-opacity-40 bg-transparent transition-all duration-300`}
                    // className={`block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none ${dark && 'dark:text-white dark:border-gray-600 dark:focus:border-maroon-500'}  focus:outline-none focus:ring-0 focus:border-maroon-600 peer`}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e)}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    capture={capture}
                    crossOrigin={crossOrigin}
                    disabled={disabled}
                    max={max}
                    min={min}
                    maxLength={maxLength}
                    minLength={minLength}
                    step={step}
                    ref={ref}
                />
                {/* <label htmlFor={name}
                    className={`absolute text-sm text-gray-500 ${dark && "dark:text-gray-400"}  duration-300 transform -translate-y-3 scale-75 top-2 z-10 origin-[0] bg-white ${dark && "dark:bg-gray-900"} px-2 peer-focus:px-2 peer-focus:text-maroon-600 peer-focus:text-maroon-600 ${dark && "peer-focus:dark:text-maroon-500"} peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto cursor-text`}
                >{displayName || name}</label> */}
            </div>
            <InputErrorComponent error={error} />
        </div>
    )
}

export default InputComponent

export const GivingInputComponent = ({ type, name, displayName, value, error, onChange, className, placeholder, dark, autoComplete, autoFocus, capture, crossOrigin, disabled, max, maxLength, min, minLength, step, ref }: InputComponentType) => {

    return (
        <div>
            <div className={`flex flex-col gap-y-2 relative `}>
                {/* <label htmlFor={name} className={`block text-sm font-semibold text-gray-800  ${dark && "dark:text-gray-200"}`}>{displayName || name}</label> */}

                <input
                    id={name}
                    type={type}
                    name={name}
                    // className={`border-1 hover:border-gray-400 ${dark && 'dark:border-gray-500'} border-gray-300 px-3 py-2 rounded w-full snap-mandatory shadow-inner focus:border-maroon-400 focus:ring-maroon-300 focus:outline-none focus:ring focus:ring-opacity-40 bg-transparent transition-all duration-300`}
                    className={`block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none ${dark && 'dark:text-white dark:border-gray-600 dark:focus:border-maroon-500'}  focus:outline-none focus:ring-0 focus:border-maroon-600 peer`}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e)}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    capture={capture}
                    crossOrigin={crossOrigin}
                    disabled={disabled}
                    max={max}
                    min={min}
                    maxLength={maxLength}
                    minLength={minLength}
                    step={step}
                    ref={ref}
                />
                <label htmlFor={name}
                    className={`absolute text-sm text-gray-500 ${dark && "dark:text-gray-400"}  duration-300 transform -translate-y-3 scale-75 top-2 z-10 origin-[0] bg-white ${dark && "dark:bg-gray-900"} px-2 peer-focus:px-2 peer-focus:text-maroon-600 peer-focus:text-maroon-600 ${dark && "peer-focus:dark:text-maroon-500"} peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto cursor-text`}
                >{displayName || name}</label>
            </div>
            <InputErrorComponent error={error} />
        </div>
    )
}

export const TextAreaComponent = ({ type, name, displayName, value, error, onChange, className, placeholder, dark, autoComplete, autoFocus, disabled, maxLength, minLength }: InputComponentType) => {
    return (
        <div className={`flex flex-col gap-y-1 ${className}`}>
            <label htmlFor={name} className={`block text-sm font-semibold text-gray-800 ${dark && "dark:text-gray-200"}`}>{displayName || name}</label>
            <textarea name={name}
                className={`border-1 hover:border-gray-400 ${dark && 'dark:border-gray-500'} border-gray-300 px-3 py-2 rounded w-full snap-mandatory shadow-inner focus:border-maroon-400 focus:ring-maroon-300 focus:outline-none focus:ring focus:ring-opacity-40 bg-transparent transition-all duration-300`}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
                rows={8}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                disabled={disabled}
                maxLength={maxLength}
                minLength={minLength}
            />
            <InputErrorComponent error={error} />
        </div>
    )
}


export const FileComponent = ({ accept, name, value, error, onChange, className, placeholder, dark, fileName, autoComplete, autoFocus, capture, crossOrigin, disabled, max, maxLength, min, minLength }: InputComponentType) => {
    return (
        <div className={`flex flex-col gap-y-1 ${className}`}>
            <label htmlFor={name} className={`block text-sm font-semibold text-gray-800  ${dark && "dark:text-gray-200"}`}>{name}</label>
            <input type='file' accept={accept} name={name}
                className={`border-1 hover:border-gray-400 ${dark && 'dark:border-gray-500'} border-gray-300 px-3 py-1.5 rounded w-full snap-mandatory shadow-inner focus:border-maroon-400 focus:ring-maroon-300 focus:outline-none focus:ring focus:ring-opacity-40 bg-transparent transition-all duration-300`}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                capture={capture}
                crossOrigin={crossOrigin}
                disabled={disabled}
                max={max}
                min={min}
                maxLength={maxLength}
                minLength={minLength}
            />
            {fileName &&
                <div className="dark:text-gray-300 text-gray-500 text-xs w-full overflow-hidden text-ellipsis">
                    <p><em className="font-bold">current:</em>{' '}{fileName}</p>
                </div>
            }
            <InputErrorComponent error={error} />
        </div>
    )
}


