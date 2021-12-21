import React, {useState} from "react";
import {SelectionMap} from "./SelectionMap";
import {SelectionMenuItemsType} from "./App";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import grey from "@mui/material/colors/grey";

type InputPropsType = {
    addTaskHandler: (title: string, selectionValue?: string | undefined) => void
    selectionMenuItems?: SelectionMenuItemsType[]
}
export const Input = ({selectionMenuItems, addTaskHandler}: InputPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const [selectValue, setSelectValue] = useState<string>('1')

    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onChangeNewTaskPriority = (priority: string) => {
        setSelectValue(priority)
    }
    const onClickAddTask = () => {
        if (title.trim() === '') {
            setError('Пустая строка')
        } else {
            selectionMenuItems
                ? addTaskHandler(title, selectValue)
                : addTaskHandler(title, undefined)
            setTitle('')
        }
    }
    const onChangePressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }

    return (
        <>
            <div>
                <TextField id="outlined-basic"
                           onChange={onChangeInputHandler}
                           onKeyPress={onChangePressKey}
                           value={title}
                           variant="outlined"
                           sx={{width:'200px', marginRight:'10px', background:grey[400], borderRadius:'5px'}}
                           size={"small"}
                />
                {selectionMenuItems
                && title !== ''
                &&<SelectionMap selectionMenuItems={selectionMenuItems}
                                 value={selectValue}
                                 onChange={onChangeNewTaskPriority}
                    autoFocus={false}/>
                }
                {title !== ''
                && <IconButton disabled={title === ''}
                                             onClick={onClickAddTask}
                                             aria-label="add"
                >
                    <AddIcon/>
                </IconButton>}
                <div>{error}</div>
            </div>


        </>

    )
}