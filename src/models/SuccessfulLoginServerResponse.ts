export class SuccessfulLoginServerResponse{
    public constructor(
        public id:string,
        public token:string,       
        public userType:string
    ){}

}