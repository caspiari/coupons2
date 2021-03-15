import { CouponType } from "./enums/CouponType";

export class Coupon {
    // Everything optional for easy state initialation  
    public constructor( 
        public id?:number,
        public category?:CouponType,
        public name?:string,
        public companyId?:number,
        public description?:string,
        public price?:number,    
        public amount?:number,
        public startDate?:Date,
        public endDate?:Date,
        public companyName?: string
    ){}
}