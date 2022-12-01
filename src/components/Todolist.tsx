import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import './TodoList.css'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import {Delete} from '@mui/icons-material';

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
        changedFilter, changeTaskStatus,
        filter, id, removeTodoListApp
    } = props

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
                    <EditableSpan title={task.title}/>
                    <IconButton
                        onClick={onRemoveHandler}
                        aria-label="delete"
                        size="small">
                        <Delete fontSize={'inherit'}/>
                    </IconButton>
                </li>
            )
        }
    )

    const onAllClickHandler = () => {
        changedFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        changedFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        changedFilter('completed', props.id)
    }

    const removeTodoList = () => {
        removeTodoListApp(id)
    }

    const addTask = (title: string) => {
        props.addTask(title, id)
    }

    return (
        <>
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h3>{title}</h3>
                    <IconButton
                        onClick={removeTodoList}
                        aria-label="delete"
                        size="small">
                        <Delete />
                    </IconButton>
                </div>

                <AddItemForm addItem={addTask}/>
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

