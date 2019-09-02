import { Model, ObjectID, VirtualRef, Unique } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';

@Model({
    collection: 'static-data',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class StaticPotion {
    @ObjectID()
    _id: string;

    @Property()
    searchCode: string;
    
    @Property()
    name: string;
    
    @Property()
    description: string;
    
    @Property()
    type: string;
    
    @Property()
    maker: string;
    
    @Property()
    timeToMake: number;
    
    @Property()
    factoryLevelToUnlock: number;
    
    @Property()
    priceDefault: number;
    
    @Property()
    priceMultiplayer: number;
    
    @Property()
    priceMin: number;
    
    @Property()
    priceMax: number;
    
    @Property()
    qualityMin: number;
    
    @Property()
    qualityMax: number;
    
    @Property()
    qualityPrice: number;
    
    @Property()
    designMin: number;
    
    @Property()
    designMax: number;
    
    @Property()
    designPrice: number;
}

