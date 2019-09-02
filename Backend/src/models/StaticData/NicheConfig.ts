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
export class NicheConfig {
    @ObjectID()
    _id: string;

    @Property()
    searchCode: string;
    
    @Property()
    type: string;
    
    @Property()
    passingScore: number;
    
    @Property()
    globalPriceMultiplier: number;
    
    @Property()
    globalQualityMultiplier: number;
    
    @Property()
    globalDesignMultiplier: number;
    
    @Property()
    minTimeToSell: number;
    
    @Property()
    maxTimeToSell: number;
    
    @Property()
    populationMultiplayer: number;
}

