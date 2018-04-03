import * as React from 'react';
import { connect } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import { stateIntoDB } from "./logic/persistState";
import { calendarButton, loginButton } from "../store/login/StoreLogin";


class NavMenu extends React.Component<any, any> {
    
    calendar() {
        if (!this.props.navButtons.calendar) this.props.calendarButton();

    }
    logout() {
        localStorage.clear();
        if (!this.props.navButtons.login) this.props.loginButton();
    }
    public render() {
        console.log("NAV PROPS", this.props.navButtons);
        const buttonClass = {
            calendar: this.props.navButtons.calendar ? "active-button" : "deactive-button",
            login: this.props.navButtons.login ? "active-button" : "deactive-button",
        }


        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>Calendar App</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li onClick={() => this.calendar()}>
                            <NavLink to={'/calendar'} exact className={buttonClass.calendar}>
                                <span className='glyphicon glyphicon-home'></span> Calendar
                            </NavLink>
                        </li>
                        <li onClick={() => this.logout()}>
                            <NavLink to={"/"} className={buttonClass.login}>
                                <span className="glyphicon glyphicon-check"></span>Logout
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
const mapStateToProps = (state: any) => ({
    navButtons: state.form.navButtonActive,
})
const mapDispatchToProps = (dispatch: any) => ({
    calendarButton: () => dispatch(calendarButton()),
    loginButton: () => dispatch(loginButton()),
})



export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);