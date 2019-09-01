import { User } from "../models/User";

    
export interface ILoginResponse {
    user: User;
    tokenSocket: string;
}