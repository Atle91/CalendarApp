import * as React from "react";
import { RouteComponentProps } from "react-router";
import { AccessFormComp } from "../../store/login/StoreLogin";
export class Login extends React.Component<RouteComponentProps<{}>, any>{

    
    render() {
        return (
            <div className="access__menu">
                <AccessFormComp />
            </div>
        )
    }
}