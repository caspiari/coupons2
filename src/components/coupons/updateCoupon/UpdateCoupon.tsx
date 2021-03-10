import { Component } from 'react';
import axios from "axios";
import "./UpdateCoupon.css";
import { UserType } from '../../../models/enums/UserType';
import { ChangeEvent } from 'react';
import { CouponType } from '../../../models/enums/CouponType';
import { Coupon } from '../../../models/Coupon';

interface IUpdateCouponState {
    coupon: Coupon
    // id: number;
    // companyName: string;
    // category: CouponType;
    // name: string;
    // description: string;
    // price: number;
    // amount: number;
    // startDate: Date;
    // endDate: Date;
}

export default class UpdateCoupon extends Component<any, IUpdateCouponState> {

    public constructor(props: any) {
        super(props);
        this.state = { coupon: this.props.location.state.coupon };
    }
    
    private couponTypes: CouponType[] = [CouponType.COMPUTERS, CouponType.KITCHEN, CouponType.STEREO];
    private coupon: Coupon = this.props.location.state.coupon;

    private setCategory = (event: ChangeEvent<HTMLSelectElement>) => {
        this.coupon.category = event.target.value;
    }

    private setName = (event: ChangeEvent<HTMLInputElement>) => {
        this.coupon.name = event.target.value;
    }

    private setDescription = (event: ChangeEvent<HTMLInputElement>) => {
        this.coupon.description = event.target.value;
    }

    private setPrice = (event: ChangeEvent<HTMLInputElement>) => {
        this.coupon.price = +event.target.value;
    }

    private setAmount = (event: ChangeEvent<HTMLInputElement>) => {
        this.coupon.amount = +event.target.value;
    }
    
    private setStartDate = (event: ChangeEvent<HTMLInputElement>) => {
        // this.coupon.startDate = event.target.value;
    }
    
    private setEndDate = (event: ChangeEvent<HTMLInputElement>) => {
        // this.coupon.endDate = event.target.value;
    }

    private update = async () => {
        try {
            await axios.put("http://localhost:8080/coupons", this.coupon);
            alert("Successfuly updated!");
            this.props.history.goBack();
        }
        catch (err) {
            console.log(err.message);
            if (err.response != null) {
                let errorMessage: string = err.response.data.errorMessage;
                alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
            } else {
                console.log(JSON.stringify(err))
            }
        }
    }

    private back = () => {
        this.props.history.goBack();
    }

    public render() {
        return (
            // id: number;
    // companyName: string;
    // category: CouponType;
    // name: string;
    // description: string;
    // price: number;
    // amount: number;
    // startDate: Date;
    // endDate: Date;
            <div className="updateCoupon">
                <h3>Update coupon [Id: {this.coupon.id}]</h3>
                Category: 
                <select name="coupon type select" onChange={this.setCategory}>
                  <option defaultValue={this.coupon.category} key="defaultValue">
                    {this.coupon.category}
                  </option>
                  {this.couponTypes.filter(couponType => couponType !== this.coupon.category).map((couponType, index) => (
                    <option value={couponType} key={index}>{couponType.valueOf()}</option>))}
                </select><br />
                Name:&nbsp; <input type="text" name="name" value={this.coupon.name} onChange={this.setName} /><br />
                Description: <input type="text" name="description" value={this.coupon.description} onChange={this.setDescription} /><br />
                Price: <input type="number" name="price" value={this.coupon.price} onChange={this.setPrice} /><br />
                Amoun in stock: <input type="text" name="amount" value={this.coupon.amount} onChange={this.setAmount} /><br />
                Start date: <input type="number" name="price" value={this.coupon.price} onChange={this.setPrice} /><br />
                Price: <input type="number" name="price" value={this.coupon.price} onChange={this.setPrice} /><br />

                <br />
                <input type="button" value="Update" onClick={this.update} />
                <input type="button" value="Back" onClick={this.back} />
            </div>
        );
    }

}


