import { Editor } from '@tinymce/tinymce-react'
import React, {useEffect, useState} from 'react'
import { InputComponentType } from '../input-component'
import { Editor as TinyMCEEditoor } from 'tinymce';
import InputErrorComponent from '../input-errors';

export interface TinyMCEProps {
    inline?: boolean;
    onEditorChange: (a: string, editor: TinyMCEEditoor) => void;
    value: string;
    disabled?: boolean;
    textareaName: string;
    rollback?: number | false;
    className?: string,
    dark?: boolean,
    error?: string,
    scriptLoading?: {
        async?: boolean;
        defer?: boolean;
        delay?: number;
    };
}

const TinyMCEEditor = ({value, className, disabled, onEditorChange, textareaName, inline, dark, error}:TinyMCEProps) => {
  return (
    <div className={`flex flex-col gap-y-1 ${className}`}>
        <label htmlFor={textareaName} className={`block text-sm font-semibold text-gray-800  ${dark && "dark:text-gray-200"}`}>{textareaName}</label>
        <Editor inline={inline} disabled={disabled} onEditorChange={onEditorChange} value={value} 
            textareaName={textareaName} 
            tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.5.1/tinymce.min.js" 
            init={{
                "height": 300,
                "menubar": "file edit view insert format tools table help",
                "plugins": "advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount spellchecker",
                "toolbar": "undo redo | bold italic underline strikethrough | blocks fontfamily fontsize | alignleft aligncenter alignright alignjustify | outdent indent | lineheight  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment code",
                "custom_undo_redo_levels": 10,
                "language": "es_ES",
                }
            }
        />
        <InputErrorComponent error={error} />
    </div>
  )
}

export default TinyMCEEditor