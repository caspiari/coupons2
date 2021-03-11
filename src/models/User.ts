import { UserType } from "./enums/UserType";

export class User {
    public constructor(
        public username ?: string,
        public password ?: string,
        public firstName ?: string,
        public lastName ?: string, 
        public userType ?: UserType,
        public id ?: number,
        public companyId ?: number 
    ){}

}