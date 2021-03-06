"use strict";

import * as Express from "express";
import { Controller, Get, Req, Inject, Post, Required, BodyParams, PathParams } from "@tsed/common";
import { Docs } from "@tsed/swagger";
import { City } from "../models/City";
import { model, Document } from "mongoose";
import { Building } from "../models/Building";

@Controller("/player")
@Docs('rest')
export class PlayerCtrl {

    @Get('/citys')
    async getCitys(@Req() request: Express.Request): Promise<City[]> {
        const CityModel = model('City');
        let citys = await CityModel.find().lean() as (City & Document)[]


        console.log('----- citys ------')
        console.log(citys)
        return citys
    }
    @Get('/building/:buildingId')
    async getBuilding(@Required() @PathParams("buildingId") buildingId: string): Promise<Building> {
        const BuildingModel = model('Building');
        let building = await BuildingModel.findById(buildingId) as (Building & Document)
        await building.populate('home').execPopulate();
        console.log('----- building ------')
        console.log(building)
        return building
    }
}