import { configure } from 'axios-hooks'
import Axios from 'axios'

export enum EBaseURL {
  Development = "http://eb376fc4.ngrok.io/api/"
};

configure({
  axios: Axios.create({
    baseURL: EBaseURL.Development
  })
})

export { EBaseURL as BaseURL };

export enum Endpoints {
  SignIn = "passport/login",
  SignUp = "passport/signup",
  Citys = "player/citys",
}

export type Endpoint =
  | Endpoints.SignIn