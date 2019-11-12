import { configure } from 'axios-hooks'
import Axios from 'axios'

export enum EBaseURL {
  Development = "http://2e15b305.ngrok.io/"
};

configure({
  axios: Axios.create({
    baseURL: EBaseURL.Development
  })
})

export { EBaseURL as BaseURL };

export enum Endpoints {
  SignIn = "api/passport/login",
  SignUp = "api/passport/signup",
  Citys = "api/player/citys",
}

export type Endpoint =
  | Endpoints.SignIn