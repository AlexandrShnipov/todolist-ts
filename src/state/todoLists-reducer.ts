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

export type TodoListsReducerActionsType = RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType

export const todoListId1 = v1()
export const todolistId2 = v1()

const initialState: Array<TodoListType> = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to by', filter: 'all'}
]

export const todoListsReducer =
    (state = initialState,
     action: TodoListsReducerActionsType): Array<TodoListType> => {
        switch (action.type) {
            case 'REMOVE-TODOLIST' :
                return (
                    state.filter((tl: TodoListType) => tl.id !== action.id)
                )
            case 'ADD-TODOLIST':
                return [
                    {
                        id: action.todoListId,
                        title: action.title,
                        filter: 'all'
                    },
                    ...state
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
                return state
        }
    }

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return {
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


export const changeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: title,
        id: id
    }
}

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}

