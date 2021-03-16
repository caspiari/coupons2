import { Component } from 'react'
import "./UsersManagement.css"
import { User } from '../../../models/User';
import axios from 'axios';
import { ChangeEvent } from 'react';
import Home from '../../home/Home';
import UserDetails from '../../customer/userDetails/UserDetails';
import UpdateUser from '../../customer/updateUser/UpdateUser';
import { Unsubscribe } from 'redux';
import { store } from '../../../redux/store';

interface IUsersManagementState {
    userIdFilter: number;
    userNameFilter: string;
    users: User[];
    showDetails: boolean;
    userToShow: User;
    editMode: boolean;
}

export default class UsersManagement extends Component<any, IUsersManagementState> {
   
    constructor(props: any) {
        super(props);
        this.state = { userIdFilter: 0, userNameFilter: "", users: [], showDetails: false, userToShow: new User(), 
        editMode: false };
    }

    private unsubscribeStore: Unsubscribe;

    public async componentDidMount() {
        this.unsubscribeStore = store.subscribe(
            () => this.setState({ })
        );
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

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    public onUserNamePipeChanged = (event: ChangeEvent<HTMLInputElement>) => {
        let userNameFilter = event.target.value;
        this.setState({ userNameFilter });
    }

    public onUserIdPipeChanged = (event: ChangeEvent<HTMLInputElement>) => {
        let userIdFilter = +event.target.value;
        this.setState({ userIdFilter });
    }

    private setShowDetails = () => {
        this.setState({ showDetails: !this.state.showDetails });
    }

    private setEditMode = (edited: boolean) => { //Refresh component if edited
        if(edited) {
            this.componentDidMount();
        }
        this.setState({ editMode: !this.state.editMode, showDetails: !this.state.editMode });
    }

    private onRegisterNewUserClick = () => {
        this.props.history.push("/registerUser");
    }

    private onShowDetailsClick = (user: User) => {
        this.setState({ userToShow: user, showDetails: true });
    }

    public render() {
        return (
            <div className="usersManagement">
                <br />
                <h2><u>Users management</u></h2>
                {!this.state.showDetails && <div>
                    <br /><input type="button" value="Register new user" onClick={this.onRegisterNewUserClick} /><br /><br />
                    <b>Search:</b>By user name: <input type="text" id="name" onChange={this.onUserNamePipeChanged} />
                    &nbsp;By user id: <input type="numbers" id="id" onChange={this.onUserIdPipeChanged} />
                    <br />
                    <table>
                    <thead>
                        <tr className="tableHead">
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
                            .map(user =>
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.userType}</td>
                                    <td className="button"><input type="button" value="Show details" onClick={() => this.onShowDetailsClick(user)} /></td>
                                </tr>
                            )
                        }
                    </tbody>
                    </table> 
                <br /><input type="button" value="Back" onClick={() => this.props.history.goBack()} />
                </div>}
                {this.state.showDetails && <UserDetails user={this.state.userToShow} setShowDetails={this.setShowDetails} 
                                              setEditMode={this.setEditMode} />}
                {this.state.editMode && <UpdateUser user={this.state.userToShow} setEditMode={this.setEditMode} />}
            </div>
        );
    }
}