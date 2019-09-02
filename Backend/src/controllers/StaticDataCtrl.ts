"use strict";

import * as Express from "express";
import { Controller, Get, Req, Inject } from "@tsed/common";
import { Docs } from "@tsed/swagger";
import { MongooseModel } from "@tsed/mongoose";
import { StaticStore } from "../models/StaticData/StaticStore";

@Controller("/staticdata")
@Docs('rest')
export class StaticDataCtrl {

    @Inject(StaticStore)
    private staticModel: MongooseModel<StaticStore>

    @Get("/store")
    async logout(@Req() request: Express.Request): Promise<StaticStore> {
        const store = await this.staticModel.findOne({shortCode: 'store'})
        return store;
    }

}