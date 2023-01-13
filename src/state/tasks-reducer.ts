import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType, todoListId1, todolistId2} from './todoLists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    todoListId: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListId: string
}

export type TasksReducerActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

const initialState: TaskStateType = {
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
}

export const tasksReducer =
    (state = initialState,
     action: TasksReducerActionsType): TaskStateType => {
        switch (action.type) {
            case 'REMOVE-TASK' : {
                // const stateCopy = {...state}
                const tasks = state[action.todoListId]
                const task = tasks.filter(t => t.id !== action.taskId)
                return {
                    ...state,
                    [action.todoListId]: task
                }
            }
            case 'ADD-TASK': {
                //const tasks = state[action.todoListId]
                const newTask = {id: v1(), title: action.title, isDone: false}
                return {
                    ...state,
                    [action.todoListId]: [newTask, ...state[action.todoListId]]
                }
            }
            case 'CHANGE-TASK-STATUS': {
                const tasks = state[action.todoListId]
                const task = tasks.find(t => t.id === action.taskId)
                if (task) {
                    task.isDone = action.isDone
                }
                return {
                    ...state,
                    [action.todoListId]: state[action.todoListId].map((task) =>
                        (task.id === action.taskId ? {...task, isDone: action.isDone} : task))
                }

            }
            case 'CHANGE-TASK-TITLE': {
                const tasks = state[action.todoListId]
                const task = tasks.find(t => t.id === action.taskId)
                if (task) {
                    task.title = action.title
                }
                return {
                    ...state,
                    [action.todoListId]: state[action.todoListId].map((task) =>
                        (task.id === action.taskId ? {...task, title: action.title} : task))
                }
            }
            case 'ADD-TODOLIST': {
                return {
                    ...state,
                    [action.todoListId]: []
                }
            }
            case 'REMOVE-TODOLIST': {
                const stateCopy = {...state}
                delete stateCopy[action.id]
                return (
                    stateCopy
                )
            }

            default:
                return state
        }
    }

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todoListId
    }
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todoListId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todoListId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todoListId
    }
}



