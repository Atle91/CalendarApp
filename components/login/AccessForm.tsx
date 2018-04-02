import * as React from "react";
import "isomorphic-fetch";
import LoginForm from "./LoginForm";
import ErrorMessages from "./ErrorMessages";
import { connect } from "react-redux";
import * as $ from "jquery";
import { login, requireAuth, authenticate } from "../logic/authenticate";
let timeout: any;

class AccessForm extends React.Component<any, any>{
    addDate(date:Date, days:number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    register() {
        let user = {
            name: this.props.form.name.input,
            password: this.props.form.password.input
        }
        if (this.props.registerActive) {
            if (this.inputIsValid()) { 
                fetch("/Home/Register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                }).then(res => {
                    return res.json()
                }).then(data => {
                    console.log("data", data)
                    if (data === "value")
                        return true;
                    else
                        return false;
                })
                this.props.login();
            }
        }
        else
            this.props.register();
        
    }
    inputIsValid() {
        if (this.props.form.name.valid &&
            this.props.form.password.valid &&
            this.props.form.passwordRepeat.valid)
            return true;
        else 
            return false;
        
    }
    updatePassword(e: any) {
        const password = e.target.value
        this.setState({
            password: {
                input: password
            }
        });
    }
    updatePasswordRepeat(e: any) {
        const passwordRepeat = e.target.value
        this.setState({
            passwordRepeat: {
                input: passwordRepeat
            }
        })
    }
    fetchId(name:string) {
        return fetch("Home/GetItem", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(name)
        }).then(res => { return res.json() })
            .then(data => {return data})
    }

    loginAttempt() {
        if (this.props.loginActive) {
            const user = {
                name: $("."+this.props.inputClass.name).val(),
                password: $("."+this.props.inputClass.password).val()
            }
            login(user).then((success) => {
                if (success) {
                    const expire = this.addDate(new Date(), 5) + "";
                    localStorage.setItem("expiration", JSON.stringify(expire));
                    this.fetchId(user.name + "")
                        .then(data => {
                            localStorage.setItem("id", data);
                        })
                        .then(() => window.location.pathname = "/calendar");
                }
            });
        } else {
            this.props.login();
        }
    }
    onEnterKey() {
        if (this.props.loginActive) this.loginAttempt();
        else this.register();
    }
    render() {
        $(window).keypress((e:any) => {
            if (e.which === 13) this.onEnterKey();
        });


            return (
            <div className="form">
                    <div className="register">
                        <h2 className="register__header">REGISTER</h2>
                    <button className={this.props.buttonClass.register} onClick={() => this.register()}>Create Account</button>
                </div>
                <div className="login">
                        <h2 className="login__header">LOG IN</h2>
                        
                    <LoginForm 
                            wait={270}
                            inputClass={this.props.inputClass}
                            form={this.props.form}
                            loginActive={this.props.loginActive}
                            nameTaken={this.props.nameTaken.bind(this)}
                            nameValid={this.props.nameValid.bind(this)}
                            passwordValid={this.props.passwordValid.bind(this)}
                            passwordMismatch={this.props.passwordMismatch.bind(this)}
                            passwordTooShort={this.props.passwordTooShort.bind(this)}
                            passwordRepeatValid={this.props.passwordRepeatValid.bind(this)}
                        />

                    <button type="button" id="login-button" className={this.props.buttonClass.login} onClick={() => this.loginAttempt()}>LOGIN</button>

                    <ErrorMessages
                            name={this.props.form.name}
                            password={this.props.form.password}
                            passwordRepeat={this.props.form.passwordRepeat}
                        />

                    
                </div>
            </div>
                )
    }
}

export default AccessForm;