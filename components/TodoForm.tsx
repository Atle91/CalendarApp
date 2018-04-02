import * as React from "react";

const TodoForm = (props:any) => {
    return (
        <div>
            <input id="todo-input" placeholder="Todo..." />
            <button onClick={() => { props.addTodo() }}>Submit</button>
        </div>
    )
};

export default TodoForm;