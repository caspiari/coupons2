import React, { Component } from 'react'
import "./Company.css"
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';

export default class Company extends Component<any> {

    private unsubscribeStore: Unsubscribe;
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
                Company page
                <input type="button" value="Add coupon" onClick={this.props.logOut} />
            </div>
        );
    }
}
