export class SuccessfulLoginServerResponse{
    public constructor(
        public id:number,
        public token:string,       
        public userType:string
    ){}

}