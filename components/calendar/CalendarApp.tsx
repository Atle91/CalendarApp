import * as React from "react";
import { RouteComponentProps } from "react-router";
import { CalendarComp } from "../../store/calendar/Calendar";

export class CalendarApp extends React.Component<any, any>{
    
    render() {
        return (
            <div>
                <CalendarComp />
            </div>
        )
    }
}