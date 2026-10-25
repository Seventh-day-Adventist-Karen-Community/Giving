'use client'

import React,{useReducer, useState, useEffect, useContext} from 'react'
import FormUtils from '@components/utils/form-utils';
import InputComponent, { FileComponent, TextAreaComponent } from '@components/utils/input-component';
import { MessageContext,MessagesContextType } from '@components/toast/context';
import { Options } from '@components/utils/select/components/type';
import FormDropdown from '@components/utils/select-dropdown';
import { BeliefReducer, BeliefsActionEnum } from '@reducers/beliefReducer';
import { CreateBelief, FetchAdventistBeliefsCategories, UpdateBelief } from '@data/adventist_beliefs';
import TinyMCEEditor from '@components/utils/TinyMCE/tiny-mce-editor';

const BeliefForm = ({initData,newRecord}:{initData:any, newRecord?:boolean}) => {
    const [state, dispatch] = useReducer(BeliefReducer, initData);
    const SuccessMessage =  newRecord?'Belief Successfully Created.':`Belief "${state.name}" Updated.`
    const [Loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<Options>()
    const [errors, setErrors] = useState<string>()
    const [success, setSuccess] = useState(false)
    const [errored, setErrored] = useState(true)
    const Messages = useContext(MessageContext) as MessagesContextType
    const defaultOptions = [{value:'', label:'No Options Available'}]
    const FetchCategories = async () =>{
        const categories =  await FetchAdventistBeliefsCategories()
        if(categories.success){
            const categoryOption = categories?.category?.map((data)=> {
                return({
                    value: data.id,
                    label: data.name
                })
            })
            setCategories(categoryOption)
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
                    const data = await CreateBelief(state) 
                    if(data.success){
                        setSuccess(true)
                        Messages.setSuccess([SuccessMessage])
                    } else{
                        setErrors('Failed to create Belief!')
                        Messages.setErrors(['Failed to create Belief'])
                    }
                } else{
                    const data = await UpdateBelief(state) 
                    if(data.success){
                        setSuccess(true)
                        Messages.setSuccess([SuccessMessage])
                    } else{
                        setErrors('Failed to Update Belief!')
                        Messages.setErrors(['Failed to Update Belief'])
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
        if(state.name == undefined || state.name == '')
            dispatch({type: BeliefsActionEnum.CHANGE_NAME_ERROR, payload:'Name is a required Field!'})
        if(state.content == undefined || state.content == '')
            dispatch({type: BeliefsActionEnum.CHANGE_DESCRIPTION_ERROR, payload:'Description is a required Field!'}) 
        if(state.categoryName == undefined || state.categoryName == '')
            dispatch({type: BeliefsActionEnum.CHANGE_CATEGORY_ERROR, payload:'Category is a required Field!'})
        if(state.sequenceNo == undefined || state.sequenceNo < 1)
            dispatch({type: BeliefsActionEnum.CHANGE_SEQUENCE_NO_ERROR, payload:'Sequence No cannot be less than 1!'})
        
        }
    useEffect(() => {
        if(state.errored)   
            setErrored(true)
        else
            setErrored(false)
        FetchCategories()        
        if(success){
            if (newRecord)
                dispatch({type: BeliefsActionEnum.RESET})
                }
    }, [state, success, newRecord, Messages])
  return (
    <div>
      <h1 className='text-xl font-bold'>
            {newRecord ?'Create A New Belief': `Edit Belief - ${state.name}`} 
        </h1>
      <div>
      <div className="grid gap-4 my-4">
            <div className="flex flex-col rounded bg-gray-100 dark:bg-gray-950 py-4 px-4">
            <form className="mt-6 flex flex-col gap-y-2 relative" onSubmit={SubmitForm} method='post' encType={'multipart/form-data'}>
                <FormUtils errors={errors} loading={Loading} success={success} dark successMessage={SuccessMessage}/>  
                {newRecord ?
                    <p className='text-sm '>{`You can create a new belief by completing this form`}</p>
                :
                    <p className='text-sm '>{`You can edit a belief by modifying values in this form`}</p>
                }      
                <div className='flex gap-x-2 gap-y-4 flex-wrap justify-between'>
                    <InputComponent dark type='number' min={1} value={state.sequenceNo ?? 0} error={state.sequenceNo_error} className='w-full md:w-72 md:max-w-xs' name='Sequence No.' onChange={(e:any) => dispatch({type: BeliefsActionEnum.CHANGE_SEQUENCE_NO, payload: e.target.value})} />
                    <FormDropdown dark 
                        value={{value:state.categoryName?state.categoryName:'', label:state.categoryLabel?state.categoryLabel:''}} 
                        error={state.categoryName_error} className='w-full md:w-72 md:max-w-xs' name='Category' 
                        onChange={(value:any) => dispatch({type: BeliefsActionEnum.CHANGE_CATEGORY, payload: value})} 
                        options ={categories || defaultOptions}/>
                  
                    <InputComponent dark type='text' value={state.name} error={state.name_error} className='w-full md:w-72 md:max-w-xs' name='Name' onChange={(e:any) => dispatch({type: BeliefsActionEnum.CHANGE_NAME_ERROR, payload: e.target.value})} />                   
                    <FileComponent fileName={state.mainPictureName} dark accept='image/*' error={state.mainPicture_error} className='w-full md:w-96 md:max-w-sm' name='Image' onChange={(e:any) => dispatch({type: BeliefsActionEnum.CHANGE_IMAGE, payload: e.target.files[0]})} />
                    {/* <TextAreaComponent dark type='text' value={state.content || ''} error={state.content_error} className = 'w-full' name='Content' onChange={(e:any) => dispatch({type: BeliefsActionEnum.CHANGE_DESCRIPTION, payload: e.target.value})} /> */}
                    <TinyMCEEditor textareaName='Content' dark className='w-full' error={state.content_error} value={state.content} onEditorChange={(a:string) => dispatch({type: BeliefsActionEnum.CHANGE_DESCRIPTION, payload: a})}/>

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

export default BeliefForm
