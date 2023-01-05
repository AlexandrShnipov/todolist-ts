import {TaskStateType, TodoListType} from '../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodoListAC, removeTodoListAC} from './todoLists-reducer';

test('correct task should be deleted from correct array', () => {
    const startState: TaskStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'GraphQL', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'book', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'bread', isDone: true},
        ]
    }

    const action = removeTaskAC('2', 'todoListId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(4)
    expect(endState['todoListId1'][1].id).toBe('2')
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'].every(t => t.id !== '2')).toBeTruthy()
    expect(endState['todoListId2'][1].id).toBe('3')
})

test ('added task should be corrected', ()=> {
    const startState: TaskStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'GraphQL', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'book', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'bread', isDone: true},
        ]
    }

    const action = addTaskAC('juice', 'todoListId2')
    const andState = tasksReducer(startState, action)

    expect(andState['todoListId1'].length).toBe(4)
    expect(andState['todoListId2'].length).toBe(4)
    expect(andState['todoListId2'][0].id).toBeDefined()
    expect(andState['todoListId2'][0].title).toBe('juice')
    expect(andState['todoListId2'][0].isDone).toBe(false)

})

test('status of specified task should be changed', () => {
    const startState: TaskStateType = {
        "todoListId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = changeTaskStatusAC("2", false, "todoListId2");
    const endState = tasksReducer(startState, action)

    expect(endState['todoListId2'][1].isDone).toBeFalsy();
    expect(endState['todoListId1'][1].isDone).toBeTruthy();

});

test('title of specified task should be changed', () => {
    const startState: TaskStateType = {
        "todoListId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = changeTaskTitleAC("2", 'coffee', "todoListId2");
    const endState = tasksReducer(startState, action)

    expect(endState['todoListId2'][1].title).toBe('coffee');
    expect(endState['todoListId1'][1].title).toBe('JS');

});


test('new array should be added when new todolist is added', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = addTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});


test('property with todoListId should be deleted', () => {
    const startState: TaskStateType = {
        "todoListId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = removeTodoListAC("todoListId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todoListId2"]).toBeUndefined();
});





