import * as React from "react";
import { RouteComponentProps } from "react-router";
import Schedule from "./Schedule";
import Activity from "./Activity";
import { fetchState } from "../../store/calendar/Calendar";
const months = ["Januar", "February", "March", "April", "May", "June", "July", "Septemper", "October", "November", "December"];
export class Calendar extends React.Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state = {
            stateFetched: false,
        }
    }

    componentWillMount() {
        if (!this.state.stateFetched) {
            fetchState(localStorage.getItem("id") || "something went wrong")
                .then(data => {
                    if (data) {
                        this.props.replaceState(JSON.parse(data));
                    }
                    this.setState({
                        stateFetched: true
                    })
                })
        }
    }
    logout() {
        localStorage.clear()
        window.location.pathname = "/";
    }
    render() {
        if (!this.state.stateFetched) return (<div>Fetching state...</div>);
        const d = new Date();
        return (
            <div className="index-content">
                <div onClick={() => this.logout()} className="logout-button">LOGOUT</div><span className="glyphicon glyphicon-log-out icon-logout"></span>
                <div className="index-header">{months[d.getMonth()]}
                    </div>


                    <Schedule
                        calendar={this.props.calendar}
                        createActivity={this.props.createActivity.bind(this)}
                        createDay={this.props.createDay.bind(this)}
                        showActivityInfo={this.props.showActivityInfo.bind(this)}
                        styleActivity={this.props.styleActivity}
                        replaceState={this.props.replaceState}
                        incrementWeek={this.props.incrementWeek}
                        decrementWeek={this.props.decrementWeek}
                        resetWeek={this.props.resetWeek}
                        resetState={this.props.resetState}
                     />
                </div>
        )
    }
}