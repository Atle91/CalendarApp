import * as React from "react";
import HourRows from "./HourRows";
import Week from "./Week";
import DayHeader from "./DayHeader";
import ActivityInfo from "./ActivityInfo";
import { logState } from "../../store/calendar/Calendar";

let week: any = [];
let weekIndex = 0;

interface $element {
    element?: JQuery<HTMLElement>,
    top?: number
}
let eventElements:$element = {
};
class Schedule extends React.Component<any, any>{
    componentWillMount() {
        this.createWeek(0);
    }
    createWeek(weekIncrement: number) {
        week = [];
        weekIndex += weekIncrement;
        for (let i = 0; i < 7; i++) {
            let dayOfWeek = i + (weekIndex * 7);
            const d = new Date();
            const today = d.getDay() - 1;
            d.setDate(d.getDate() - today + dayOfWeek);
            const fullDate =
                d.getDate() + "." +
                (d.getMonth() + 1) + "." +
                d.getFullYear();

            week.push(fullDate);
            const dayInStore = this.props.calendar.activities[fullDate];
            if (!dayInStore) this.props.createDay(fullDate);
        }
        this.forceUpdate();
    }
    renderHeaderDays() {
        let headerDays = [];
        for (let i = 0; i < 7; i++) {
            headerDays.push(<DayHeader key={i} index={i} week={week[i]} />);
        }
        return headerDays;
    }
    addEventElement(eleObj: any) {
        console.log("ELEOBJ",eleObj)
        eventElements = eleObj;
    }
    removeEventElements(element: any) {
        if (eventElements.element) eventElements.element.off("mousemove");
        eventElements = {};
    }
    render() {
        return (
            <div className="schedule">
                <button className="arrow-week left" onClick={() => this.createWeek(-1)}>&lsaquo;</button>
                <button className="arrow-week right" onClick={() => this.createWeek(1)}>&rsaquo;</button>
                <div className="schedule__header">
                    <div className="schedule__header-indent"></div>
                    <div className="schedule__header--days">
                        {this.renderHeaderDays()}
                    </div>
                    
                    
                </div>
                <div className="schedule__body">
                    <div className="schedule__body--time">
                        <div className="schedule__body--hour-scroll">
                            <div className="schedule__body--hour">
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">01:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">02:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">03:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">04:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">05:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">06:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">07:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">08:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">09:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">10:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">11:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">12:00AM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">01:00PM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">02:00PM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">03:00PM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">04:00PM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">05:00PM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">06:00PM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">07:00PM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">08:00PM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">09:00PM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">10:00PM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">11:00PM</span>
                                </div>
                                <div className="schedule__body--hour-item">
                                    <span className="schedule__body--hour-text">12:00PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="schedule__body--activity-scroll">
                        <HourRows />
                        <Week calendar={this.props.calendar}
                            week={week}
                            createActivity={this.props.createActivity}
                            styleActivity={this.props.styleActivity}
                            createDay={(date: string, style: any) => this.props.createDay(date, style, top)}
                            showActivityInfo={this.props.showActivityInfo.bind(this)}
                            eventElements={eventElements}
                            addEventElement={this.addEventElement}
                            removeEventElements={this.removeEventElements}
                        />

                        {this.props.calendar.activityInfo.display && <ActivityInfo
                            activities={this.props.calendar.activities}
                            activityInfo={this.props.calendar.activityInfo}
                            styleActivity={this.props.styleActivity}
                        />}
                    </div>
                </div>
            </div>
        )
    }
} 


export default Schedule;