import React, {useState} from 'react';
import './reset.css'
import './App.css';
import {TasksType, Todolist} from './components/Todolist';

const App = () => {

    const [tasks, setTasks] = useState<Array<TasksType>>(
        [
            {id: 1, title: 'HTML', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'React', isDone: false},
            {id: 4, title: 'GraphQL', isDone: false}
        ]
    )

    const removeTask = (id: number) => {
        const filteredTasks = [...tasks].filter((task) => task.id !== id);
        setTasks(filteredTasks);
        console.log(tasks)
    }

    return (
        <div className="App">
            <Todolist
                title={'Movies'}
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;

