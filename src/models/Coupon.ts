export class Coupon {
    public constructor(
        public id:number,
        public category:string,
        public name:string,
        public companyId?:number,
        public description?:string,
        public price?:number,    
        public amount?:number,
        public startDate?:Date,
        public endDate?:Date,
    ){}

}