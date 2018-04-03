import * as React from "react";
import { getMousePosY, getMousePosX, getStyle, getStartAndEndTime } from "../logic/activity";
import * as $ from "jquery";
let shouldInfoOpen = false;

class Activity extends React.Component<any, any>{
    
    openInfo(e: any, activityElement:any) {
        e.stopPropagation();
        console.log("OPENING INFO");
        const elementDay = $(e.target).parent().parent();
        const elementActivity = $(e.target).parent();
        const top = getMousePosY(e, activityElement.parent());
        const left = getMousePosX(e, activityElement.parent().parent().parent());
        this.props.showActivityInfo(top, left, this.props.date, this.props.startTime);
    }

    
    
    enableMove(e: any) {
        e.stopPropagation();
        this.delayOpenInfo(200);
        const startMousePosY = e.clientY;
        const escapedId = this.props.escapeDots(this.props.id);
        const activityElement = $("#" + escapedId);
        const boxTop = this.pxToNum(activityElement.css("top"));
        $(window).on("mousemove", { startMousePosY, boxTop, activityElement }, this.moveActivity.bind(this));
        $(window).on("mouseup", this.stopActivity.bind(this));
    }
    moveActivity(e: any) {
        shouldInfoOpen = false;
        const date = this.props.date;
        const MouseDistanceTraveled = this.mousePosY(e, e.data.startMousePosY);
        const boxTopNew = e.data.boxTop + MouseDistanceTraveled;
        const boxTopRounded = this.roundToQuarter(boxTopNew);
        const startTime = this.roundToQuarter(boxTopRounded) / 50;
        
        if (boxTopRounded !== this.pxToNum(e.data.activityElement.css("top"))) {
            this.props.styleActivity.top(date, this.props.startTime, boxTopRounded)
        }
    }
    stopActivity(e: any) {
        const activityElement = this.getActivity();
        $(window).off("mousemove");
        $(window).off("mouseup");
        if (shouldInfoOpen) {
            this.openInfo(e, activityElement);
            return;
        }
        const startTime = this.pxToNum(this.props.activity.style.top) / 50;
        const targetDay = $(e.target).attr("data") ? $(e.target).attr("data") : this.props.date;

        const duration = getStartAndEndTime(startTime, this.props.activity.style.height);
        if (startTime !== Number(this.props.startTime)) {
            this.props.styleActivity.delete(this.props.date, this.props.startTime);
            this.props.styleActivity.copyActivity(targetDay, startTime, this.props.activity, duration);
        }
    }

    enableScale(e: any) {
        e.stopPropagation();
        shouldInfoOpen = true;
        setTimeout(() => { shouldInfoOpen = false }, 200)
        const escapedId = this.props.escapeDots(this.props.id);
        const activityElement = $("#" + escapedId);
        const elementDay = activityElement.parent();
        const oldHeight = this.pxToNum(this.props.activity.style.height);
        const startPosY = e.clientY;
        
        $(window).on("mousemove", { startPosY, elementDay, oldHeight }, this.scaleActivity.bind(this));
        $(window).on("mouseup", this.scaleFinish.bind(this));
    }
    scaleActivity(e: any) {
        const currentHeight = this.pxToNum(this.props.activity.style.height)
        const startTime = this.props.startTime;
        const distanceY = this.mousePosY(e, e.data.startPosY);
        const distanceYRounded = this.roundToQuarter(distanceY);
        
        
        const height = e.data.oldHeight + distanceYRounded;
        
        if (height !== currentHeight) {
            this.props.styleActivity.height(this.props.date, startTime, height);
        }
        
    }
    scaleFinish(e: any) {
        e.stopPropagation();
        $(window).off("mousemove");
        $(window).off("mouseup");
        const activityElement = this.getActivity();
        const duration = getStartAndEndTime(this.props.startTime, this.props.activity.style.height);
        console.log(this.props.startTime, this.props.activity.style.height,duration);
        this.props.styleActivity.duration(this.props.date, this.props.startTime, duration);
    }
    roundToQuarter(num: number) {
        return Math.round(num / 12.5) * 12.5;
    }
    mousePosY(e: any, startPosY: number) {
        const currentMousePosY = e.clientY;
        return currentMousePosY - startPosY;
    }
    getTop(e: any, elementParent: any, activityTop: any) {
        const cursor = getMousePosY(e, elementParent);
        const top = cursor - activityTop;
        return top;
    }
    getActivity() {
        const escapedId = this.props.escapeDots(this.props.id);
        return $("#" + escapedId);
    }
    delayOpenInfo(delay: number) {
        shouldInfoOpen = true;
        setTimeout(() => shouldInfoOpen = false, delay);
    }
    pxToNum(value: string) {
        const valueArr = value.split("");
        valueArr.pop();
        valueArr.pop();
        const valueNum = valueArr.join("");
        return Number(valueNum);
    }
    render() {
        const title = this.props.activity.title || "Undefined";
        console.log("RENDERING", this.props.activity.duration);
    return (
        <div 
            onMouseDown={(e: any) => this.enableMove(e)} className="activity" id={this.props.id} style={this.props.activity.style}>
            <div className="activity-title">{title}</div>
            <div className="activity-duration">{this.props.activity.duration}</div>
            <div onMouseDown={(e: any) => this.enableScale(e)}
                 className="activity-footer"><hr /></div>
        </div>
        )
    }
}
export default Activity;


