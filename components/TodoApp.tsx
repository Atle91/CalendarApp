import * as React from "react";
import { RouteComponentProps } from "react-router";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

interface TodoState {
    data: any;
}
let id: number = 0;
export class TodoApp extends React.Component<RouteComponentProps<{}>, any>{
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    addTodo() {
        const val = (document.getElementById("todo-input") as HTMLInputElement).value;
        const todo = {text: val, id: id++};
        
        this.setState({
            data: this.state.data.concat(todo)
        });

    }
    removeTodo(id: number) {
        console.log(id);
        const copyData = this.state.data;
        copyData.map((todo: any, i: number) => {
            if (todo.id === id) copyData.splice(i, 1);
        });
        this.setState({
            data: copyData 
        });
    }
    public render() {
        console.log(this.state.data);
        return (
            <div>
                <TodoForm addTodo={this.addTodo.bind(this)} />
                <TodoList
                    todos={this.state.data}
                    removeTodo={this.removeTodo.bind(this)} />
            </div>
        );
    }
    
}