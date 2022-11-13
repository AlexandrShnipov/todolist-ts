import React from 'react';

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id:number)=>void
}

export const Todolist = (props: TodoListPropsType) => {
    const tasks = props.tasks.map(task =>
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={()=>{props.removeTask(task.id)}}>X</button>
        </li>)

    return (
        <>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </>

    )
}