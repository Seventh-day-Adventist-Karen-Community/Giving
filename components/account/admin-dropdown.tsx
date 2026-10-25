import React,{useState, useRef, useCallback, useEffect} from 'react'
import useOnClickOutside from '../utils/select/hooks/use-onclick-outside';

const AdminDropdown = ({children, name, icon, iconSquared, className}:{children:React.ReactNode, name:string, icon: React.ReactElement, iconSquared?:boolean, className?:string}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [xAxis, setXAxis] = useState<string>()
    const ref = useRef<HTMLDivElement>(null);
 
    const toggleDropdown = useCallback(
        () => {
            setOpen(!open)
        },
        [open],
    )
    
    const closeDropDown = useCallback(() => {
        if (open) setOpen(false);
    }, [open]);
    
    useOnClickOutside(ref, () => {
        closeDropDown();
    });
    useEffect(()=>{
        const rect = ref.current?.getBoundingClientRect();
        // console.log(rect)
        if(rect){
            if(rect.x < 150)
                setXAxis('left-0')
            else
                setXAxis('right-0')
        }
    }, [])
  return (
    <div className="flex items-center ml-3 relative" ref={ref}  onClick={()=>toggleDropdown()} >
            <div title={name}>
                <button type="button" className={`flex text-sm dark:bg-slate-950 ${iconSquared?'rounded':'rounded-full'} focus:ring-4 focus:ring-gray-300 dark:focus:ring-slate-600 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-400 transition-all p-1 delay-75`} aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">{name}</span>
                    {icon}
                </button>
            </div>
            {open && 
                <div className={`z-50 top-4 ${xAxis} absolute my-4 text-base list-none bg-white divide-y divide-slate-100 rounded shadow dark:bg-slate-700 dark:divide-slate-600 dark:text-slate-100 ${className}`} id="dropdown-user">
                    <ul className="py-1" role="none">
                        {children}
                    </ul>
                </div>
            }
        </div>
  )
}

export default AdminDropdown