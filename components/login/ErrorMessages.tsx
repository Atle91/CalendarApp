import * as React from "react";
const ErrorMessages = (props: any) => {

    function showElement(error:string) {
        return { opacity: error ? 1 : 0 };
    }
    return (
        <div className="invalid-container">

            <div className="invalid-label error-name" style={ showElement(props.name.errorMessage) } >
                    <div className="invalid">{props.name.errorMessage}</div>
                    <div className="triangle"></div>
            </div>
            
                <div className="invalid-label error-password" style={showElement(props.password.errorMessage)}>
                <div className="invalid ">{props.password.errorMessage}</div>
                    <div className="triangle"></div>
                </div>

                <div className="invalid-label error-password-repeat" style={showElement(props.passwordRepeat.errorMessage)}>
                <div className="invalid ">{props.passwordRepeat.errorMessage}</div>
                    <div className="triangle"></div>
                </div>
        </div>
)
}
export default ErrorMessages;


