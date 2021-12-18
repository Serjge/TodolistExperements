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
                ? <input className={styles.input} autoFocus onChange={onChangeNewTitle}
                         value={newTitle}
                         onBlur={clickToCompleteEditing}
                         type="text"/>
                : <span style={{width:'150px', display:'inline-block'}}>{title}</span>}</span>
    )
}