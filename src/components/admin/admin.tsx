import { Component } from 'react'
import "./Admin.css"
import { NavLink } from 'react-router-dom';

export default class Admin extends Component<any> {

    public render() {
        return (
            <div className="admin">
                <br />
                <h5>Admin page</h5><br />
                <NavLink to={"/usersManagement"}>Users management</NavLink><br /><br />
                <NavLink to={"/registerCompany"}>Register new company</NavLink><br /><br />
            </div>
        );
    }
}
