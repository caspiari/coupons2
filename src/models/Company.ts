export class Company {
    public constructor(
        public name:string,
        public address: string,
        public phone:string,
        public id ?:number,
    ){}
}