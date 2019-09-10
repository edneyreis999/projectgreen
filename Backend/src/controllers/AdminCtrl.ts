"use strict";

import * as Express from "express";
import { Controller, Get, Req, Inject, Post, Required, BodyParams } from "@tsed/common";
import { Docs } from "@tsed/swagger";
import { MongooseModel } from "@tsed/mongoose";
import { City } from "../models/City";
import { Tile } from "../models/Tile";
import { model, Document } from "mongoose";

@Controller("/admin")
@Docs('rest')
export class AdminCtrl {

    @Inject(City)
    private cityModel: MongooseModel<City>
    @Inject(Tile)
    private tileModel: MongooseModel<Tile>

    @Post("/create/city")
    async createCity(
        @Required() @BodyParams("cityName") cityName: string,
        @Required() @BodyParams("multiplayer") multiplayer: number,
        @Req() request: Express.Request): Promise<City> {
        // instance of city model and document
        const CityModel = model('City');
        const city = new CityModel() as City & Document;
        
        // Remove current city.
        let savedCity = await CityModel.findOne({displayName: cityName}) as City & Document
        if(savedCity){
            savedCity = await savedCity.populate('tiles').execPopulate();
            for (let i = 0; i < savedCity.tiles.length; i++) {
                const tile = savedCity.tiles[i];
                tile.remove();
            }
            savedCity.remove();
        }
        
        // set city attributes
        city.displayName = cityName;
        city.multiplayer = multiplayer;
        city.population = 100;

        await city.save()

        // prepare default tiles
        for (let i = 0; i < 10; i++) {
            const TileModel = model('Tile')
            const tileDefault = new TileModel() as Tile & Document
            tileDefault.city = city._id;
            tileDefault.index = i;
            tileDefault.price = 25000;
            tileDefault.size = 'medium';

            await tileDefault.save();
        }

        // get tiles saved before
        await city.populate('tiles').execPopulate();

        return city;
    }

}