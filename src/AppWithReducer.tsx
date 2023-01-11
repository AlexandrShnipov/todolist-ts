import React, {Reducer, useReducer} from 'react';
import './reset.css'
import './App.css';
import {TasksType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Box, Button, Container, Paper, Toolbar, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import {
    addTodoListAC,
    changeTodoListFilterAC, changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer,
    TodoListsReducerActionsType
} from './state/todoLists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksReducerActionsType
} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export const AppWithReducer = () => {

    const todoListId1 = v1()
    const todolistId2 = v1()

    const [todoLists, dispatchToTodoLists] =
        useReducer<Reducer<Array<TodoListType>, TodoListsReducerActionsType>>
        (todoListsReducer, [
            {id: todoListId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to by', filter: 'all'}
        ])

    const [tasks, dispatchToTasks] =
        useReducer<Reducer<TaskStateType, TasksReducerActionsType>>
        (tasksReducer, {
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
        dispatchToTasks(removeTaskAC(id, todoListsId))
    }

    const addTask = (title: string, todoListsId: string) => {
        dispatchToTasks(addTaskAC(title, todoListsId))
    }

    const changeStatus = (id: string, isDone: boolean, todoListsId: string) => {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todoListsId))
    }

    const changeTaskTitle = (id: string, newTitle: string, todoListsId: string) => {
        dispatchToTasks(changeTaskTitleAC(id, newTitle, todoListsId))
    }

    const changedFilter = (value: FilterValuesType, todoListId: string) => {
        dispatchToTodoLists(changeTodoListFilterAC(todoListId, value))
    }

    const removeTodoListApp = (todoListsId: string) => {
        const action = removeTodoListAC(todoListsId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        dispatchToTodoLists(changeTodoListTitleAC(newTitle, todoListId))
    }

    const addTodoList = (title: string) => {
        //we need created a variable because if we call addTodoListAC twice,
        // it will create two new differences id - will be Error
        const action = addTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
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
                                            changeTodoListTitle={changeTodoListTitle}
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


