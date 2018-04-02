let interval = 15;
export function getStyle(startY: any, event: any, element: any, ) {
    let cursor = (getMousePosY(event, element) || 0) - startY;
    if (cursor > interval) {
        interval += 12.5;
        return styleActivity(startY + "px", cursor + "px", "rgb(173, 124, 82)");
    } else if (cursor < interval - 25) {
        interval -= 12.5;
        return styleActivity(startY + "px", cursor + "px", "rgb(173, 124, 82)");
    }
}
export function styleActivity(top:any, height:any, background:any) {
    background = background || "rgb(173, 124, 82)";
    height = height || "50px";
    top = top;
    return {
        background: background,
        height: height,
        top: top
    };
}
export function getMousePosY(event: any, element: any) {
    if (event) {
        return Math.round((event.pageY - element.offset().top) / 12.5) * 12.5;
    }
    return 0;
}
export function getMousePosX(event: any, element: any) {
    if (event) {
        let positionX = Math.round((event.pageX - element.offset().left) / 15) * 15;
        const activityInfoWidth = 400;
        const parentWidth = element.parent().parent().width();
        const outOfBounds = Boolean(positionX + activityInfoWidth > parentWidth)
        if (outOfBounds) {
            positionX = parentWidth - activityInfoWidth;
        }
        return positionX;
    }
    return 0;
}
export function getStartAndEndTime(start: number, endStr: string) {
    let endArr = endStr.split("");
    endArr.pop();
    endArr.pop();
    let end:number = Number(endArr.join(""));
    end /= 50;
    end = Math.round((end + Number(start))*100)/100;
    let endTime = getClockDigit(end);
    let startTime = getClockDigit(start);

    //console.log("start", startTime, "end:", endTime);
    return startTime + "-" + endTime;
}
function getClockDigit(n:number) {
    let num:string = n + "";
    let nArr: any = num.split("");
    if (nArr.includes(".")) {
        const decimalIndex = nArr.indexOf(".");
        let digitAfterDecimal = nArr[decimalIndex + 1];
        if (digitAfterDecimal != 5) digitAfterDecimal += "" + 5;
        else digitAfterDecimal += "" + 0;
      //  console.log("LAST DIGITS", digitAfterDecimal);
        let clockDigit = digitAfterDecimal * .6;
        console.log("decimalIndex", decimalIndex);
        nArr.splice(decimalIndex, nArr.length - 1, ":" + clockDigit);
        console.log(nArr);

        return nArr.join("");
    }

    return n+":00";
}