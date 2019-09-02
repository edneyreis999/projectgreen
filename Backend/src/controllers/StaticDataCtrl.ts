"use strict";

import * as Express from "express";
import { Controller, Get, Req, Inject } from "@tsed/common";
import { Docs } from "@tsed/swagger";
import { MongooseModel } from "@tsed/mongoose";
import { StaticBuilding } from "../models/StaticData/StaticBuilding";

@Controller("/staticdata")
@Docs('rest')
export class StaticDataCtrl {

    @Inject(StaticBuilding)
    private staticModel: MongooseModel<StaticBuilding>

    @Get("/store")
    async logout(@Req() request: Express.Request): Promise<StaticBuilding> {
        const store = await this.staticModel.findOne({searchCode: 'store'})
        const nicheConfig = await this.staticModel.findOne({searchCode: 'nicheConfig'})
        const pocaohp = await this.staticModel.findOne({searchCode: 'pocaohp'})
        return store;
    }

}