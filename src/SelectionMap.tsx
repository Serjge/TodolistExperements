import {SelectionMenuItemsType} from "./App";
import React, {ReactNode} from "react";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";

export type SelectionMapPropsType = {
    selectionMenuItems: SelectionMenuItemsType[]
    value: string
    onChange: (priority: string) => void
    children?: ReactNode
    onBlur?: () => void
    autoFocus?: boolean
}

export const SelectionMap = ({
                                 selectionMenuItems,
                                 value,
                                 onChange,
                                 children,
                                 onBlur,
                                 autoFocus
                             }: SelectionMapPropsType) => {

    const onChangeHandler = (e: SelectChangeEvent) => {
        onChange(e.target.value)
    }
    return (

        <Select
            defaultValue={'0'}
            value={value}
            onBlur={onBlur}
            onChange={onChangeHandler}
            displayEmpty
            autoFocus={autoFocus}
            sx={{paddingTop:'0px'}}
            style={styleTitle(value)}
        >
            {children ? <MenuItem sx={styleTitle(value)}
                                  value={'0'}>{children}</MenuItem> : null}
            {selectionMenuItems.map(i => <MenuItem key={i.id}
                                                   value={i.value}
                                                   sx={styleTitle(i.value)}
            >
                {i.title}
            </MenuItem>)}
        </Select>

    )
}

const styleTitle = (value: string) => {
    const style = {
        minWidth: ' 120px',
        height: '30px',
        fontWeight:'700'
    }
    switch (value) {
        case '1':
            return {...style, color: 'darkgreen'}
        case '2':
            return {...style, color: 'gold'}
        case '3':
            return {...style, color: 'darkred'}
        default:
            return style
    }

}