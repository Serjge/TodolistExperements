import React from "react";
import {SelectionMenuItemType, TasksType} from "./App";
import {SelectionMap} from "./SelectionMap";

type MapTasksType = {
    tasks: TasksType[]
    changeIsDoneStatus: (todolistID: string, id: string, isDone: boolean) => void
    changeSelectedStatus: (todolistID: string, id: string, value: string) => void
    removeTask: (todolistID: string, id: string) => void
    todolistID: string
    selectionMenuItem: SelectionMenuItemType[]
}

export const MapTasks = ({
                             tasks,
                             changeIsDoneStatus,
                             changeSelectedStatus,
                             removeTask,
                             todolistID,
                             selectionMenuItem
                         }: MapTasksType) => {

    const onChangeChecked = (taskId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        changeIsDoneStatus(todolistID, taskId, e.currentTarget.checked)
    }

    const onChangeSelection = (taskId: string, priority: string) => {
        changeSelectedStatus(todolistID, taskId, priority)
    }
    return (
        <ul>
            {(tasks.length === 0)
                ? "Tasks not found"
                : tasks.map((t) => {
                    return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                        <input onChange={(e) => onChangeChecked(t.id, e)}
                               key={t.id}
                               checked={t.isDone}
                               type={"checkbox"}/>
                        {t.title}
                        <SelectionMap selectionMenuItem={selectionMenuItem}
                                      value={t.priority}
                                      onChange={(priority) => onChangeSelection(t.id, priority)}/>
                        <button onClick={() => removeTask(todolistID, t.id)}>x</button>
                    </li>
                })}
        </ul>
    )


}

