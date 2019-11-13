import { Model, ObjectID, VirtualRef, Unique, Ref } from '@tsed/mongoose'
import { Property, Required, Default, Enum, Format } from '@tsed/common';
import { City } from './City';

@Model({
    collection: 'niche',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class Niche {
    @ObjectID()
    _id: string

    @Ref('City')
    city: Ref<City>

    @Property()
    desiredPrice: number;

    @Property()
    desiredDesign: number;

    @Property()
    desiredQuality: number;

    @Property()
    purchaseQuantity: number;

    @Property()
    buyFrequency: number;

    @Property()
    spentGold: number;

    @Property()
    population: number;

    @Property()
    @Format("date-time")
    nextPurchaseTime: Date = new Date();

    @Property()
    @Format("date-time")
    lastPurchaseTime: Date = new Date();
}