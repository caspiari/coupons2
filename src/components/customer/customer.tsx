import React, { Component } from 'react'
// import "./customer.css"
import { Coupon } from '../../models/Coupon';
import axios from "axios";

interface CustomerState {
    coupons: Coupon[];
    companyNameFilter: string;
}

export default class Customer extends Component<any, CustomerState> {

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
            <div className="Customer">
                Search by name :<input type="text" onChange={this.onCouponsPipeChanged} />

                <br></br>
                {<ol>
                    {this.state.coupons.filter(coupon => {
                        if (this.state.companyNameFilter == "") {
                            return true;
                        }
                        return coupon.name.includes(this.state.companyNameFilter.toLowerCase())
                    }
                    ).map(coupon => <div key={coupon.id}><h6>Name: {coupon.name} -- Price: {coupon.price} -- Amount: {coupon.amount}</h6></div>)}
                </ol>}

                {/* <table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.coupons.map(coupon =>
                                <tr key={coupon.id}>
                                    <td>{coupon.name}</td>
                                    <td>{coupon.amount}</td>
                                    <td>{coupon.price}</td>
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table> */}
            </div >
        );
    }
}
