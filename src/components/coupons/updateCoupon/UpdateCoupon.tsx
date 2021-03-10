import { Component } from 'react';
import axios from "axios";
import "./UpdateCoupon.css";
import { UserType } from '../../../models/enums/UserType';
import { Company } from '../../../models/Company';
import { ActionType } from '../../../redux/action-type';
import { store } from '../../../redux/store';
import { User } from '../../../models/User';
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
            <div className="updateCoupon">
                <h3>Update coupon [Id: {this.coupon.id}]</h3>
                User name: <input type="text" name="username" placeholder="E-mail" value={this.state.username} onChange={this.setUsername} /><br />
                Password:&nbsp; <input type="password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                First name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                Last name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />
                {sessionStorage.getItem("userType") === UserType.ADMIN.valueOf() && <IfAdmin userTypes={this.userTypes} companies={this.state.companies} 
                 userType={this.state.userType} companyId={this.state.companyId} setUserType={this.setUserType} setCompanyId={this.setCompanyId} />}
                <br />
                <input type="button" value="Update" onClick={this.update} />
                <input type="button" value="Back" onClick={this.back} />
            </div>
        );
    }

}


