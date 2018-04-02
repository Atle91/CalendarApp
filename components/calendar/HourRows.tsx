import * as React from "react";

const HourRows = (props: any) => {
    const rowItems = [];
    for (let i = 0; i < 25; i++) {
        rowItems.push(<div className='schedule__body--activity-rows-item' key={i}> </div>)
    }
    
    return (
        <div className="schedule__body--activity-rows">
            {rowItems}
        </div>
    )
}
export default HourRows;


