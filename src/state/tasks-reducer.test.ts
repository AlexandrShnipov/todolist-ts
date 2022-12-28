import {TaskStateType} from '../App';
import {addTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';

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