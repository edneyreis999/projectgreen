import { Model, ObjectID, VirtualRef, Unique, Ref } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';
import { Tile } from './Tile';
import { Document } from 'mongoose';

@Model({
    collection: 'city',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class City {
    @ObjectID()
    _id: string

    @Property()
    @Unique()
    displayName: string

    @Property()
    population: number

    @Property()
    @Default(1)
    speed: number

    @VirtualRef({ justOne: false, foreignField: 'city', localField: '_id', type: 'Tile' })
    tiles: VirtualRef<Tile & Document>[]
}