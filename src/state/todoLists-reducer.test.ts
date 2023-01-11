import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './todoLists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

let todoListId1: string;
let todoListId2: string;
let startState: Array<TodoListType>

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todolist should be added', () => {

    let newTodoListTitle = 'New Todolist';

    const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {

    let newTodoListTitle = 'New Todolist';

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todoListId2, newTodoListTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed';

      const endState = todoListsReducer(startState, changeTodoListFilterAC(todoListId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

