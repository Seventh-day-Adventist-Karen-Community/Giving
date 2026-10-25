'use client'

import React,{useReducer, useState, useEffect, useContext} from 'react'
import FormUtils from '../../../components/utils/form-utils';
import InputComponent, { FileComponent, TextAreaComponent } from '../../../components/utils/input-component';
import { MessageContext,MessagesContextType } from '../../../components/toast/context';
import { Options } from '../../../components/utils/select/components/type';
import { DepartmentActionEnum, DepartmentReducer } from '../../../reducers/departmentReducer';
import { CreateDepartments, UpdateDepartments } from '../../../data/departments';
import { DepartmentTypeChoicesObject } from '../../../types/department';
import FormDropdown from '../../../components/utils/select-dropdown';
import TinyMCEEditor from '../../../components/utils/TinyMCE/tiny-mce-editor';

const DepartmentForm = ({initData,newRecord}:{initData:any, newRecord?:boolean}) => {
    const [state, dispatch] = useReducer(DepartmentReducer, initData);
    const SuccessMessage =  newRecord?'Department Successfully Created.':`Department "${state.title}" Updated.`
    const [DepartmentType, setDepartmentType] = useState<Options>()
    const [Loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<string>()
    const [success, setSuccess] = useState(false)
    const [errored, setErrored] = useState(true)
    const Messages = useContext(MessageContext) as MessagesContextType
    const defaultOptions = [{value:'', label:'No Options Available'}]
    const FetchCategories = async() =>{
        setDepartmentType(DepartmentTypeChoicesObject)

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
                    const data = await CreateDepartments(state) 
                    if(data.success){
                        setSuccess(true)
                        Messages.setSuccess([SuccessMessage])
                    } else{
                        setErrors('Failed to create Department!')
                        Messages.setErrors(['Failed to create Department'])
                    }
                } else{
                    const data = await UpdateDepartments(state) 
                    if(data.success){
                        setSuccess(true)
                        Messages.setSuccess([SuccessMessage])
                    } else{
                        setErrors('Failed to Update Department!')
                        Messages.setErrors(['Failed to Update Department'])
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
            dispatch({type: DepartmentActionEnum.CHANGE_TITLE_ERROR, payload:'Title is a required Field!'})
        if(state.deptType == undefined || state.deptType == '')
            dispatch({type: DepartmentActionEnum.CHANGE_DEPT_TYPE_ERROR, payload:'Department Type is a required Field!'}) 
        if(state.imageName == undefined || state.imageName == '')
            dispatch({type: DepartmentActionEnum.CHANGE_IMAGE_ERROR, payload:'Image is a required Field!'})
        if(state.description == undefined || state.description == '')
            dispatch({type: DepartmentActionEnum.CHANGE_DESCRIPTION_ERROR, payload:'Description is a required Field!'})
       
        }
    useEffect(() => {
        if(state.errored)   
            setErrored(true)
        else
            setErrored(false)
        FetchCategories()        
        if(success){
            if (newRecord)
                dispatch({type: DepartmentActionEnum.RESET})
                    // redirect('/account/groups')
                }
    }, [state, success, newRecord, Messages])
  return (
    <div>
      <h1 className='text-xl font-bold'>
            {newRecord ?'Create A New Department': `Edit Department - ${state.title}`} 
        </h1>
      <div>
      <div className="grid gap-4 my-4">
            <div className="flex flex-col rounded bg-gray-100 dark:bg-gray-950 py-4 px-4">
            <form className="mt-6 flex flex-col gap-y-2 relative" onSubmit={SubmitForm} method='post' encType={'multipart/form-data'}>
                <FormUtils errors={errors} loading={Loading} success={success} dark successMessage={SuccessMessage}/>  
                {newRecord ?
                    <p className='text-sm '>{`You can create a new department by completing this form`}</p>
                :
                    <p className='text-sm '>{`You can edit your department by modifying values in this form`}</p>
                }      
                <div className='flex gap-x-2 gap-y-4 flex-wrap justify-between'>
                    <InputComponent dark type='text' value={state.title ?? ''} error={state.title_error} className='w-full md:w-72 md:max-w-xs' name='Title' onChange={(e:any) => dispatch({type: DepartmentActionEnum.CHANGE_TITLE, payload: e.target.value})} />
                    <FormDropdown dark 
                        value={{value:state.deptType && state.deptType, label:state.deptType_Label && state.deptType_Label}} 
                        error={state.deptType_error} className='w-full md:w-72 md:max-w-xs' name='Type' 
                        onChange={(value:any) => dispatch({type: DepartmentActionEnum.CHANGE_DEPT_TYPE, payload: value})} 
                        options ={DepartmentType || defaultOptions}/>
                  
                    <FileComponent fileName={state.imageName} dark accept='image/*' error={state.image_error} className='w-full md:w-96 md:max-w-sm' name='Image' onChange={(e:any) => dispatch({type: DepartmentActionEnum.CHANGE_IMAGE, payload: e.target.files[0]})} />
                    {/* <TextAreaComponent dark type='text' value={state.description || ''} error={state.description_error} className = 'w-full' name='Description' onChange={(e:any) => dispatch({type: DepartmentActionEnum.CHANGE_DESCRIPTION, payload: e.target.value})} /> */}
                    <TinyMCEEditor textareaName='Description' dark className='w-full' error={state.description_error} value={state.description} onEditorChange={(a:string) => dispatch({type: DepartmentActionEnum.CHANGE_DESCRIPTION, payload: a})}/>
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

export default DepartmentForm