import React, {useState} from 'react';
import './reset.css'
import './App.css';
import {TasksType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key:string]: Array<TasksType>
}

const App = () => {
    const removeTask = (id: string, todoListsId: string) => {
        const tasks = tasksObj[todoListsId]
        const filteredTasks = tasks.filter((task) => task.id !== id);
        tasksObj[todoListsId] = filteredTasks
        setTasks({...tasksObj});

    }

    const addTask = (title: string, todoListsId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const tasks = tasksObj[todoListsId]
        const newTasks = [newTask, ...tasks]
        tasksObj[todoListsId] = newTasks
        setTasks({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListsId: string) => {
        const tasks = tasksObj[todoListsId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    const changeTaskTitle = (taskId: string, newTitle:string, todoListsId: string) => {
        const tasks = tasksObj[todoListsId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    const changedFilter = (value: FilterValuesType, todoListId: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    const removeTodoListApp = (todoListsId: string) => {
        const filteredTodoLists = todoLists.filter(tl => tl.id !== todoListsId)
        setTodoLists(filteredTodoLists)
        delete tasksObj[todoListsId]
        setTasks({...tasksObj})
    }

    const changeTodoListTitleApp = (todoListId: string, newTitle:string) => {
        const todoList = todoLists.find(tl=> tl.id === todoListId)
        if(todoList){
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    const todoListsId1 = v1()
    const todolistsId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListsId1, title: 'What to learn', filter: 'all'},
        {id: todolistsId2, title: 'What to by', filter: 'all'}
    ])

    const [tasksObj, setTasks] = useState<TaskStateType>({
        [todoListsId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistsId2]: [
            {id: v1(), title: 'book', isDone: false},
            {id: v1(), title: 'milk', isDone: true},
        ]
    })

    const addTodoList = (title: string) => {
        const todoList: TodoListType = {
            id: v1(), title: title, filter: 'all'
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasksObj,
            [todoList.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                {
                    todoLists.map(tl => {
                        let tasksForTodoList = tasksObj[tl.id]
                        if (tl.filter === 'active') {
                            tasksForTodoList = tasksForTodoList.filter(task => task.isDone === false)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasksForTodoList.filter(task => task.isDone === true)
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
                                changeTaskTitle={changeTaskTitle}
                                filter={tl.filter}
                                removeTodoListApp={removeTodoListApp}
                                changeTodoListTitleApp={changeTodoListTitleApp}
                            />
                        )
                    })
                }
            </div>


        </div>
    );
}

export default App;

