import {SelectionMenuItemType} from "./App";
import React, {ReactNode} from "react";

export type SelectionMapPropsType = {
    selectionMenuItem: SelectionMenuItemType[]
    value: string
    onChange: (priority: string) => void
    children?: ReactNode
}

export const SelectionMap = ({
                                 selectionMenuItem,
                                 value,
                                 onChange,
                                 children
                             }: SelectionMapPropsType) => {

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value)
    }
    return (
        <select value={value} onChange={onChangeHandler}>
            {children ? <option>{children}</option> : null}
            {selectionMenuItem.map(i => <option key={i.id} value={i.value}>
                {i.title}
            </option>)}
        </select>
    )
}