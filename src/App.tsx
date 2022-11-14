import React, {useState} from 'react';
import './reset.css'
import './App.css';
import {TasksType, Todolist} from './components/Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

const App = () => {

    const [tasks, setTasks] = useState<Array<TasksType>>(
        [
            {id: 1, title: 'HTML', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'React', isDone: false},
            {id: 4, title: 'GraphQL', isDone: false}
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: number) => {
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


    return (
        <div className="App">
            <Todolist
                title={'Movies'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changedFilter={changedFilter}
            />
        </div>
    );
}

export default App;

