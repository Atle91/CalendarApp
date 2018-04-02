import * as React from "react";
import * as $ from "jquery";
const Activity = (props: any) => {
    const date = props.activityInfo.target.date;
    const startTime = props.activityInfo.target.startTime;
    const title = props.activities[date][startTime].title;
    const style = props.activityInfo.style;

    function styleBackground(e: any) {
        const color = $(e.target).css("backgroundColor");
        props.styleActivity.background(date, startTime, color);
    }
    function updateTitle(e: any) {
        const titleInput = $(e.target).val();
        props.styleActivity.title(date, startTime, titleInput)
    }
    function activitySave(e:any) {
        props.styleActivity.save();
    }
    function activityDelete(e: any) {
        props.styleActivity.delete(date, startTime);
    }
    return (
        <div>
                
                <div className="activity-description" style={style}>
                <div className="activity-description-header">
                    <input onChange={(e: any) => updateTitle(e)} value={title} className="activity-description-header-input" placeholder="Add title" />
                </div>
                <div className="activity-description-colors">
                    <div onClick={(e: any) => styleBackground(e)} className="color-red"></div>
                    <div onClick={(e: any) => styleBackground(e)} className="color-orange"></div>
                    <div onClick={(e: any) => styleBackground(e)} className="color-yellow"></div> 
                    <div onClick={(e: any) => styleBackground(e)} className="color-green"></div>
                    <div onClick={(e: any) => styleBackground(e)} className="color-teal"></div>
                    <div onClick={(e: any) => styleBackground(e)} className="color-blue"></div>
                    <div onClick={(e: any) => styleBackground(e)} className="color-purple"></div>
                    <div onClick={(e: any) => styleBackground(e)} className="color-pink"></div>
                </div>
                <div className="activity-description-footer">
                    <div onClick={(e: any) => activitySave(e)} className="activity-description-footer-save">SAVE</div>
                    <div onClick={(e: any) => activityDelete(e)} className="activity-description-footer-delete">DELETE</div>
                </div>
            </div>
            
        </div>
            
        
    )
}
export default Activity;


