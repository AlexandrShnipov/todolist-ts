import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {resolveObjectURL} from 'buffer';

export type RemoveTaskType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}

export type Action2Type = {
    type: 'ACTION2'
}


export type ActionsType = RemoveTaskType |
    Action2Type


export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' :
           // const stateCopy = {...state}
            const tasks = state[action.todoListId]
            const filteredTasks = tasks.filter(t=> t.id!==action.taskId)
            return {...state,
                [action.todoListId]: filteredTasks
            }

        case 'ACTION2':
            return {...state}

        default:
            throw new Error(`I don't understand this action type`)
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskType => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todoListId
    }
}

export const action2AC = (title: string): Action2Type => {
    return {
        type: 'ACTION2',
    }
}


