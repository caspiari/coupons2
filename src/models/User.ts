export class User {
    public constructor(
        public username : string,
        public password : string,
        public firstName : string,
        public lastName : string, 
        public userType : string,
        public id ?: number,
        public companyId ?: number 
    ){}

}