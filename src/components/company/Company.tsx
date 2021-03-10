import React, { Component } from 'react'
import "./Company.css"
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';

export default class Company extends Component<any> {

    private unsubscribeStore: Unsubscribe;

    //This comment tells the compiler to ignoe 'useless constructor':
    // eslint-disable-next-line
    constructor(props: any) {
        super(props);
    }
    
    public async componentDidMount() {
        this.unsubscribeStore = store.subscribe(
            () => this.setState(
            {
                // coupons: store.getState().coupons
            })
        );
    }

    componentWillUnmount(){
        this.unsubscribeStore();
    }

    private createCoupon

    public render() {
        return (
            <div className="Company">
                <br />
                <h2>Company page</h2>
                <br /><br />
                <input type="button" value="Add coupon" onClick={this.props.logOut} />
            </div>
        );
    }
}
