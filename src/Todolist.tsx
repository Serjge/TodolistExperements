import React, {useState} from "react";
import {ActionTasks, SelectionMenuItemType, TasksType} from "./App";
import {MapTasks} from "./MapTasks";
import {SelectionMap} from "./SelectionMap";

type propsType = {
    todolistID: string
    state: TasksType[]
    titleTask: string
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, filter: ActionTasks) => void
    addTask: (todolistID: string, title: string, priority: string) => void
    filter: ActionTasks
    priorityFilter: (todolistID: string, filter: string) => void
    priority: string
    changeIsDoneStatus: (todolistID: string, id: string, isDone: boolean) => void
    changeSelectedStatus: (todolistID: string, id: string, value: string) => void
    selectionMenuItem: SelectionMenuItemType[]
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
                             selectionMenuItem,
                         }: propsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const [selectValue, setSelectValue] = useState<string>('1')

    const filterTaskSwitch = () => {
        const priorityFilter = (t: TasksType) => (+priority > +'0') ? t.priority === priority : t.priority
        switch (filter) {
            case "action":
                return state.filter(t => !t.isDone).filter(priorityFilter)
            case "completed":
                return state.filter(t => t.isDone).filter(priorityFilter)
            default:
                return state.filter(priorityFilter)
        }
    }
    const tasks = filterTaskSwitch()

    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickAddTask = () => {
        if (title.trim() === '') {
            setError('Пустая строка')
        } else {
            addTask(todolistID, title, selectValue)
            setTitle('')
        }
    }
    const onChangePressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }
    const onChangePriorityFilterHandler = (priority: string) => {
        priorityFilter(todolistID, priority)
    }
    const onChangeNewTaskPriority = (priority: string) => {
        setSelectValue(priority)
    }
    const getClassName = (value: ActionTasks) => filter === value ? 'active' : ''
    const buttonSort = (action: ActionTasks, nameButton: string) => {
        return <button className={getClassName(action)}
                       onClick={() => changeFilter(todolistID, action)}> {nameButton}
        </button>
    }

    return (
        <div className={'wrapper'}>
            <h3>{titleTask}</h3>
            <div>
                <input onKeyPress={onChangePressKey}
                       value={title}
                       onChange={onChangeInputHandler}/>
                <SelectionMap selectionMenuItem={selectionMenuItem}
                              value={selectValue}
                              onChange={onChangeNewTaskPriority}/>

                <button disabled={title === ''}
                        onClick={onClickAddTask}>+
                </button>
                <div>{error}</div>
            </div>
            <MapTasks tasks={tasks}
                      changeIsDoneStatus={changeIsDoneStatus}
                      changeSelectedStatus={changeSelectedStatus}
                      removeTask={removeTask}
                      todolistID={todolistID}
                      selectionMenuItem={selectionMenuItem}/>
            <div>
                {buttonSort('all', 'All')}
                {buttonSort('completed', 'Completed')}
                {buttonSort('action', 'Action')}
                <SelectionMap selectionMenuItem={selectionMenuItem} value={priority}
                              onChange={onChangePriorityFilterHandler}>All</SelectionMap>
            </div>

        </div>
    )
}

