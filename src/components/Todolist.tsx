import React from 'react';
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
    addTask: () => void
}

export const Todolist = (props: TodoListPropsType) => {

    const {tasks, removeTask, title, changedFilter, addTask} = props

    const tasksList = tasks.map(task =>
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={() => {
                removeTask(task.id)
            }}>X
            </button>
        </li>)

    return (
        <>
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button onClick={()=> addTask()}>+</button>
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button onClick={() => changedFilter('all')}>All</button>
                    <button onClick={() => changedFilter('active')}>Active</button>
                    <button onClick={() => changedFilter('completed')}>Completed</button>
                </div>
            </div>
        </>

    )
}