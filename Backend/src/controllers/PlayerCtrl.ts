"use strict";

import * as Express from "express";
import { Controller, Get, Req, Inject, Post, Required, BodyParams, PathParams } from "@tsed/common";
import { Docs } from "@tsed/swagger";
import { City } from "../models/City";
import { model, Document } from "mongoose";

@Controller("/player")
@Docs('rest')
export class PlayerCtrl {

    @Get('/citys')
    async getCitys(@Req() request: Express.Request): Promise<City[]> {
        const CityModel = model('City');
        let citys = await CityModel.find() as City[] & Document[]

        return citys
    }
}