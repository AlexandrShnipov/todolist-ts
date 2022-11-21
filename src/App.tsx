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

    const removeTask = (id: string) => {
        const filteredTasks = [...tasks].filter((task) => task.id !== id);
        setTasks(filteredTasks);
        console.log(tasks)

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

    const changedFilter = (value: FilterValuesType, todoListId: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to by', filter: 'all'}
    ])

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasks
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasks.filter(task => task.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasks.filter(task => task.isDone === true)
                    }
                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
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

