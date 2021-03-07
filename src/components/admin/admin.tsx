import { Component } from 'react'
import "./Admin.css"
import { NavLink } from 'react-router-dom';
import { User } from '../../models/User';
import axios from 'axios';
import { ChangeEvent } from 'react';

interface IAdminState {
    users: User[];
    selectedUserId: number;
}

export default class Admin extends Component<any, IAdminState> {

    constructor(props: any) {
        super(props);
        this.state = { users: [], selectedUserId: 0 };
    }

    public async componentDidMount() {
        try {
            let newState = {...this.state};
            const token = sessionStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get<User[]>("http://localhost:8080/users");
            newState.users = response.data;
            newState.selectedUserId = newState.users[0].id;
            this.setState(newState);
        } catch (err) {
            console.log(err.message);
        }
    }

    private setUserId = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({ selectedUserId : +event.target.value} );
    }

    public render() {
        return (
            <div className="admin">
                <br />
                  <h5>Admin page</h5><br />
                  <NavLink to={"/registerUser"}>Register new user</NavLink><br /><br />
                  <NavLink to={"/registerCompany"}>Register new company</NavLink><br /><br />
                  Select user:&nbsp;&nbsp;
                    <select name="userIdSelect" onChange={this.setUserId}>
                        <option defaultValue="" disabled key="default">
                            -- Select user --
                        </option>
                        {this.state.users.map((user, index) => (<option value={user.id} key={index}>{user.username}</option>))}
                    </select>
                  <NavLink to={"/editUser/" + this.state.selectedUserId}>&nbsp;Edit user details</NavLink><br /><br />

            </div>
        );
    }
}
