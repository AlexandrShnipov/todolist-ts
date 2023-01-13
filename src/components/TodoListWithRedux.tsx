import React, {ChangeEvent} from 'react';
import {FilterValuesType, TodoListType} from '../AppWithRedux';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import {AddItemForm} from './AddItemForm';
import {Button, Checkbox} from '@mui/material';
import {AppRootStateType} from '../state/store';
import {TasksType} from './TodoList';
import {useDispatch, useSelector} from 'react-redux';
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from '../state/todoLists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {Delete} from '@mui/icons-material';

type TodoListWithReduxPropsType = {
    todoList: TodoListType
}

export const TodoListWithRedux = ({todoList}: TodoListWithReduxPropsType) => {

    const {id, title, filter} = todoList
    let tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[id])

    if (filter === 'active') {
        tasks = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone === true)
    }

    const dispatch = useDispatch()

    const changeTodoListTitle = (newTitle: string) => {
        dispatch(changeTodoListTitleAC(newTitle, id))
    }

    const removeTodoList = () => {
        dispatch(removeTodoListAC(id))
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

    const onChangeFilterHandler = (filter: FilterValuesType) => () => {
        dispatch(changeTodoListFilterAC(id, filter))
    }


    const tasksList = tasks.map(task => {
            console.log(task.title, task.isDone)
            const onRemoveHandler = () => dispatch(removeTaskAC(task.id, id))
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked
                dispatch(changeTaskStatusAC(task.id, newIsDoneValue, id))
            }

            const onChangeTitleHandler = (newTitle: string) => {
                dispatch(changeTaskTitleAC(task.id, newTitle, id))
            }

            return (
                <li
                    key={task.id}
                    className={task.isDone ? 'is-done' : ''}
                >
                    <Checkbox
                        checked={task.isDone}
                        onChange={onChangeStatusHandler}
                    />
                    <EditableSpan
                        title={task.title}
                        onChange={onChangeTitleHandler}
                    />
                    <IconButton
                        onClick={onRemoveHandler}
                        aria-label="delete"
                        size="small">
                        <Delete fontSize={'inherit'}/>
                    </IconButton>
                </li>
            )
        }
    )
    return (
        <>
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h3>
                        <EditableSpan title={title} onChange={changeTodoListTitle}/>
                    </h3>
                    <IconButton
                        onClick={removeTodoList}
                        aria-label="delete"
                        size="small">
                        <Delete/>
                    </IconButton>
                </div>

                <AddItemForm addItem={addTask}/>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <Button
                        variant={filter === 'all' ? 'contained' : 'text'}
                        onClick={onChangeFilterHandler('all')}>All
                    </Button>
                    <Button
                        color={'primary'}
                        variant={filter === 'active' ? 'contained' : 'text'}
                        onClick={onChangeFilterHandler('active')}>Active
                    </Button>
                    <Button
                        color={'secondary'}
                        variant={filter === 'completed' ? 'contained' : 'text'}
                        onClick={onChangeFilterHandler('completed')}>Completed
                    </Button>
                </div>
            </div>
        </>
    );
};
