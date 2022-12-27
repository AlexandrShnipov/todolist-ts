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

    const todoListId1 = v1()
    const todolistId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to by', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'book', isDone: false},
            {id: v1(), title: 'milk', isDone: true},
        ]
    })

    const removeTask = (id: string, todoListsId: string) => {
        const todoListTasks = tasks[todoListsId]
        tasks[todoListsId] = todoListTasks.filter((t) => t.id !== id);
        setTasks({...tasks});

    }

    const addTask = (title: string, todoListsId: string) => {
        const task = {
            id: v1(),
            title: title,
            isDone: false
        }
        const todoListTasks = tasks[todoListsId]
        tasks[todoListsId] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListsId: string) => {
        const task = tasks[todoListsId]
        const findTask = task.find(t => t.id === taskId)
        if (findTask) {
            findTask.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListsId: string) => {
        const task = tasks[todoListsId]
        const findTask = task.find(t => t.id === taskId)
        if (findTask) {
            findTask.title = newTitle
            setTasks({...tasks})
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
        delete tasks[todoListsId]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const todoList: TodoListType = {
            id: v1(), title: title, filter: 'all'
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasks,
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
                            let tasksForTodoList = tasks[tl.id]
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(task => task.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(task => task.isDone === true)
                            }
                            return (
                                <Grid
                                    key={tl.id}
                                    item style={{display: 'flex'}}>
                                    <Paper style={{padding: '1rem'}}>
                                        <Todolist
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

