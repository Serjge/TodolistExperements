import React from "react";
import {SelectionMenuItemsType, TasksType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {EditableSelect} from "./EditableSelect";
import {Checkbox, IconButton} from "@mui/material";
import {indigo} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete'

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
        return {
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
                            <Checkbox
                                checked={t.isDone}
                                onChange={(e) => onChangeChecked(t.id, e)}
                                sx={{
                                    color: indigo[900],
                                    '&.Mui-checked': {
                                        color: indigo[900],
                                    },
                                }}
                            />

                            <EditableSpan onChangeUpdate={(title) => onChangeUpdateTask(t.id, title)}
                                          title={t.title}/>
                            <EditableSelect selectionMenuItems={selectionMenuItems}
                                            value={t.priority}
                                            onChange={(priority) => onChangeSelection(t.id, priority)}/>
                            <IconButton onClick={() => onClickRemove(t.id)}
                                        aria-label="delete"
                                        sx={{
                                            color: indigo[900],
                                            '&.Mui-checked': {
                                                color: indigo[900],
                                            },
                                        }}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    )
                })}
        </div>
    )
}

