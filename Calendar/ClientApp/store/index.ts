import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import { connect } from "react-redux";
import { reducerCalendar } from "./calendar/Calendar";
import { reducerForm } from "./login/StoreLogin";
import { persistStateQueue } from "../components/logic/persistState";

const rootReducer = combineReducers({calendar: reducerCalendar, form: reducerForm})



const persistStore = ( {getState}:any ) => {
    return (next:any) => (action:any) => {
        const result = next(action);
        const partOfState = getState().calendar;
        persistStateQueue(partOfState);
        return result;
    };
};


export const store = createStore(rootReducer, applyMiddleware(logger, persistStore));