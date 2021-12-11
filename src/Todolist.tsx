import React, {useState} from "react";
import {actionTasks, TasksType} from "./App";

type propsType = {
    todolistID: string
    state: TasksType[]
    titleTask: string
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, filter: actionTasks) => void
    addTask: (todolistID: string, title: string, priority: number) => void
    filter: actionTasks
    priorityFilter: (todolistID: string, filter: number) => void
    priority: number
    changeIsDoneStatus: (todolistID: string,id: string, isDone: boolean) => void
    changeSelectedStatus: (todolistID: string,id: string, priority: number) => void
}

export const Todolist = ({
                             state,
                             titleTask,
                             removeTask,
                             changeFilter,
                             addTask,
                             filter,
                             priorityFilter,
                             priority,
                             changeSelectedStatus,
                             changeIsDoneStatus,
                             todolistID,
                             ...props
                         }: propsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const [selectValue, setSelectValue] = useState<number>(1)

    const filterTaskSwitch = () => {
        const priorityFilter = (t: TasksType) => (priority > 0) ? t.priority === priority : t.priority
        switch (filter) {
            case "action":
                return state.filter(t => !t.isDone).filter(priorityFilter)
            case "completed":
                return state.filter(t => t.isDone).filter(priorityFilter)
            default:
                return state.filter(priorityFilter)
        }
    }
    let tasks = filterTaskSwitch()

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickAddTask = () => {
        if (title.trim() === '') {
            setError('Пустая строка')
        } else {
            addTask( todolistID,title, selectValue)
            setTitle('')
        }
    }

    const onChangePressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }

    const onChangePriorityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => priorityFilter(todolistID, +e.target.value)


    const getClassName = (value: actionTasks) => filter === value ? 'active' : ''

    const jsxTasks = (tasks.length === 0)
        ? "Tasks not found" :
        tasks.map((t) => {
            return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                <input onChange={(e) => changeIsDoneStatus(todolistID, t.id, e.currentTarget.checked)}
                       key={t.id}
                       checked={t.isDone}
                       type={"checkbox"}/>
                {t.title}
                <select value={t.priority}
                        onChange={(e) => changeSelectedStatus(todolistID,t.id, +e.currentTarget.value)}>
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </select>
                <button onClick={() => removeTask(todolistID, t.id)}>x</button>
            </li>
        })

    return (
        <div className={'wrapper'}>
            <h3>{titleTask}</h3>
            <div>
                <input onKeyPress={onChangePressKey}
                       value={title}
                       onChange={onChangeHandler}/>
                <select value={selectValue} inputMode={"numeric"}
                        onChange={(e) => setSelectValue(+e.currentTarget.value)}>
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </select>

                <button disabled={title === ''}
                        onClick={onClickAddTask}>+
                </button>
                <div>{error}</div>
            </div>
            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button className={getClassName('all')}
                        onClick={() => changeFilter(todolistID, 'all')}>All
                </button>
                <button className={getClassName('completed')}
                        onClick={() => changeFilter(todolistID, 'completed')}>Completed
                </button>
                <button className={getClassName('action')}
                        onClick={() => changeFilter(todolistID, 'action')}>Action
                </button>

                <select value={priority} onChange={onChangePriorityHandler}>
                    <option value={0}>All</option>
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </select>
            </div>

        </div>
    )
}