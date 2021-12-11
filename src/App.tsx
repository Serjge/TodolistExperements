import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
    priority: number
}
export type TodoListType = {
    id: string
    title: string
    filter: actionTasks
    priority: number
}
export type TasksStateType = ({
    [key: string]: TasksType[]
})
export type actionTasks = 'all' | 'completed' | 'action'

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const todoListState:TodoListType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all', priority: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', priority: 0},
    ]

    const tasksState: TasksStateType = {
        [todolistID1]: [
            {id: v1(), title: 'HTML', isDone: false, priority: 1},
            {id: v1(), title: 'SCSS', isDone: true, priority: 2},
            {id: v1(), title: 'React', isDone: true, priority: 1},
            {id: v1(), title: 'Redux', isDone: true, priority: 3},
            {id: v1(), title: 'HTML', isDone: false, priority: 1},
            {id: v1(), title: 'SCSS', isDone: true, priority: 2},
            {id: v1(), title: 'React', isDone: false, priority: 1},
        ], [todolistID2]: [
            {id: v1(), title: 'HTML', isDone: false, priority: 1},
            {id: v1(), title: 'SCSS', isDone: true, priority: 2},
            {id: v1(), title: 'React', isDone: true, priority: 1},
            {id: v1(), title: 'Redux', isDone: true, priority: 3},
            {id: v1(), title: 'HTML', isDone: false, priority: 1},
            {id: v1(), title: 'SCSS', isDone: true, priority: 2},
            {id: v1(), title: 'React', isDone: false, priority: 1},
        ],
    }
    let [todoLists, setTodoLists] = useState<TodoListType[]>(todoListState)
    const [tasks, setTasks] = useState<TasksStateType>(tasksState)

    const changeFilter = (todolistID: string, filter: actionTasks) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }

    const priorityFilter = (todolistID: string, priority: number) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, priority} : tl))
    }

    const removeTask = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)})
    }

    const addTask = (todolistID: string, title: string, priority: number) => {
        setTasks({
            ...tasks,
            [todolistID]: [...tasks[todolistID], {id: v1(), title: title, isDone: false, priority: priority}]
        })
    }

    const changeIsDoneStatus = (todolistID: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === id ? {...t, isDone} : t)})
    }
    const changeSelectedStatus = (todolistID: string, id: string, priority: number) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === id ? {...t, priority} : t)})
    }

    return (
        <div className={'App'}>

            {todoLists.map(tl => {
                return <Todolist todolistID={tl.id}
                                 key={tl.id}
                                 addTask={addTask}
                                 changeFilter={changeFilter}
                                 removeTask={removeTask}
                                 titleTask={tl.title}
                                 state={tasks[tl.id]}
                                 filter={tl.filter}
                                 priorityFilter={priorityFilter}
                                 priority={tl.priority}
                                 changeIsDoneStatus={changeIsDoneStatus}
                                 changeSelectedStatus={changeSelectedStatus}
                />
            })}
        </div>
    );
}

export default App;
