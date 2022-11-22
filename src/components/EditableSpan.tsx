import React, {useState} from 'react';

type EditableSpanPropsType = {
    title: string
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
    }

    return (
        editMode ?
            <input value={props.title} onBlur={activateViewMode} autoFocus/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}