import {TaskStateType} from '../App';
import {v1} from 'uuid';

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


export type ActionsType = RemoveTaskActionType |  AddTaskActionType


export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            // const stateCopy = {...state}
            const tasks = state[action.todoListId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            return {
                ...state,
                [action.todoListId]: filteredTasks
            }
        }
        case 'ADD-TASK':
            //const tasks = state[action.todoListId]
            const newTask = {id:v1(), title:action.title,isDone:false}
            return {
                ...state,
                [action.todoListId]:[newTask,...state[action.todoListId]]
            }

        default:
            throw new Error(`I don't understand this action type`)
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
        todoListId,
        title
    }
}


