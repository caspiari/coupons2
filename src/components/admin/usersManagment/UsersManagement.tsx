import React, { Component } from 'react'
import "./UsersManagement.css"
import { Unsubscribe } from 'redux';
import { store } from '../../../redux/store';
import { NavLink } from 'react-router-dom';

interface IUsersManagementState {
    userIdFilter: number;
    userNameFilter: string;
}

export default class UsersManagement extends Component<any> {

    private unsubscribeStore: Unsubscribe;

    // constructor(props: any) {
    //     super(props);
    // }

    public onUserNamePipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        this.setState({ userNameFilter : text });
    }

    public onUserIdPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        this.setState({ userIdFilter : text });
    }

    public async componentDidMount() {
        this.unsubscribeStore = store.subscribe(
            () => this.setState(
            {
            })
        );
        try {
            // const response = await axios.get<Coupon[]>("http://localhost:3001/coupons");
            // store.dispatch({ type: ActionType.GetAllCoupons, payload: response.data});
        } catch (err) {
            console.log(err.message);
        }
    }

    componentWillUnmount(){
        this.unsubscribeStore();
    }

    public render() {
        return (
            <div className="usersManagement">
                <br />
                Users management
                <br />
                <NavLink to={"/registerUser"}>Register new user</NavLink><br />
                <NavLink to={"/editUser"}>Edit user details</NavLink><br />
            </div>
        );
    }
}
