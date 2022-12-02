import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import './TodoList.css'
import {AddItemForm} from './AddItemForm';

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
    changeTodoListTitleApp: (todoListId: string, newTitle:string) => void
}

export const Todolist = (props: TodoListPropsType) => {

    const {
        tasks, removeTask, title,
        changedFilter, changeTaskStatus,changeTaskTitle,
        filter, id, removeTodoListApp,changeTodoListTitleApp,
    } = props

    const tasksList = tasks.map(task => {
            const onRemoveHandler = () => {
                removeTask(task.id, id)
            }
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(task.id, e.currentTarget.checked, id)
            }

            const onChangeTitleHandler = (newValue: string) => {
                changeTaskTitle(task.id, newValue, id)
            }

            return (
                <li
                    key={task.id}
                    className={task.isDone ? 'is-done' : ''}
                >
                    <Checkbox
                        checked={task.isDone}
                        onChange={onChangeStatusHandler}
                    />
                    <span>{task.title}</span>
                    <button onClick={onRemoveHandler}>X</button>
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

    const changeTodoListTitle = (newTitle:string) => {
        changeTodoListTitleApp(id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, id)
    }

    return (
        <>
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h3>
                        <EditableSpan
                            title={title}
                            onChange={changeTodoListTitle}/>
                    </h3>
                    <IconButton
                        onClick={removeTodoList}
                        aria-label="delete"
                        size="small">
                        <Delete/>
                    </IconButton>
                </div>

                <AddItemForm addItem={addTask}/>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <Button
                        variant={filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        color={'primary'}
                        variant={filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button
                        color={'secondary'}
                        variant={filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        </>
    )
}

