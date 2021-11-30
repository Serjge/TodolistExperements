import React, {useState} from "react";
import {actionTasks, TodoStateType} from "./App";

type propsType = {
    state: TodoStateType[]
    titleTask: string
    removeTask: (id: string) => void
    filterTasks: (filter: actionTasks) => void
    addTask: (title: string, priority: number) => void
    filter: string
    priorityFilter: (filter: number) => void
    priority: number
    changeTaskStatus: (id: string, value: boolean | number) => void
}

export const Todolist = ({
                             state,
                             titleTask,
                             removeTask,
                             filterTasks,
                             addTask,
                             filter,
                             priorityFilter,
                             priority,
                             changeTaskStatus,
                             ...props
                         }: propsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const [disable, setDisable] = useState(true)
    const [selectValue, setSelectValue] = useState(1)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '') {
            setDisable(true)
        } else {
            setDisable(false)
        }
        setTitle(e.currentTarget.value)
    }

    const onClickAddTask = () => {
        if (title.trim() === '') {
            setError('Пустая строка')
        } else {
            addTask(title, selectValue)
            setTitle('')
            setDisable(true)
        }
    }

    const onChangePressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }

    const onChangeHandlerIsDone = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        let newIsDone = e.currentTarget.checked
        changeTaskStatus(id, newIsDone)
    }
    const onChangeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => changeTaskStatus(id, +e.currentTarget.value)
    const onChangePriorityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => priorityFilter(+e.target.value)

    const getClassName = (value: actionTasks) => filter === value ? 'active' : ''


    const jsxTasks = (state.length === 0) ? "Tasks not found" :
        state.map((t) => {
            return <li className={t.isDone ? 'isDone' : ''}>
                <input onChange={(e) => onChangeHandlerIsDone(e, t.id)}
                       key={t.id}
                       checked={t.isDone}
                       type={"checkbox"}/>
                {t.title}
                <select value={t.priority}
                        onChange={(e) => onChangeSelectHandler(e, t.id)}>
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </select>
                <button onClick={() => removeTask(t.id)}>x</button>
            </li>
        })

    return (
        <div className={'wrapper'}>
            <h3>{titleTask}</h3>
            <div>
                <input onKeyPress={onChangePressKey} value={title} onChange={onChangeHandler}/>
                <select value={selectValue}
                        onChange={(e) => setSelectValue(+e.currentTarget.value)}>
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </select>

                <button disabled={disable} onClick={onClickAddTask}>+</button>
                <div>{error}</div>
            </div>
            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button className={getClassName('all')}
                        onClick={() => filterTasks('all')}>All
                </button>
                <button className={getClassName('completed')}
                        onClick={() => filterTasks('completed')}>Completed
                </button>
                <button className={getClassName('action')}
                        onClick={() => filterTasks('action')}>Action
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