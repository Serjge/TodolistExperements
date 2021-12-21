import {SelectionMap} from "./SelectionMap";
import React, {useState} from "react";
import {SelectionMenuItemsType} from "./App";

type EditableSelectPropsType = {
    selectionMenuItems: SelectionMenuItemsType[]
    value: string
    onChange: (priority: string) => void
}
export const EditableSelect = ({selectionMenuItems, value, onChange}: EditableSelectPropsType) => {

    const [edit, setEdit] = useState(false)

    const clickToEdit = () => setEdit(true)
    const clickToCompleteEditing = () => {
        setEdit(false)
    }

    return (
        <span style={{display:'inline-flex', width: '150px', height: '40px',alignItems:'center',paddingLeft:'14px'}} onDoubleClick={clickToEdit}>
            {edit
                ? <SelectionMap selectionMenuItems={selectionMenuItems}
                                value={value}
                                onChange={onChange}
                                onBlur={clickToCompleteEditing}
                autoFocus/>
                : selectionMenuItems.map(i => i.value === value
                    ? <div style={styleTitle(i.value)}>{i.title}</div>
                    : null)}
        </span>
    )
}

const styleTitle = (value: string) => {
    const style = {
        display:'inline-flex', width: '120px', height: '40px',alignItems:'center',paddingLeft:'14px',fontWeight:'700'
    }
    switch (value) {
        case '1':
            return {...style, color: 'darkgreen'}
        case '2':
            return {...style, color: 'gold'}
        case '3':
            return {...style, color: 'darkred'}
    }

}