import React, { Component } from 'react'
import "./Company.css"
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';

export default class Company extends Component<any> {

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);

        this.unsubscribeStore = store.subscribe(
            () => this.setState(
            {
                // coupons: store.getState().coupons
            })
        );
    }

    public onCouponsPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        this.setState({ companyNameFilter: text });
    }

    public async componentDidMount() {
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
            <div className="Company">
                <br />
                Company page
            </div>
        );
    }
}
