import { Company } from "../models/Company";
import { UserType } from "../models/enums/UserType";

export class AppState {
    public userType: UserType = null; //For the menu
    public isCompany: boolean = false; //For registration and update
    public companies: Company[] = [];
}