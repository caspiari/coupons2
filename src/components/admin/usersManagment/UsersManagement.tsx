import { Component } from 'react'
import "./UsersManagement.css"
import { User } from '../../../models/User';
import axios from 'axios';
import { ChangeEvent } from 'react';
import Home from '../../home/Home';
import { NavLink } from 'react-router-dom';

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
            Home.exceptionTreatment(err, this.props);
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

    private onRegisterNewUserClick = () => {
        this.props.history.push("/registerUser");
    }

    private onUserClick = () => {
        
    }

    private back = () => {
        this.props.history.goBack();
    }

    public render() {
        return (
            <div className="usersManagement">
                <br />
                <h2><u>Users management</u></h2>
                <br /><input type="button" value="Register new user" onClick={this.onRegisterNewUserClick} /><br /><br />
                <b>Search:</b>By user name: <input type="text" id="name" onChange={this.onUserNamePipeChanged} />
                &nbsp;By user id: <input type="numbers" id="id" onChange={this.onUserIdPipeChanged} />
                <br />
                <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>User name</th>
                        <th>Full name</th>
                        <th>User type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.filter(user => user.username.includes(this.state.userNameFilter))
                            .filter(user => {
                                if(this.state.userIdFilter === 0) {
                                    return true;
                                } else {
                                    return user.id === this.state.userIdFilter;
                                }
                            })
                            .map(user => {
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.userType}</td>
                                </tr>
                            }
                            )
                        }
                    </tbody>
                </table>
                <br /><input type="button" value="Back" onClick={this.back} />
            </div>
        );
    }
}
