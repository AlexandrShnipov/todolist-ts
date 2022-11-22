import React, {useState} from 'react';

type EditableSpanPropsType = {
    title: string
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true)
    }

    return (
        editMode ?
            <input value={props.title}/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}