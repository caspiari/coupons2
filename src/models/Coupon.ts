export class Coupon {
    public constructor(
        public category:string,
        public name:string,
        public companyId:number,
        public description:string,
        public price:number,    
        public amount:number,
        public startDate:Date,
        public endDate:Date,
        public id?:number,
        public companyName?: string,
    ){}
}