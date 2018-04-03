import * as React from "react";


const Todo = (props: any) => {
    return (<li onClick={() => props.remove(props.todo.id)}>{props.todo.text}</li>)
}

const TodoList = (props:any) => {
    console.log(props);
    const todoNode = props.todos.map((todo: any) => {
        return (<Todo todo={todo} key={todo.id} remove={props.removeTodo}/>)
    });
    return (<ul>{todoNode}</ul>)
}

export default TodoList;