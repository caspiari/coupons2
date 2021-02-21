import React, { Component } from 'react'
import "./Company.css"
import axios from "axios";
import { Coupon } from '../../models/Coupon';
import Card from '../card/Card';

interface CompanyState {
    coupons: Coupon[];
    nameFilter: string;
}

export default class Company extends Component<any, CompanyState> {

    constructor(props: any) {
        super(props);
        this.state = { coupons: [], nameFilter: "" };
    }

    public onCouponsPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        this.setState({ nameFilter: text });
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
            <div className="Company">
                <br />
                Search by name: <input type="text" onChange={this.onCouponsPipeChanged} />
                {<ol>
                    {this.state.coupons.filter(coupon => coupon.name.includes(this.state.nameFilter.toLowerCase())).
                        map(coupon => <Card key={coupon.id} {...coupon} />)}
                </ol>}
            </div>
        );
    }
}
