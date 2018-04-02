import * as React from "react";

const DayHeader = (props: any) => {
    let fullDate = props.week.split(".");
    const date = {
        day: fullDate[0],
        month: fullDate[1],
        year: fullDate[2]
    }
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];
    return (
        <div className="schedule__header--day">{days[props.index]}
            <div>{date.day}</div>
        </div>
    )

}
export default DayHeader;