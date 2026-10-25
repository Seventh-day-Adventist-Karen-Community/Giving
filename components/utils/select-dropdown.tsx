import InputErrorComponent from "./input-errors"
import Select from "./select"
import { SelectProps } from "./select/components/type"

     
const FormDropdown = (props:SelectProps) =>{
    return(
        <div className={`flex flex-col gap-y-1 ${props.className}`}>
            <label htmlFor={props.name} className={`block text-sm font-semibold text-gray-800  ${props.dark && "dark:text-gray-200"}`}>{props.name}</label>
            <Select {...props}/>
            <InputErrorComponent error={props.error}/>
        </div>
    )
}

export default FormDropdown

