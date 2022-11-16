import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changedFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: TodoListPropsType) => {

    const {tasks, removeTask, title, changedFilter, addTask} = props

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const tasksList = tasks.map(task => {
            const onRemoveHandler = () => {
                removeTask(task.id)
            }
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={onRemoveHandler}>X</button>
                </li>
            )
        }
    )

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const addNewTask = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addNewTask()
        }
    }

    const onAllClickHandler = () => changedFilter('all')
    const onActiveClickHandler = () => changedFilter('active')
    const onCompletedClickHandler = () => changedFilter('completed')

    return (
        <>
            <div>
                <h3>{title}</h3>
                <div>
                    <input
                        value={newTaskTitle}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={addNewTask}>+</button>
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </>

    )
}