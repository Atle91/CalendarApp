import * as React from "react";
import Activity from "./Activity";
import { styleActivity, getMousePosY, getStyle, getMousePosX, getStartAndEndTime } from "../logic/activity";
import * as $ from "jquery";

let elementDayClicked: any;
let targetDay: any;
let startTime: any;
let date: any;

let props: any;
let activityExist: any;
let activityIsFlat = true;
class Day extends React.Component<any, any>{
    
    
    activityMouseDown(event: any) {
        console.log("MOUSE DONW", this.props);
        
        let elementDay = $(event.target);
        let top = getMousePosY(event, elementDay);
        $(window).on("mousemove", { top, elementDay }, this.onMove.bind(this));
        $(window).on("mouseup", this.activityMouseUp.bind(this));
    }

    finishActivity(event: any) {
        console.log("FINSIHED", event)
        this.props.removeEventElements();
        if (activityIsFlat) return;
        const escapedDay = this.escapeDots(this.props.day);
        const dayElement = $("[data=" + escapedDay + "]");
        const top = getMousePosY(event, dayElement);
        const left = getMousePosX(event, dayElement.parent().parent());
        this.props.showActivityInfo(top, left, targetDay, startTime);
        activityIsFlat = true;
    }
    activityMouseUp(e:any) {
        const escapedDay = this.escapeDots(this.props.day);
        const dayElement = $("[data=" + escapedDay + "]");
        console.log("activityMouseUp", e);
        $(window).off("mousemove");
        $(window).off("mouseup");
        this.finishActivity(e);
    }
    escapeDots(str:string) {
        return str.replace(/\./g, "\\.")
    }
    onMove(e: any) {
        const style = getStyle(e.data.top, e, e.data.elementDay);
        if (style) {
            targetDay = e.data.elementDay.attr("data");
            startTime = e.data.top / 50;
            const duration = getStartAndEndTime(startTime, style.height);
            props.createActivity(targetDay, startTime, style, duration);
            activityIsFlat = false;
        }
    }
    getCurrentDay() {
        const d = new Date();
        const day = d.getDate() +"." + (d.getMonth()+1) + "." + d.getFullYear();
        return day;
    }
    render() {
        props = this.props;
        let activities = [];
        const day = new Date();
        const isToday = Boolean(this.props.day === this.getCurrentDay());
        const height = 100 / 24 * (day.getHours() + (day.getMinutes() / 60)) + "%";
        const styleTime = {
            background: "rgba(236, 208, 140, 0.4)",
            position: "absolute" as "absolute",
            width: "100%",
            height,
        }
        let activityExist = false;
        const activitiesToday = this.props.calendar.activities[this.props.day];
        if (activitiesToday) activityExist = Boolean(Object.keys(activitiesToday).length !== 0 && activitiesToday.constructor === Object);
        if (activityExist) {
            let i = 0;
            for (let startTimeKey in activitiesToday) {
                i++;
                activities.push(<Activity
                    onMove={(e:any) => this.onMove(e)}
                    activity={activitiesToday[startTimeKey]}
                    date={this.props.day}
                    startTime={startTimeKey}
                    id={this.props.day + "." + startTimeKey}
                    createActivity={this.props.createActivity}
                    showActivityInfo={this.props.showActivityInfo}
                    styleActivity={this.props.styleActivity}
                    key={i}
                    escapeDots={this.escapeDots}
                    eventElements={this.props.eventElements}
                    addEventElement={this.props.addEventElement}
                    removeEventElements={this.props.removeEventElements}
                />)
            }
        }
        
    return (
        <div className="schedule__body--activity-day-container">
            {isToday && <div style={styleTime}> </div>}
            <div className="schedule__body--activity-day" data={this.props.day}
                onMouseDown={(e: any) => this.activityMouseDown(e)}>{activities}</div>
        </div>
    )
    }
}


export default Day;


