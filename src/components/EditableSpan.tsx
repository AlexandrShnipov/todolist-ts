import React, {useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    return (
        editMode
            ? <TextField value={props.title}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}