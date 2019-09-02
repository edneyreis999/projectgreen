import { Account } from "../models/Account";

    
export interface ILoginResponse {
    user: Account;
    tokenSocket: string;
}