import { Model, ObjectID, Ref, VirtualRef } from '@tsed/mongoose'
import { Account } from './Account';
import { Document } from 'mongoose';
import { City } from './City';
import { Building } from './Building';
import { Property } from '@tsed/common';

@Model({
    collection: 'home',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class Home {
    @ObjectID()
    _id?: string

    @Ref('Account')
    account: Ref<Account>;

    @Ref('City')
    city: Ref<City>;

    @VirtualRef({ justOne: true, foreignField: 'home', localField: '_id', type: 'Building' })
    buildings: VirtualRef<Building & Document>[];

    @Property()
    gold: number;


    spendGold(amount): number{
        if((this.gold - amount) < 0){
            throw new Error(`Player Need more ${amount - this.gold} gold.`)
        }else{
            return this.gold - amount
        }
    }
}