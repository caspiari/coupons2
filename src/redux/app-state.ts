import { Coupon } from "../models/Coupon";

export class AppState {
    public coupons: Coupon[] = [];
    public isLoggedIn: boolean = false;
}