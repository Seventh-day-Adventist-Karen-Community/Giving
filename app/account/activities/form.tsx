'use client'

import React,{useReducer, useState, useEffect, useContext} from 'react'
import FormUtils from '../../../components/utils/form-utils';
import InputComponent, { FileComponent, TextAreaComponent } from '../../../components/utils/input-component';
import { MessageContext,MessagesContextType } from '../../../components/toast/context';
import { Options } from '../../../components/utils/select/components/type';
import FormDropdown from '../../../components/utils/select-dropdown';
import { ActivityActionEnum, ActivityReducer } from '../../../reducers/activityReducer';
import { CreateActivity, UpdateActivity } from '../../../data/activities';
import FetchDepartments from '../../../data/departments';
import { FormatFriendlyDate, FormatFriendlyDateTime } from '../../../utils/constants';
import TinyMCEEditor from '../../../components/utils/TinyMCE/tiny-mce-editor';

const ActivityForm = ({initData,newRecord}:{initData:any, newRecord?:boolean}) => {
    const [state, dispatch] = useReducer(ActivityReducer, initData);
    const SuccessMessage =  newRecord?'Activity Successfully Created.':`Activity "${state.title}" Updated.`
    const [Loading, setLoading] = useState(false)
    const [departments, setDepartments] = useState<Options>()
    const [errors, setErrors] = useState<string>()
    const [success, setSuccess] = useState(false)
    const [errored, setErrored] = useState(true)
    const Messages = useContext(MessageContext) as MessagesContextType
    const defaultOptions = [{value:'', label:'No Options Available'}]
    const FetchCategories = async () =>{
        const depts =  await FetchDepartments({})
        if(depts.success){
            const deptOption = depts.departments.map((data)=> {
                return({
                    value: data.id,
                    label: data.title
                })
            })
            setDepartments(deptOption)
        }
    }
    const SubmitForm = async (e:any) =>{
        e.preventDefault();
        setSuccess(false)
        CheckMandatory()
        if (!errored){
            setErrors('')
            setLoading(true)
            try{
                if(newRecord){
                    const data = await CreateActivity(state) 
                    if(data.success){
                        setSuccess(true)
                        Messages.setSuccess([SuccessMessage])
                    } else{
                        setErrors('Failed to create Activity!')
                        Messages.setErrors(['Failed to create Activity'])
                    }
                } else{
                    const data = await UpdateActivity(state) 
                    if(data.success){
                        setSuccess(true)
                        Messages.setSuccess([SuccessMessage])
                    } else{
                        setErrors('Failed to Update Activity!')
                        Messages.setErrors(['Failed to Update Activity'])
                    }
                }
            }
            catch (e:any) {
                console.log(e)
                if(e['networkError']){
                    setErrors(e['networkError']);
                    Messages.setErrors([e['networkError']])
                }
                if(e['message']){
                    setErrors(e['message']);    
                    Messages.setErrors([e['message'].split('\n')[0]])
                }                 
            }
            setLoading(false)
        }
    }
    
    const CheckMandatory =() =>{
        if(state.title == undefined || state.title == '')
            dispatch({type: ActivityActionEnum.CHANGE_TITLE_ERROR, payload:'Title is a required Field!'})
        if(state.description == undefined || state.description == '')
            dispatch({type: ActivityActionEnum.CHANGE_DESCRIPTION_ERROR, payload:'Description is a required Field!'}) 
        if(state.startDate == undefined)
            dispatch({type: ActivityActionEnum.CHANGE_START_DATE_ERROR, payload:'Start date is a required Field!'})
        if(state.endDate == undefined)
            dispatch({type: ActivityActionEnum.CHANGE_END_DATE_ERROR, payload:'End date is a required Field!'})
        
        }
    useEffect(() => {
        if(state.errored)   
            setErrored(true)
        else
            setErrored(false)
        FetchCategories()        
        if(success){
            if (newRecord)
                dispatch({type: ActivityActionEnum.RESET})
                    // redirect('/account/groups')
                }
    }, [state, success, newRecord, Messages])
    
    // let startDateString = FormatFriendlyDate(state.startDate)
    let startDateTimeString = FormatFriendlyDateTime(state.startDate)
    // let endDateString = FormatFriendlyDate(state.endDate)
    let endDateTimeString = FormatFriendlyDateTime(state.endDate)
    // console.log(startDateString)
  return (
    <div>
      <h1 className='text-xl font-bold'>
            {newRecord ?'Create A New Activity': `Edit Activity - ${state.title}`} 
        </h1>
      <div>
      <div className="grid gap-4 my-4">
            <div className="flex flex-col rounded bg-gray-100 dark:bg-gray-950 py-4 px-4">
            <form className="mt-6 flex flex-col gap-y-2 relative" onSubmit={SubmitForm} method='post' encType={'multipart/form-data'}>
                <FormUtils errors={errors} loading={Loading} success={success} dark successMessage={SuccessMessage}/>  
                {newRecord ?
                    <p className='text-sm '>{`You can create a new activity by completing this form`}</p>
                :
                    <p className='text-sm '>{`You can edit your activity by modifying values in this form`}</p>
                }      
                <div className='flex gap-x-2 gap-y-4 flex-wrap justify-between'>
                    <InputComponent dark type='text' value={state.title ?? ''} error={state.title_error} className='w-full md:w-72 md:max-w-xs' name='Title' onChange={(e:any) => dispatch({type: ActivityActionEnum.CHANGE_TITLE, payload: e.target.value})} />
                    <FormDropdown dark 
                        value={{value:state.department?state.department:'', label:state.department_Label?state.department_Label:''}} 
                        error={state.department_error} className='w-full md:w-72 md:max-w-xs' name='Department' 
                        onChange={(value:any) => dispatch({type: ActivityActionEnum.CHANGE_DEPARTMENT, payload: value})} 
                        options ={departments || defaultOptions}/>
                  
                    <InputComponent dark type='datetime-local' max={endDateTimeString} value={startDateTimeString ?? ''} error={state.startDate_error} className='w-full md:w-72 md:max-w-xs' name='Start Datetime' onChange={(e:any) => dispatch({type: ActivityActionEnum.CHANGE_START_DATE, payload: e.target.value})} />
                    <InputComponent dark type='datetime-local' min={startDateTimeString} value={endDateTimeString ?? ''} error={state.endDate_error} className='w-full md:w-72 md:max-w-xs' name='End Datetime' onChange={(e:any) => dispatch({type: ActivityActionEnum.CHANGE_END_DATE, payload: e.target.value})} />                   
                    <InputComponent dark type='number' value={state.slots ?? 0} error={state.slots_error} className='w-full md:w-72 md:max-w-xs' name='Slots' onChange={(e:any) => dispatch({type: ActivityActionEnum.CHANGE_SLOT, payload: e.target.value})} />                   
                    <InputComponent dark type='number' step={'0.01'} value={state.amount ?? 0} error={state.amount_error} className='w-full md:w-72 md:max-w-xs' name='Amount' onChange={(e:any) => dispatch({type: ActivityActionEnum.CHANGE_AMOUNT, payload: e.target.value})} />                   
                    <FileComponent fileName={state.imageName} dark accept='image/*' error={state.image_error} className='w-full md:w-96 md:max-w-sm' name='Image' onChange={(e:any) => dispatch({type: ActivityActionEnum.CHANGE_IMAGE, payload: e.target.files[0]})} />
                    {/* <TextAreaComponent dark type='text' value={state.description || ''} error={state.description_error} className = 'w-full' name='Description' onChange={(e:any) => dispatch({type: ActivityActionEnum.CHANGE_DESCRIPTION, payload: e.target.value})} /> */}
                    <TinyMCEEditor textareaName='Description' dark className='w-full'  value={state.description} onEditorChange={(a:string) => dispatch({type: ActivityActionEnum.CHANGE_DESCRIPTION, payload: a})}/>
                </div>
                <div className="mt-6">
                    <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-maroon-700 rounded-md hover:bg-maroon-600 focus:outline-none focus:bg-maroon-600">
                        Save
                    </button>
                </div>
            </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityForm