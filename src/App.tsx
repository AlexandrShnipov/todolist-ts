import React from 'react';
import './reset.css'
import './App.css';
import {TasksType, Todolist} from './components/Todolist';

const tasks1: Array<TasksType> = [
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'React', isDone: false}
]

const tasks2: Array<TasksType> = [
    {id: 1, title: 'Terminator', isDone: true},
    {id: 2, title: 'Viy', isDone: true},
    {id: 3, title: 'Rocky8', isDone: false}
]

const App = () => {
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks1}/>
            <Todolist title={'Movies'} tasks={tasks2}/>
        </div>
    );
}

export default App;

