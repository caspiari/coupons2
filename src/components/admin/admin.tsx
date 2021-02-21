import React, { Component } from 'react'
// import "./Admin.css"
import axios from "axios";
import { Coupon } from '../../models/Coupon';
import Card from '../card/Card';

interface AdminState {
    coupons: Coupon[];
    companyNameFilter: string;
}

export default class Admin extends Component<any, AdminState> {

    constructor(props: any) {
        super(props);
        this.state = { coupons: [], companyNameFilter: "" };
    }

    public onCouponsPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        this.setState({ companyNameFilter: text });
    }

    // componentDidMount = ngOnInit in angular (a reserved word)
    public async componentDidMount() {
        try {
            const response = await axios.get<Coupon[]>("http://localhost:8080/coupons");

            // response.data = all the coupons that were returned from the server
            this.setState({ coupons: response.data });
        } catch (err) {
            console.log(err.message);
        }
    }

    public render() {
        return (
            <div className="admin">
                <br />
                Search by name: <input type="text" onChange={this.onCouponsPipeChanged} />
                {<ol>
                    {this.state.coupons.filter(coupon => coupon.name.includes(this.state.companyNameFilter.toLowerCase())).
                        map(coupon => <Card key={coupon.id} {...coupon} />)}
                </ol>}
            </div>
        );
    }
}
