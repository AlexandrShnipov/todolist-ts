import React, {useState} from 'react';
import './reset.css'
import './App.css';
import {TasksType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Box, Button, Container, Paper, Toolbar, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
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

    const changeTaskTitle = (taskId: string, newTitle: string, todoListsId: string) => {
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

            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container fixed>
                <Grid container style={{margin: '1rem'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={3}>
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
                                <Grid item style={{display: 'flex'}}>
                                    <Paper style={{padding: '1rem'}}>
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
                                        />
                                    </Paper>

                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>


        </div>
    );
}

export default App;

