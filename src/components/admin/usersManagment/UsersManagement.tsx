import { Component } from 'react'
import "./UsersManagement.css"
import { NavLink } from 'react-router-dom';
import { User } from '../../../models/User';
import axios from 'axios';
import { ChangeEvent } from 'react';
import UserCard from '../../card/userCard/UserCard';
import Home from '../../home/Home';

interface IUsersManagementState {
    userIdFilter: number;
    userNameFilter: string;
    users: User[];
    selectedUser: User;
}

export default class UsersManagement extends Component<any, IUsersManagementState> {
   
    constructor(props: any) {
        super(props);
        this.state = { userIdFilter: 0, userNameFilter: "", users: [], selectedUser: new User() };
    }

    public async componentDidMount() {
        try {
            const token = sessionStorage.getItem("token");
            if(token == null) {
                Home.loginRequset(this.props);
            }
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get<User[]>("http://localhost:8080/users");
            const users = response.data;
            this.setState({ users });
        } catch (err) {
            Home.exceptionTreatment(err);
        }
    }

    public onUserNamePipeChanged = (event: ChangeEvent<HTMLInputElement>) => {
        let userNameFilter = event.target.value;
        this.setState({ userNameFilter });
    }

    public onUserIdPipeChanged = (event: ChangeEvent<HTMLInputElement>) => {
        let userIdFilter = +event.target.value;
        this.setState({ userIdFilter });
    }

    private back = () => {
        this.props.history.goBack();
    }

    public render() {
        return (
            <div className="admin">
                <br />
                <h3>Users management</h3>
                <NavLink to={"/registerUser"}>Register new user</NavLink><br /><br />
                <br />

                {this.state.users.map(user => <UserCard key={user.id} user={user} />)}

                {/* {this.state.users.map(user => <input type="radio" checked={this.state.selectedUser === user}>{user.username}</input>)} */}
              
                <br /><input type="button" value="Back" onClick={this.back} />

            </div>
        );
    }
}
