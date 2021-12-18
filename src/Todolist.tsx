import React from "react";
import {MapTasks} from "./MapTasks";
import {SelectionMap} from "./SelectionMap";
import {ActionTasks, SelectionMenuItemsType, TasksType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {Input} from "./Input";

type propsType = {
    todolistID: string
    state: TasksType[]
    titleTask: string
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, filter: ActionTasks) => void
    addTask: (todolistID: string, title: string, priority: string) => void
    filter: ActionTasks
    priorityFilter: (todolistID: string, filter: string) => void
    priority: string
    changeIsDoneStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeSelectedStatus: (todolistID: string, taskId: string, value: string) => void
    selectionMenuItems: SelectionMenuItemsType[]
    updateTask: (todolistID: string, taskId: string, title: string) => void
    removeTodoList: (todoListId: string) => void
    updateTodolist: (todoListId: string, title: string) => void
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
                             selectionMenuItems,
                             updateTask,
                             removeTodoList,
                             updateTodolist
                         }: propsType) => {


    const filterTaskSwitch = () => {
        const priorityFilter = (t: TasksType) => (+priority > 0) ? t.priority === priority : t.priority
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

    const onChangePriorityFilterHandler = (priority: string) => {
        priorityFilter(todolistID, priority)
    }
    const getClassName = (value: ActionTasks) => filter === value ? 'active' : ''
    const buttonSort = (action: ActionTasks, nameButton: string) => {
        return <button style={{margin: '5px'}}
                       className={getClassName(action)}
                       onClick={() => changeFilter(todolistID, action)}> {nameButton}
        </button>
    }
    const onClickRemoveTodolist = () => {
        removeTodoList(todolistID)
    }
    const onChangeUpdateTodoList = (title: string) => {
        updateTodolist(todolistID, title)
    }
    const addTaskHandler =(title:string, selectionValue?:string)=> {
        selectionValue &&
        addTask(todolistID, title, selectionValue)
    }

    return (
        <div className={'wrapper'}>
            <div className={'todoList__title__wrapper'}>
                <h3><EditableSpan title={titleTask} onChangeUpdate={onChangeUpdateTodoList}/></h3>
                <button onClick={onClickRemoveTodolist}>x</button>
            </div>

            <div>
                <Input addTaskHandler={addTaskHandler}
                       selectionMenuItems={selectionMenuItems}

                />
            </div>
            <MapTasks tasks={tasks}
                      changeIsDoneStatus={changeIsDoneStatus}
                      changeSelectedStatus={changeSelectedStatus}
                      removeTask={removeTask}
                      todolistID={todolistID}
                      selectionMenuItems={selectionMenuItems}
                      updateTask={updateTask}
            />
            <div>
                {buttonSort('all', 'All')}
                {buttonSort('completed', 'Completed')}
                {buttonSort('action', 'Action')}
                <SelectionMap selectionMenuItems={selectionMenuItems}
                              value={priority}
                              onChange={onChangePriorityFilterHandler}
                >All</SelectionMap>
            </div>

        </div>
    )
}

