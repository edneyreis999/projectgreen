export interface ISignUpParams {
  Email: string
	Password: string
}

export interface ISignInParams {
  Email: string
  Password: string
}

export interface IPlayerData {
  user: IUserData;
  tokenSocket: string;
}
export interface IUserData {
  id: string
  email: string;
  password: string;
  displayName: string;
}