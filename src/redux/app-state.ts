import { Company } from "../models/Company";
import { UserType } from "../models/enums/UserType";
import { User } from "../models/User";

export class AppState {
    public userType: UserType = null; //For the menu
    public isCompany: boolean = false; //For registration and update
    public companies: Company[] = [];
    public user: User;
    public users: User[];
}