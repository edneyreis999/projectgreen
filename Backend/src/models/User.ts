import { Model, ObjectID, VirtualRef, Unique } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';
import { GameObject } from './GameObject';
import { Document } from 'mongoose';


@Model({
    collection: 'user',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class User {
    @ObjectID()
    _id?: string

    @Property()
    name: string

    @Property()
    @Required()
    @Unique()
    email: string

    @Property()
    @Required()
    password: string

    @Property()
    @Required()
    firstName: string

    @Property()
    @Required()
    lastName: string
}

