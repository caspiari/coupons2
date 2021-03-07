import React, { Component } from 'react'
import "./Admin.css"
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';
import { NavLink } from 'react-router-dom';

// interface IAdminState {

// }

export default class Admin extends Component<any> {

    private unsubscribeStore: Unsubscribe;

    // constructor(props: any) {
    //     super(props);
    // }

    public onCouponsPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        this.setState({ companyNameFilter: text });
    }

    public async componentDidMount() {
        this.unsubscribeStore = store.subscribe(
            () => this.setState(
            {
                // coupons: store.getState().coupons
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
            <div className="admin">
                <br />
                  <h5>Admin page</h5><br />
                  <NavLink to={"/registerUser"}>Register new user</NavLink><br />
                  <NavLink to={"/registerCompany"}>Register new company</NavLink><br />

            </div>
        );
    }
}
