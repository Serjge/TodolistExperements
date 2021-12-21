import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {Input} from "./Input";
import Grid from '@mui/material/Grid';
import ButtonAppBar from './ButtonAppBar';
import {Container, Paper} from "@mui/material";
import {grey} from "@mui/material/colors";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
    priority: string
}
export type TodoListType = {
    id: string
    title: string
    filter: ActionTasks
    priority: string
}
export type TasksStateType = ({
    [key: string]: TasksType[]
})
export type ActionTasks = 'all' | 'completed' | 'action'
export type PriorityTask = 'Low' | 'Medium' | 'High'

export type SelectionMenuItemsType = {
    id: number,
    title: PriorityTask,
    value: string
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const todoListState: TodoListType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all', priority: '0'},
        {id: todolistID2, title: 'What to buy', filter: 'all', priority: '0'},
    ]

    const tasksState: TasksStateType = {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true, priority: '1'},
            {id: v1(), title: "JS", isDone: true, priority: '1'},
            {id: v1(), title: "ReactJS", isDone: false, priority: '2'},
            {id: v1(), title: "Rest API", isDone: false, priority: '3'},
            {id: v1(), title: "GraphQL", isDone: false, priority: '1'},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true, priority: '1'},
            {id: v1(), title: "JS2", isDone: true, priority: '1'},
            {id: v1(), title: "ReactJS2", isDone: false, priority: '3'},
            {id: v1(), title: "Rest API2", isDone: false, priority: '2'},
            {id: v1(), title: "GraphQL2", isDone: false, priority: '1'},
        ]
    }
    const selectionMenuItems: SelectionMenuItemsType[] = [
        {id: 1, title: 'Low', value: '1'},
        {id: 2, title: 'Medium', value: '2'},
        {id: 3, title: 'High', value: '3'},
    ]

    const [todoLists, setTodoLists] = useState<TodoListType[]>(todoListState)
    const [tasks, setTasks] = useState<TasksStateType>(tasksState)

    const changeExecutionTasks = (todolistID: string, filter: ActionTasks) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }

    const changePriorityTasks = (todolistID: string, priority: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, priority} : tl))
    }

    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)})
    }

    const addTask = (todolistID: string, title: string, priority: string) => {
        setTasks({
            ...tasks,
            [todolistID]: [...tasks[todolistID], {id: v1(), title: title, isDone: false, priority: priority}]
        })
    }

    const changeExecutionStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const changePriorityStatus = (todolistID: string, taskId: string, priority: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, priority} : t)})
    }

    const removeTodoList = (todolistID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    const updateTask = (todolistID: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title} : t)})
    }
    const updateTodolist = (todolistID: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, title} : tl))
    }

    const addTodolist = (title: string) => {
        const newTodoList: TodoListType = {id: v1(), title: title, filter: 'all', priority: '0'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <Input addTaskHandler={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        return <Grid item>
                            <Paper style={{padding: "10px", background: grey[600]}}>
                                <Todolist todolistID={tl.id}
                                          key={tl.id}
                                          addTask={addTask}
                                          changeFilter={changeExecutionTasks}
                                          removeTask={removeTask}
                                          titleTask={tl.title}
                                          state={tasks[tl.id]}
                                          filter={tl.filter}
                                          priorityFilter={changePriorityTasks}
                                          priority={tl.priority}
                                          changeIsDoneStatus={changeExecutionStatus}
                                          changeSelectedStatus={changePriorityStatus}
                                          selectionMenuItems={selectionMenuItems}
                                          updateTask={updateTask}
                                          removeTodoList={removeTodoList}
                                          updateTodolist={updateTodolist}
                                /> </Paper>
                        </Grid>
                    })}
                </Grid>

            </Container>
        </div>
    );
}

export default App;

