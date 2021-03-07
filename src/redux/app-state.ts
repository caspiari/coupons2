import { Company } from "../models/Company";
import { UserType } from "../models/UserType";

export class AppState {
    public userType: UserType = null;
    public isCompany: boolean = false; //Used for registration and update users
    public companies: Company[] = [];
}