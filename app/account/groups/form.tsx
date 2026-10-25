'use client'

import React,{useReducer, useState, useEffect, useContext} from 'react'
import FormUtils from '@components/utils/form-utils';
import InputComponent, { FileComponent, TextAreaComponent } from '@components/utils/input-component';
import { MessageContext,MessagesContextType } from '@components/toast/context';
import FormDropdown from '@components/utils/select-dropdown'
import { GroupActionEnum, GroupReducer } from '@reducers/groupReducer';
import { AgeGroup, CommunityType, RoutineChoicesObject } from '../../../types/groupType';
import { FetchAgeGroups, FetchCommunityTypes, FetchMeetingDays } from '@data/fetch_categories';
import { Options } from '@components/utils/select/components/type';
import { CreateGroup, UpdateGroup } from '@data/groups';
import { redirect } from 'next/navigation';
import TinyMCEEditor from '@components/utils/TinyMCE/tiny-mce-editor';

const GroupForm = ({initData,newRecord}:{initData:any, newRecord?:boolean}) => {
    const [state, dispatch] = useReducer(GroupReducer, initData);
    const SuccessMessage =  newRecord?'Church Group Successfully Created.':`Church Group "${state.name}" Updated.`
    const [communityTypes, setCommunityTypes] = useState<Options>()
    const [ageGroups, setAgeGroups] = useState<Options>()
    const [meetingDays, setMeetingDays] = useState<Options>()
    const [routines, setRoutines] = useState<Options>()
    const [Loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<string>()
    const [success, setSuccess] = useState(false)
    const [errored, setErrored] = useState(true)
    const Messages = useContext(MessageContext) as MessagesContextType
    const defaultOptions = [{value:'', label:'No Options Available'}]
    const FetchCategories = async() =>{
        const commTypes =  await FetchCommunityTypes()
        if(commTypes.success){
            const types = commTypes.data.map((data:CommunityType)=> {
                return({
                    value: data.id,
                    label: data.name
                })
            })
            setCommunityTypes(types)
        }
        const agGP = await FetchAgeGroups()
        if(agGP.success){
            const groups = agGP.data.map((data:AgeGroup)=>{
                return({
                    value: data.id,
                    label: data.name
                })
            })
            setAgeGroups(groups)
        }
        const MeetDays = await FetchMeetingDays()
        if(MeetDays.success){
            const days = MeetDays.data.map((data:AgeGroup)=>{
                return({
                    value: data.id,
                    label: data.name
                })
            })
            setMeetingDays(days)
        }
        setRoutines(RoutineChoicesObject)

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
                    const data = await CreateGroup(state) 
                    if(data.success){
                        setSuccess(true)
                        Messages.setSuccess([SuccessMessage])
                    } else{
                        setErrors('Failed to create Group!')
                        Messages.setErrors(['Failed to create Group'])
                    }
                } else{
                    const data = await UpdateGroup(state) 
                    if(data.success){
                        setSuccess(true)
                        Messages.setSuccess([SuccessMessage])
                    } else{
                        setErrors('Failed to Update Group!')
                        Messages.setErrors(['Failed to Update Group'])
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
            dispatch({type: GroupActionEnum.CHANGE_NAME_ERROR, payload:'Group Name is a required Field!'})
        if(state.location == undefined || state.location == '')
            dispatch({type: GroupActionEnum.CHANGE_LOCATION_ERROR, payload:'Location is a required Field!'}) 
        if(state.meetingTime == undefined || state.meetingTime == '')
            dispatch({type: GroupActionEnum.CHANGE_MEETING_TIME_ERROR, payload:'Meeting Time is a required Field!'})
        if(state.routine == undefined || state.routine == '')
            dispatch({type: GroupActionEnum.CHANGE_ROUTINE_ERROR, payload:'Routine is a required Field!'})
        if(state.communityType == undefined || state.communityType == '')
            dispatch({type: GroupActionEnum.CHANGE_COMMUNITY_TYPE_ERROR, payload:'Community Type is a required Field!'})  
        if(state.ageGroup == undefined || state.ageGroup == '')
            dispatch({type: GroupActionEnum.CHANGE_AGE_GROUP_ERROR, payload:'Age Group is a required Field!'})  
        if(state.details == undefined || state.details == '')
            dispatch({type: GroupActionEnum.CHANGE_DETAILS_ERROR, payload:'Details is a required Field!'})  
        if(state.description == undefined || state.description == '')
            dispatch({type: GroupActionEnum.CHANGE_DESCRIPTION_ERROR, payload:'Description is a required Field!'})  
        if(!state.meetingDays)
            dispatch({type: GroupActionEnum.CHANGE_MEETING_DAYS_ERROR, payload:'Meeting Days is a required Field!'})  
        
        }
    useEffect(() => {
        if(state.errored)   
            setErrored(true)
        else
            setErrored(false)
        FetchCategories()        
        if(success){
            if (newRecord)
                dispatch({type: GroupActionEnum.RESET})
                    // redirect('/account/groups')
                }
    }, [state, success, newRecord, Messages])
  return (
    <div>
      <h1 className='text-xl font-bold'>
            {newRecord ?'Create A New Group': `Edit Group - ${state.name}`} 
        </h1>
      <div>
      <div className="grid gap-4 my-4">
            <div className="flex flex-col rounded bg-gray-100 dark:bg-gray-950 py-4 px-4">
            <form className="mt-6 flex flex-col gap-y-2 relative" onSubmit={SubmitForm} method='post' encType={'multipart/form-data'}>
                <FormUtils errors={errors} loading={Loading} success={success} dark successMessage={SuccessMessage}/>  
                {newRecord ?
                    <p className='text-sm '>{`You can create a new group by completing this form`}</p>
                :
                    <p className='text-sm '>{`You can edit your group by modifying values in this form`}</p>
                }      
                <div className='flex gap-x-2 gap-y-4 flex-wrap justify-between'>
                    <InputComponent dark type='text' value={state.name ?? ''} error={state.name_error} className='w-full md:w-72 md:max-w-xs' name='Name' onChange={(e:any) => dispatch({type: GroupActionEnum.CHANGE_NAME, payload: e.target.value})} />
                    <InputComponent dark type='text' value={state.location ?? ''} error={state.location_error} className='w-full md:w-72 md:max-w-xs' name='Location' onChange={(e:any) => dispatch({type: GroupActionEnum.CHANGE_LOCATION, payload: e.target.value})} />
                    <InputComponent dark type='time' value={state.meetingTime ?? ''} error={state.meetingTime_error} className='w-full md:w-72 md:max-w-xs text-sm' name='Meeting Time' onChange={(e:any) => dispatch({type: GroupActionEnum.CHANGE_MEETING_TIME, payload: e.target.value})} />
                    <FormDropdown dark 
                        value={{value:state.routine && state.routine, label:state.routineLabel && state.routineLabel}} 
                        error={state.routine_error} className='w-full md:w-72 md:max-w-xs' name='Routine' 
                        onChange={(value:any) => dispatch({type: GroupActionEnum.CHANGE_ROUTINE, payload: value})} 
                        options ={routines || defaultOptions}/>
                    <FormDropdown 
                        dark
                        error={state.communityType_error}
                        value = {{value:state.communityType && state.communityType, label:state.communityType && state.communityTypeLabel}}
                        name = {'Community Type'}
                        className = {'w-full md:w-72 md:max-w-xs'}
                        onChange={(value:any) => dispatch({type: GroupActionEnum.CHANGE_COMMUNITY_TYPE, payload: value})}
                        options={communityTypes || defaultOptions}
                            />
                   <FormDropdown 
                        isSearchable
                        dark
                        error={state.ageGroup_error}
                        value = {{value:state.ageGroup&&state.ageGroup, label:state.ageGroup&&state.ageGroupLabel}}
                        name = {'Age Group'}
                        className = {'w-full md:w-72 md:max-w-xs'}
                        onChange={(value:any) => dispatch({type: GroupActionEnum.CHANGE_AGE_GROUP, payload: value})}
                        options={ageGroups|| defaultOptions}
                            />
                    <FormDropdown 
                        dark
                        error={state.meetingDays_error}
                        value = {state.meetingDays}
                        name = {'Meeting Days'}
                        isMultiple
                        className = {'w-full md:w-96 md:max-w-sm'}
                        onChange={(value:any) => dispatch({type: GroupActionEnum.CHANGE_MEETING_DAYS, payload: value})}
                        options={meetingDays|| defaultOptions}
                            />
                    <FileComponent fileName={state.imageName} dark accept='image/*' error={state.image_error} className='w-full md:w-96 md:max-w-sm' name='Image' onChange={(e:any) => dispatch({type: GroupActionEnum.CHANGE_IMAGE, payload: e.target.files[0]})} />
                    
                    <InputComponent dark type='text' value={state.details || ''} error={state.details_error} className = 'w-full' name='Details' onChange={(e:any) => dispatch({type: GroupActionEnum.CHANGE_DETAILS, payload: e.target.value})} />
                    {/* <TextAreaComponent dark type='text' value={state.description || ''} error={state.description_error} className = 'w-full' name='Description' onChange={(e:any) => dispatch({type: GroupActionEnum.CHANGE_DESCRIPTION, payload: e.target.value})} /> */}
                    <TinyMCEEditor textareaName='Description' dark className='w-full' error={state.description_error} value={state.description} onEditorChange={(a:string) => dispatch({type: GroupActionEnum.CHANGE_DESCRIPTION, payload: a})}/>
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

export default GroupForm
