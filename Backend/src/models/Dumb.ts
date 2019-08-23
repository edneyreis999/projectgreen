import { Model, ObjectID, VirtualRef, Unique } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';
import { GameObject } from './GameObject';
import { Document } from 'mongoose';


@Model({
    collection: 'dumb',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class Dumb {
    @ObjectID()
    _id: string

    @VirtualRef({ justOne: true, foreignField: 'entity', localField: '_id', type: 'GameObject' })
    gameObject: VirtualRef<GameObject & Document>

    @Property()
    @Required()
    @Unique()
    name: string
}