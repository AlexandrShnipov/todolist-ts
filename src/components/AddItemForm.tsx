import {Button, IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Add, AddBox} from '@mui/icons-material';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const {addItem} = props

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addNewTask()
        }
    }
    const addNewTask = () => {
        if (newTaskTitle.trim() === '') {
            return (
                setError('Title is required')
            )
        }

        addItem(newTaskTitle.trim())
        setNewTaskTitle('')
    }

    return (
        <div>
            <div>
                <TextField
                    value={newTaskTitle}
                    variant={'outlined'}
                    label={'Type value'}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    error={!!error}
                    helperText={error}
                />
                <IconButton onClick={addNewTask}
                            color={'primary'}>
                    <AddBox/>
                </IconButton>
            </div>
        </div>
    )

}