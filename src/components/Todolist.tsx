import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../App';
import './TodoList.css'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todoListId: string) => void
    changedFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoListApp: (todoListId: string) => void
}

export const Todolist = (props: TodoListPropsType) => {

    const {
        tasks, removeTask, title,
        changedFilter, addTask, changeTaskStatus,
        filter, id, removeTodoListApp
    } = props

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const tasksList = tasks.map(task => {
            const onRemoveHandler = () => {
                removeTask(task.id, id)
            }
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(task.id, e.currentTarget.checked, id)
            }
            return (
                <li
                    key={task.id}
                    className={task.isDone ? 'is-done' : ''}
                >
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={onChangeHandler}
                    />
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
        if (newTaskTitle.trim() === '') {
            return (
                setError('Title is required')
            )
        }
        addTask(newTaskTitle.trim(), id)
        setNewTaskTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addNewTask()
        }
    }

    const onAllClickHandler = () => {
        changedFilter('all', props.id)
        setError(null)
    }
    const onActiveClickHandler = () => {
        setError(null)
        changedFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        setError(null)
        changedFilter('completed', props.id)
    }

    const removeTodoList = () => {
        removeTodoListApp(id)
    }

    return (
        <>
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h3>{title}</h3>
                    <button onClick={removeTodoList}>x</button>
                </div>

                <div>
                    <input
                        value={newTaskTitle}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        className={error ? 'error' : ''}
                    />
                    <button onClick={addNewTask}>+</button>
                    {error && <p className={'error-message'}>{error}</p>}
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button
                        className={filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                    </button>
                    <button
                        className={filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                    </button>
                    <button
                        className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </>

    )
}