import React from "react";
import {SelectionMenuItemsType, TasksType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {EditableSelect} from "./EditableSelect";

type MapTasksType = {
    tasks: TasksType[]
    changeIsDoneStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeSelectedStatus: (todolistID: string, taskId: string, value: string) => void
    removeTask: (todolistID: string, taskId: string) => void
    todolistID: string
    selectionMenuItems: SelectionMenuItemsType[]
    updateTask: (todolistID: string, taskId: string, title: string) => void
}

export const MapTasks = ({
                             tasks,
                             changeIsDoneStatus,
                             changeSelectedStatus,
                             removeTask,
                             todolistID,
                             selectionMenuItems,
                             updateTask
                         }: MapTasksType) => {

    const onChangeChecked = (taskId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        changeIsDoneStatus(todolistID, taskId, e.currentTarget.checked)
    }

    const onChangeSelection = (taskId: string, priority: string) => {
        changeSelectedStatus(todolistID, taskId, priority)
    }
    const onChangeUpdateTask = (taskId: string, title: string) => {
        updateTask(todolistID, taskId, title)
    }
    const onClickRemove = (taskId: string) => {
        removeTask(todolistID, taskId)
    }
    const styleDiv = (isDone: boolean) => {
        return             {
                margin: '10px',
                opacity: `${isDone ? '0.5' : ''}`
            }

    }
    return (
        <div>
            {(tasks.length === 0)
                ? "Tasks not found"
                : tasks.map((t) => {
                    return (
                        <div key={t.id}
                             style={styleDiv(t.isDone)}
                        >
                            <input onChange={(e) => onChangeChecked(t.id, e)}
                                   key={t.id}
                                   checked={t.isDone}
                                   type={"checkbox"}/>
                            <EditableSpan onChangeUpdate={(title) => onChangeUpdateTask(t.id, title)}
                                          title={t.title}/>
                            <EditableSelect selectionMenuItems={selectionMenuItems}
                                            value={t.priority}
                                            onChange={(priority) => onChangeSelection(t.id, priority)}/>
                            <button onClick={() => onClickRemove(t.id)}>x</button>
                        </div>
                    )
                })}
        </div>
    )
}

