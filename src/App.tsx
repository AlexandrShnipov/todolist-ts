import React, {useState} from 'react';
import './reset.css'
import './App.css';
import {TasksType, Todolist} from './components/Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {
    const [tasks, setTasks] = useState<Array<TasksType>>(
        [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: string) => {
        const filteredTasks = [...tasks].filter((task) => task.id !== id);
        setTasks(filteredTasks);
        console.log(tasks)

    }

    const changedFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(task => task.isDone === true)
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }


    const changeStatus = (taskId: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    const todoLists:Array<TodoListType> = [
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to by', filter: 'completed'}
    ]

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    return (
                        <Todolist
                            title={tl.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changedFilter={changedFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                        />
                    )

                })
            }

        </div>
    );
}

export default App;

