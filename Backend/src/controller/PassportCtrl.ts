"use strict";

import * as Express from "express";
import * as Passport from "passport";
import {BodyParams, Controller, Get, Post, Req, Required, Res} from "@tsed/common";
import { User } from "../models/User";

@Controller("/passport")
export class PassportCtrl {
    
    @Post("/login")
    async login(@Required() @BodyParams("email") email: string,
                @Required() @BodyParams("password") password: string,
                @Req() request: Express.Request,
                @Res() response: Express.Response) {


        return new Promise<User>((resolve, reject) => {
            Passport
                .authenticate("login", (err, user: User) => {
                    if (err) {
                        reject(err);
                    }

                    request.logIn(user, (err) => {

                        if (err) {
                            reject(err);
                        } else {
                            resolve(user);
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
    public logout(@Req() request: Express.Request): string {
        request.logout();
        return "Disconnected";
    }

}