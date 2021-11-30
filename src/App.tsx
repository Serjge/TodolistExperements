import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {isBoolean} from "util";

export type TodoStateType = {
    id: string
    title: string
    isDone: boolean
    priority: number
}
export type actionTasks = 'all' | 'completed' | 'action'

function App() {
    const todoState = [
        {id: v1(), title: 'HTML', isDone: true, priority: 1},
        {id: v1(), title: 'SCSS', isDone: true, priority: 2},
        {id: v1(), title: 'React', isDone: false, priority: 1},
        {id: v1(), title: 'Redux', isDone: false, priority: 3},
        {id: v1(), title: 'HTML', isDone: true, priority: 1},
        {id: v1(), title: 'SCSS', isDone: true, priority: 2},
        {id: v1(), title: 'React', isDone: false, priority: 1},
        {id: v1(), title: 'Redux', isDone: false, priority: 3},
        {id: v1(), title: 'HTML', isDone: true, priority: 1},
        {id: v1(), title: 'SCSS', isDone: true, priority: 2},
        {id: v1(), title: 'React', isDone: false, priority: 1},
        {id: v1(), title: 'Redux', isDone: false, priority: 3}
    ]
    const [tasks, setTasks] = useState(todoState)
    const [filter, setFilter] = useState<actionTasks>('all')
    const [priority, setPriority] = useState<number>(0)

    const titleTask = 'What to learn'

    const filterTask = () => {
        let fTasks
        if (filter === 'completed') {
            fTasks = tasks.filter(t => t.isDone).filter(t => (priority > 0) ? t.priority === priority : t.priority)
        } else if (filter === 'action') {
            fTasks = tasks.filter(t => !t.isDone).filter(t => (priority > 0) ? t.priority === priority : t.priority)
        } else {
            fTasks = tasks.filter(t => (priority > 0) ? t.priority === priority : t.priority)
        }
        return fTasks
    }

    let filterTasks = filterTask()

    const changeFilter = (filter: actionTasks) => {
        setFilter(filter)
    }

    const priorityFilter = (priority: number) => {
        setPriority(priority)
    }

    const removeTask = (id: string) => {
        const removeTask = tasks.filter(p => p.id !== id)
        setTasks(removeTask)
    }

    const addTask = (title: string, priority: number) => {
        const newTask = {id: v1(), title: title, isDone: false, priority: priority}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (id: string, value: boolean | number) => {
        const task = tasks.find(t => t.id === id)
        if (task)
            if (typeof value === "number") {
                task.priority = value
            } else {
                task.isDone = value
            }
        setTasks([...tasks])
    }

    return (
        <div className={'App'}>
            <Todolist addTask={addTask}
                      filterTasks={changeFilter}
                      removeTask={removeTask}
                      titleTask={titleTask}
                      state={filterTasks}
                      filter={filter}
                      priorityFilter={priorityFilter}
                      priority={priority}
                      changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;
