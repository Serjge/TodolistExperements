import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import styles from './EditableSpan.module.css'

type EditableSpanPropsType = {
    title: string
    onChangeUpdate: (title: string) => void
}

export const EditableSpan = ({title, onChangeUpdate}: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const clickToCompleteEditing = () => {
        setEdit(false)
        onChangeUpdate(newTitle)
    }
    const clickToEdit = () => setEdit(true)
    const onChangeNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    return (
        <span className={styles.span} onDoubleClick={clickToEdit}>
            {edit
                ? <TextField id="outlined-basic"
                             autoFocus
                             onChange={onChangeNewTitle}
                             value={newTitle}
                             onBlur={clickToCompleteEditing}
                             variant="outlined"
                             sx={{width:'164px'}}
                             size={"small"}
                />
                : <p style={{width:'120px', display:'inline-flex', maxHeight:'40px', alignItems:'center', paddingLeft:'14px',textOverflow: 'ellipsis',overflow:'hidden',whiteSpace: 'nowrap',padding: '5px'}}>{title}</p>}</span>
    )
}