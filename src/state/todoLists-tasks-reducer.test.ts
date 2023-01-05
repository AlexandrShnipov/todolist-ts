import {TaskStateType, TodoListType} from '../App';
import {addTodoListAC, todoListsReducer} from './todoLists-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodoLists).toBe(action.todoListId);
});
