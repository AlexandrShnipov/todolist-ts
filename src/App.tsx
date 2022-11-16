import * as React from 'react';
import './reset.css'
import './App.css';
import {TasksType, Todolist} from './components/Todolist';
import {useState} from 'react';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

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
    if(filter==='active'){
        tasksForTodoList = tasks.filter(task=> task.isDone === false)
    }
    if(filter === 'completed'){
        tasksForTodoList = tasks.filter(task=> task.isDone === true)
    }

    const addTask = (title:string) => {
        const newTask =  {
            id: v1(),
            title: title,
            isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist
                title={'Tasks'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changedFilter={changedFilter}
                addTask = {addTask}
            />
        </div>
    );
}

export default App;

