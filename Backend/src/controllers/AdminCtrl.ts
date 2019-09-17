"use strict";

import * as Express from "express";
import { Controller, Get, Req, Inject, Post, Required, BodyParams, PathParams } from "@tsed/common";
import { Docs } from "@tsed/swagger";
import { MongooseModel } from "@tsed/mongoose";
import { City } from "../models/City";
import { Tile } from "../models/Tile";
import { model, Document } from "mongoose";

@Controller("/admin")
@Docs('rest')
export class AdminCtrl {

    @Post("/create/city")
    async createCity(
        @Required() @BodyParams("cityName") cityName: string,
        @Required() @BodyParams("speed") speed: number,
        @Req() request: Express.Request): Promise<City> {
        // instance of city model and document
        const CityModel = model('City');
        let city = new CityModel() as City & Document;
        try {
            // Remove current city.
            let savedCity = await CityModel.findOne({ displayName: cityName }) as City & Document
            if (savedCity) {
                savedCity = await savedCity.populate('tiles').execPopulate();
                for (let i = 0; i < savedCity.tiles.length; i++) {
                    const tile = savedCity.tiles[i];
                    tile.remove();
                }
                await savedCity.remove();
            }
        } catch (e) {
            throw e
        }

        try {
            // set city attributes
            city.displayName = cityName;
            city.speed = speed;
            city.population = 100;

            await city.save()
        }catch(e){
            throw e
        }


        try{
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
        }catch(e){
            throw e
        }

        // get tiles saved before
        city = await city.populate('tiles').execPopulate();

        return city;
    }

    @Get('/tiles/:cityId')
    async getTiles(@Required() @PathParams("cityId") cityId: string,
        @Req() request: Express.Request): Promise<Tile[]> {
        const TileModel = model('Tile');
        let tiles: Tile[] = await TileModel.find({ city: cityId }) as Tile[] & Document[];

        

        return tiles
    }
}