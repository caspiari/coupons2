import { UserType } from "./enums/UserType";

export class User {
    public constructor(
        public id ?: number,
        public username ?: string,
        public password ?: string,
        public firstName ?: string,
        public lastName ?: string, 
        public userType ?: UserType,
        public companyId ?: number 
    ){}

}