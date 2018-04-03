import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from "./components/login/Login";
import { CalendarApp } from "./components/calendar/CalendarApp";
import { authenticate } from "./components/logic/authenticate";

console.log("routes")
function loggedIn() {
    const expire = localStorage.getItem("expiration");
    if (expire) {
        if (new Date(JSON.parse(expire)) > new Date())
            return true;
    }
    return false;
}
if (loggedIn()) {
    if (window.location.pathname === "/") {
        window.location.pathname = "/calendar";
    }
}
export const routes = <Layout>
    <Route exact path='/' component={Login} />
    <Route path="/calendar" render={() => (
        (loggedIn()) ? (
            <CalendarApp />
        ) : (
            <Redirect to="/" />
            )
    )} />
</Layout>;
