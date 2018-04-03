import { Action, Reducer } from "redux";
import AccessForm from "../../components/login/AccessForm";
import { connect } from "react-redux";

let stateForm = {
        loginActive: true,
        registerActive: false,
        navButtonActive: {
            calendar: false,
            login: false,
        },
        buttonClass: {
            login: "login__button login__button-active",
            register: "register__button",
        },
        inputClass: {
            name: "login__name",
            password: "login__password",
            passwordRepeat: "login__password-repeat",
        },
        inputForm: {
            name: {
                input: "",
                valid: false,
                errorClass: "invalid-label",
                errorMessage: "" 
            },
            password: {
                input: "",
                valid: false,
                errorClass: "invalid-label",
                errorMessage: "" 
            },
            passwordRepeat: {
                valid: false,
                errorClass: "invalid-label",
                errorMessage: "" 
            },
        }
}

//dispatch
const register = () => {
    return {
        type: "ENABLE_REGISTER"
    }
};
const login = () => {
    return {
        type: "ENABLE_LOGIN"
    }
}
export const calendarButton = () => {
    return {
        type: "FLIP_CALENDAR_BUTTON"
    }
} 
export const loginButton = () => {
    return {
        type: "FLIP_LOGIN_BUTTON"
    }
} 
const nameTaken = () => {
    return {
        type: "NAME_TAKEN"
    }
}
const nameValid = (input:string) => {
    return {
        type: "NAME_VALID",
        input,
    }
}
const passwordValid = (input: string) => {
    return {
        type: "PASSWORD_VALID",
        input,
    }
}
const passwordMismatch = (input: string) => {
    return {
        type: "PASSWORD_MISMATCH",
        input,
    }
}
const passwordTooShort = () => {
    return {
        type: "PASSWORD_TOO_SHORT"
    }
}
const passwordRepeatValid = () => {
    return {
        type: "PASSWORD_REPEAT_VALID"
    }
}

export const reducerForm: any = (state = stateForm, action: any) => {
    switch (action.type) {
        case "ENABLE_REGISTER":
            return {
                ...state,
                loginActive: false,
                registerActive: true,
                buttonClass: {
                    login: "login__button",
                    register: "register__button register__button-active" 
                },
                inputClass: {
                    name: "login__name register__input",
                    password: "login__password register__input password-up",
                    passwordRepeat: "login__password-repeat password-repeat-up",
                },
                inputForm: {
                    name: {
                        input: "",
                        valid: false,
                        errorClass: "invalid-label",
                        errorMessage: ""
                    },
                    password: {
                        input: "",
                        valid: false,
                        errorClass: "invalid-label",
                        errorMessage: ""
                    },
                    passwordRepeat: {
                        valid: false,
                        errorClass: "invalid-label",
                        errorMessage: ""
                    },
                }
            };
        case "ENABLE_LOGIN":
            return {
                ...state,
                loginActive: true,
                registerActive: false,
                buttonClass: {
                    login: "login__button login__button-active",
                    register: "register__button"
                },
                inputClass: {
                    name: "login__name",
                    password: "login__password",
                    passwordRepeat: "login__password-repeat",
                },
                inputForm: {
                    name: {
                        input: "",
                        valid: false,
                        errorClass: "invalid-label",
                        errorMessage: ""
                    },
                    password: {
                        input: "",
                        valid: false,
                        errorClass: "invalid-label",
                        errorMessage: ""
                    },
                    passwordRepeat: {
                        valid: false,
                        errorClass: "invalid-label",
                        errorMessage: ""
                    },
                }
            };
        case "NAME_TAKEN":
            return {
                ...state,
                inputClass: {
                    ...state.inputClass,
                    name: "login__name register__input input--invalid"
                },
                inputForm: {
                    ...state.inputForm,
                    name: {
                        ...state.inputForm.name,
                        class: action.class,
                        valid: false,
                        errorMessage: "Name taken"
                    }
                }
            };
        case "NAME_VALID":
            return {
                ...state,
                inputClass: {
                    ...state.inputClass,
                    name: "login__name register__input input--valid"
                },
                inputForm: {
                    ...state.inputForm,
                    name: {
                        ...state.inputForm.name,
                        input: action.input,
                        valid: true,
                        errorMessage: ""
                    }
                }
            }
        case "PASSWORD_VALID":
            return {
                ...state,
                inputClass: {
                    ...state.inputClass,
                    password: "login__password register__input password-up input--valid ",
                },
                inputForm: {
                    ...state.inputForm,
                    password: {
                        ...state.inputForm.password,
                        input: action.input,
                        errorMessage: "",
                        valid:true
                    }
                }
            };
        case "PASSWORD_REPEAT_VALID":
            return {
                ...state,
                inputClass: {
                    ...state.inputClass,
                    passwordRepeat: "login__password-repeat password-repeat-up input--valid ",
                },
                inputForm: {
                    ...state.inputForm,
                    passwordRepeat: {
                        ...state.inputForm.password,
                        input: action.input,
                        errorMessage: "",
                        valid: true
                    }
                }
            };
        case "PASSWORD_MISMATCH":
            return {
                ...state,
                inputClass: {
                    ...state.inputClass,
                    passwordRepeat: "login__password-repeat password-repeat-up input--invalid"
                },
                inputForm: {
                    ...state.inputForm,
                    passwordRepeat: {
                        ...state.inputForm.password,
                        input: action.input,
                        valid: false,
                        errorMessage: "Passwords doesn't match"
                    }
                }
            }
        case "PASSWORD_TOO_SHORT":
            return {
                ...state,
                inputClass: {
                    ...state.inputClass,
                    password: "login__password register__input password-up input--invalid",
                },
                inputForm: {
                    ...state.inputForm,
                    password: {
                        ...state.inputForm.password,
                        errorMessage: "Must have 9+ characters",
                        valid:false
                    }
                }
            }
        case "FLIP_CALENDAR_BUTTON":
            return {
                ...state,
                navButtonActive: {
                    calendar: true,
                    login: false,
                },
            }
        case "FLIP_LOGIN_BUTTON":
            return {
                ...state,
                navButtonActive: {
                    calendar: false,
                    login: true,
                },
            }
        default: return state;
    }
}

const mapStateToProps = (state: any) => ({
    buttonClass: state.form.buttonClass,
    inputClass: state.form.inputClass,
    registerActive: state.form.registerActive,
    form: state.form.inputForm,
    loginActive: state.form.loginActive,
})
const mapDispatchToProps = (dispatch: any) => ({
    register: () => dispatch(register()),
    login: () => dispatch(login()),
    nameTaken: () => dispatch(nameTaken()),
    nameValid: (input: string) => dispatch(nameValid(input)),
    passwordValid: (input: string) => dispatch(passwordValid(input)),
    passwordMismatch: (input: string) => dispatch(passwordMismatch(input)),
    passwordTooShort: () => dispatch(passwordTooShort()),
    passwordRepeatValid: () => dispatch(passwordRepeatValid()),
})



export const AccessFormComp = connect(mapStateToProps, mapDispatchToProps)(AccessForm);