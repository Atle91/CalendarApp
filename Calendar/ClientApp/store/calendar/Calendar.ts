import { Action, Reducer, bindActionCreators, createStore } from "redux";
import { connect } from "react-redux";
import { Calendar } from "../../components/calendar/calendar";

let stateCalendar = {
    activities: {

    },
    week: 0,
    activityInfo: {
        display: false,
        style: {
            top: 0+"px",
            left: 0+"px"
        }
    }
}
const replaceState = (newState: any) => {
    return {
        type: "REPLACE_STATE",
        newState,
    }
}
const createDay = (day: string) => {
    return {
        type: "CREATE_DAY",
        day,
    }
}
const createActivity = (date: string, startTime: string, style: any, duration:string) => {
    console.log("CREATING ACTIVITY::::");
    return {
        type: "CREATE_ACTIVITY",
        date,
        startTime,
        style,
        duration,
    }
}
const showActivityInfo = (top: number, left:number, date:string, startTime:string) => {
    return {
        type: "SHOW_ACTIVITY_INFO",
        top,
        left,
        date,
        startTime,
    }
}
const saveActivity = () => {
    return {
        type: "SAVE_ACTIVITY"
    }
}
const deleteActivity = (date:string, startTime:string) => {
    return {
        type: "DELETE_ACTIVITY",
        date,
        startTime
    }
}
const styleActivityBackground = (date:string, startTime:string, background:string) => {
    return {
        type: "STYLE_ACTIVITY_BACKGROUND",
        date,
        startTime,
        background,
    }
}
const styleActivityTitle = (date: string, startTime: string, title: string) => {
    return {
        type: "STYLE_ACTIVITY_TITLE",
        date,
        startTime,
        title,
    }
}
const styleActivityTop = (date: string, startTime: string, top: string) => {
    return {
        type: "STYLE_ACTIVITY_TOP",
        date,
        startTime,
        top,
    }
}
const styleActivityHeight = (date: string, startTime: string, height: string) => {
    return {
        type: "STYLE_ACTIVITY_HEIGHT",
        date,
        startTime,
        height,
    }
}
const copyActivity = (date: string, newTime: string, activity: any, duration:string) => {
    return {
        type: "COPY_ACTIVITY",
        date,
        newTime,
        activity,
        duration,
    }
}
const styleActivityDuration = (date: string, startTime: string, duration: string) => {
    return {
        type: "STYLE_ACTIVITY_DURATION",
        date,
        startTime,
        duration,
    }
}
const incrementWeek = () => {
    return {
        type: "INCREMENT_WEEK"
    }
}
const decrementWeek = () => {
    return {
        type: "DECREMENT_WEEK"
    }
}
const resetWeek = () => {
    return {
        type: "RESET_WEEK"
    }
}
const resetState = () => {
    return {
        type: "RESET_STATE"
    }
}
export const reducerCalendar: any = (state: any = stateCalendar, action: any) => {
    switch (action.type) {
        case "RESET_STATE":
            return {
                ...state,
                activities: {

                }
            }
        case "RESET_WEEK":
            return {
                ...state,
                week: 0
            }
        case "INCREMENT_WEEK":
            return {
                ...state,
                week: state.week + 1
            };
        case "DECREMENT_WEEK":
            return {
                ...state,
                week: state.week - 1
            };
        case "REPLACE_STATE":
            return {
                ...action.newState
            };
        case "CREATE_DAY":
            return {
                ...state,
                activities: {
                    ...state.activities,
                    [action.day]: {},
                }
            }
        case "CREATE_ACTIVITY":
            return {
                ...state,
                activities: {
                    ...state.activities,
                    [action.date]: {
                        ...state.activities[action.date],
                        [action.startTime]: {
                            style: action.style,
                            duration: action.duration
                        },
                        
                    }
                }
            }
        case "COPY_ACTIVITY":
            return {
                ...state,
                activities: {
                    ...state.activities,
                    [action.date]: {
                        ...state.activities[action.date],
                        [action.newTime]: {
                            ...action.activity,
                            duration: action.duration
                        }
                    }
                }
            }
        case "SHOW_ACTIVITY_INFO":
            return {
                ...state,
                activityInfo: {
                    ...state.activityInfo,
                    display: true,
                    target: {
                        date: action.date,
                        startTime: action.startTime
                    },
                    style: {
                        top: action.top + "px",
                        left: action.left + "px"
                    }

                }
            }
        case "STYLE_ACTIVITY_BACKGROUND":
            return {
                ...state,
                activities: {
                    ...state.activities,
                    [action.date]: {
                        ...state.activities[action.date],
                        [action.startTime]: {
                            ...state.activities[action.date][action.startTime],
                            style: {
                                ...state.activities[action.date][action.startTime].style,
                                background: action.background
                            }
                        }
                    }
                }
            }
        case "STYLE_ACTIVITY_TITLE":
            return {
                ...state,
                activities: {
                    ...state.activities,
                    [action.date]: {
                        ...state.activities[action.date],
                        [action.startTime]: {
                            ...state.activities[action.date][action.startTime],
                            title: action.title
                        }
                    }
                }
            }
        case "STYLE_ACTIVITY_TOP":
            return {
                ...state,
                activities: {
                    ...state.activities,
                    [action.date]: {
                        ...state.activities[action.date],
                        [action.startTime]: {
                            ...state.activities[action.date][action.startTime],
                            style: {
                                ...state.activities[action.date][action.startTime].style,
                                top: action.top+"px"
                            }
                        }
                    }
                }
            }
        case "STYLE_ACTIVITY_HEIGHT":
            return {
                ...state,
                activities: {
                    ...state.activities,
                    [action.date]: {
                        ...state.activities[action.date],
                        [action.startTime]: {
                            ...state.activities[action.date][action.startTime],
                            style: {
                                ...state.activities[action.date][action.startTime].style,
                                height: action.height + "px"
                            }
                        }
                    }
                }
            }
        case "STYLE_ACTIVITY_DURATION":
            return {
                ...state,
                activities: {
                    ...state.activities,
                    [action.date]: {
                        ...state.activities[action.date],
                        [action.startTime]: {
                            ...state.activities[action.date][action.startTime],
                            duration: action.duration
                        },

                    }
                }
            }
        case "SAVE_ACTIVITY":
            return {
                ...state,
                activityInfo: {
                    ...state.activityInfo,
                    display: false,
                }
            }
        case "DELETE_ACTIVITY":
            return {
                ...state,
                activities: {
                    ...state.activities,
                    [action.date]: Object.keys(state.activities[action.date]).reduce((result:any, key:any) => {
                        if (key !== action.startTime) {
                            result[key] = state.activities[action.date][key]
                        }
                        return result;
                    }, {})
                },
                activityInfo: {
                    ...state.activityInfo,
                    display: false,
                }
            }
        default: return state;
    }
    
}
const actionCreator = {
    background: (date: string, startTime: string, background: string) => styleActivityBackground(date, startTime, background),
    title: (date: string, startTime: string, title: string) => styleActivityTitle(date, startTime, title),
    save: () => saveActivity(),
    delete: (date: string, startTime: string) => deleteActivity(date, startTime),
    top: (date: string, startTime: string, top: string) => styleActivityTop(date, startTime, top),
    duration: (date: string, startTime: string, duration: string) => styleActivityDuration(date, startTime, duration),
    height: (date: string, startTime: string, height: string) => styleActivityHeight(date, startTime, height),
    copyActivity: (date: string, startTime: string, activity: any, duration: string) => copyActivity(date, startTime, activity, duration),
}

const mapStateToProps = (state: any) => ({
    calendar: state.calendar,
})
const mapDispatchToProps = (dispatch: any) => ({
    createDay: (day:string) => dispatch(createDay(day)),
    createActivity: (date: string, startTime: string, style: any, duration:string) => dispatch(createActivity(date, startTime, style, duration)),
    showActivityInfo: (top: number, left: number, date:string, startTime:string) => dispatch(showActivityInfo(top, left,date,startTime)),
    styleActivity: bindActionCreators(actionCreator, dispatch),
    incrementWeek: () => dispatch(incrementWeek()),
    decrementWeek: () => dispatch(decrementWeek()),
    resetWeek: () => dispatch(resetWeek()),
    resetState: () => dispatch(resetState()),
    replaceState: (state: any) => dispatch(replaceState(state))
})

export const CalendarComp = connect(mapStateToProps, mapDispatchToProps)(Calendar);
const store = createStore(reducerCalendar);






export function logState(state: any) {
    console.log("STATE: ", state);
}
export function fetchState(id: string) {
    console.log(" FETCHING S T A T E");
   return fetch("Home/GetState", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(id)
    }).then(res => { return res.json() })
        .then(data => {
            return data;
        });
}
