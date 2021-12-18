import {SelectionMenuItemsType} from "./App";
import React, {ReactNode} from "react";

export type SelectionMapPropsType = {
    selectionMenuItems: SelectionMenuItemsType[]
    value: string
    onChange: (priority: string) => void
    children?: ReactNode
    onBlur?: () => void
}

export const SelectionMap = ({
                                 selectionMenuItems,
                                 value,
                                 onChange,
                                 children,
                                 onBlur
                             }: SelectionMapPropsType) => {

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value)
    }
    return (
        <select autoFocus
                onBlur={onBlur}
                value={value}
                onChange={onChangeHandler}
                style={{ width:'70px'}}
        >
            {children ? <option>{children}</option> : null}
            {selectionMenuItems.map(i => <option key={i.id} value={i.value}>
                {i.title}
            </option>)}
        </select>
    )
}