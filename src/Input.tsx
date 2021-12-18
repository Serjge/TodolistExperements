import React, {useState} from "react";
import {SelectionMap} from "./SelectionMap";
import {SelectionMenuItemsType} from "./App";

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
                <input onKeyPress={onChangePressKey}
                       value={title}
                       onChange={onChangeInputHandler}
                       style={{margin: '10px'}}/>
                {selectionMenuItems
                && <SelectionMap selectionMenuItems={selectionMenuItems}
                                 value={selectValue}
                                 onChange={onChangeNewTaskPriority}/>
                }
                <button disabled={title === ''}
                        onClick={onClickAddTask}
                        style={{margin: '10px'}}>+
                </button>
                <div>{error}</div>
            </div>


        </>

    )
}