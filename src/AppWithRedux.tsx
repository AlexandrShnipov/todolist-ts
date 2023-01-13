import React, {Reducer, useReducer, useState} from 'react';
import './reset.css'
import './App.css';
import {TasksType, TodoList} from './components/TodoList';
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
import {AppRootStateType} from './state/store';
import {useDispatch, useSelector} from 'react-redux';
import {TodoListWithRedux} from './components/TodoListWithRedux';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export const AppWithRedux = () => {



    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    // const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()
    //
    // const removeTask = (id: string, todoListsId: string) => {
    //     dispatch(removeTaskAC(id, todoListsId))
    // }
    //
    // const addTask = (title: string, todoListsId: string) => {
    //     dispatch(addTaskAC(title, todoListsId))
    // }
    //
    // const changeStatus = (id: string, isDone: boolean, todoListsId: string) => {
    //     dispatch(changeTaskStatusAC(id, isDone, todoListsId))
    // }
    //
    // const changeTaskTitle = (id: string, newTitle: string, todoListsId: string) => {
    //     dispatch(changeTaskTitleAC(id, newTitle, todoListsId))
    // }
    //
    // const changedFilter = (value: FilterValuesType, todoListId: string) => {
    //     dispatch(changeTodoListFilterAC(todoListId, value))
    // }
    //
    // const removeTodoListApp = (todoListsId: string) => {
    //     dispatch(removeTodoListAC(todoListsId))
    // }
    //
    // const changeTodoListTitle = (newTitle: string, todoListId: string) => {
    //     dispatch(changeTodoListTitleAC(newTitle, todoListId))
    // }

    const addTodoList = (title: string) => {
        //we need created a variable because if we call addTodoListAC twice,
        // it will create two new differences id - will be Error
        dispatch(addTodoListAC(title))
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
                            // let tasksForTodoList = tasks[tl.id]
                            // if (tl.filter === 'active') {
                            //     tasksForTodoList = tasksForTodoList.filter(task => task.isDone === false)
                            // }
                            // if (tl.filter === 'completed') {
                            //     tasksForTodoList = tasksForTodoList.filter(task => task.isDone === true)
                            // }
                            return (
                                <Grid
                                    key={tl.id}
                                    item style={{display: 'flex'}}>
                                    <Paper style={{padding: '1rem'}}>
                                        <TodoListWithRedux
                                           todoList={tl}
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


