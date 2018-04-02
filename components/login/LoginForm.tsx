import * as React from "react";
import { isNameTaken } from "../logic/register";

let timeout:any;
class LoginForm extends React.Component<any, any>{
    
    updateName(input: string) {
        
        if (this.props.loginActive) return;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            let nameTaken: boolean;
            isNameTaken(input)
                .then(taken => nameTaken = taken)
                .then(() => {
                    if (nameTaken) {
                        return this.props.nameTaken();
                    }
                    this.props.nameValid(input);
                })
        }, 200)
    }
    updatePassword(input: string) {
        if (this.props.loginActive) return;
        if (input.length < 9) this.props.passwordTooShort();
        else
            this.props.passwordValid(input);
    }
    updatePasswordRepeat(input: string) {
        if (this.props.loginActive) return;
        if (input === (this.props.form.password.input) )
            this.props.passwordRepeatValid(input);
        else
            this.props.passwordMismatch();
    }
    render() {
        return (
            <form className="login__form">
                <input type="text"     onChange={e => this.updateName(e.target.value)}           className={this.props.inputClass.name} placeholder="Username" />
                <input type="password" onChange={e => this.updatePassword(e.target.value)}       className={this.props.inputClass.password} placeholder="Password" />
                <input type="password" onChange={e => this.updatePasswordRepeat(e.target.value)} className={this.props.inputClass.passwordRepeat} placeholder='Repeat password' />
            </form>
            
        )
    } 
} 


export default LoginForm;