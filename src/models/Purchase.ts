export class Purchase {
    public constructor(
        public couponId:number,
        public amount:number,
        public userId:number,
        public coupponName?:string,
        public timeStamp?:Date,
        public id?:number
    ){}
}