import { UserType } from "./enums/UserType";

export class SuccessfulLoginServerResponse{
    public constructor(
        public id:number,
        public token:string,       
        public userType:UserType,
        public companyId?:number
    ){}

}