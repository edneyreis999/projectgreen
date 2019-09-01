"use strict";

import * as Express from "express";
import * as Passport from "passport";
import * as jwt from 'jsonwebtoken'
import { BodyParams, Controller, Get, Post, Req, Required, Res, UseBefore, Authenticated } from "@tsed/common";
import { User } from "../models/User";
import { Docs } from "@tsed/swagger";
import { ILoginResponse } from "../interfaces/ILoginResponse";
import { Keys } from "../interfaces/Keys";

@Controller("/passport")
@Docs('rest')
export class PassportCtrl {
    
    @Post("/login")
    async login(@Required() @BodyParams("email") email: string,
        @Required() @BodyParams("password") password: string,
        @Req() request: Express.Request,
        @Res() response: Express.Response) {

        return new Promise<ILoginResponse>((resolve, reject) => {
            Passport
                .authenticate("login", (err, user: User) => {
                    if (err) {
                        reject(err);
                    }

                    request.logIn(user, (err) => {
                        if (err) {
                            console.log(err)
                            reject(err);
                        } else {
                            const token = jwt.sign(JSON.stringify(user), Keys.SOCKET);
                            resolve({
                                user: user,
                                tokenSocket: token
                            });
                        }
                    });

                })(request, response, () => {

                });
        });

    }

    @Post("/signup")
    async signup(@Required() @BodyParams("email") email: string,
        @Required() @BodyParams("password") password: string,
        @Required() @BodyParams("firstName") firstName: string,
        @Required() @BodyParams("lastName") lastName: string,
        @Req() request: Express.Request,
        @Res() response: Express.Response) {

        return new Promise((resolve, reject) => {

            Passport.authenticate("signup", (err, user: User) => {

                if (err) {
                    return reject(err);
                }

                if (!user) {
                    return reject(!!err);
                }

                request.logIn(user, (err) => {

                    if (err) {
                        return reject(err);
                    }
                    resolve(user);
                });
            })(request, response, () => {

            });
        });
    }

    @Get("/logout")
    @Authenticated()
    public logout(@Req() request: Express.Request): string {
        request.logout();
        return "Disconnected";
    }

}