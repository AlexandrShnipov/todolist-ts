import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionsType = RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType

export const todoListsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return (
                state.filter((tl: TodoListType) => tl.id !== action.id)
            )
        case 'ADD-TODOLIST':
            return [
                ...state, {
                    id: action.todoListId,
                    title: action.title,
                    filter: 'all'
                }
            ]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find((tl: TodoListType) => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [
                ...state
            ]
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find((tl: TodoListType) => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [
                ...state
            ]
        }

        default:
            throw new Error(`I don't understand this action type`)
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return{
        type: 'REMOVE-TODOLIST',
        id: todoListId
    }
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todoListId: v1()
    }
}


export const changeTodoListTitleAC = (id:string, title: string): ChangeTodoListTitleActionType  => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}

export const changeTodoListFilterAC = (id:string, filter:FilterValuesType):ChangeTodoListFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}

