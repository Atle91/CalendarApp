import * as React from "react";
import Day from "./Day";

const Week = (props: any) => {
    let activityDays:any = [];
    
        for (let i = 0; i < 7; i++) {
            

            activityDays.push(<Day
                eventElements={props.eventElements}
                key={i}
                day={props.week[i]}
                calendar={props.calendar}
                styleActivity={props.styleActivity}
                createActivity={props.createActivity}
                createDay={(date: string, style: any) => props.createDay(date, style)}
                showActivityInfo={props.showActivityInfo}
                addEventElement={props.addEventElement}
                removeEventElements={props.removeEventElements}
            />);
        }
    return (
        <div className="schedule__body--activity-days">
            {activityDays}
        </div>
    )
}
export default Week;