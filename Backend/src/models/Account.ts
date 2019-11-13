import { Model, ObjectID, VirtualRef, Unique } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';
import { Home } from './Home';
import { Document } from 'mongoose';

interface Metadata {
    banana: string;
}

@Model({
    collection: 'account',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class Account {
    @ObjectID()
    _id: string

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
    displayName: string

    @VirtualRef({ justOne: false, foreignField: 'account', localField: '_id', type: 'Home' })
    homes: VirtualRef<Home & Document>[]

    @Property()
    lastLogin?: Date

    @Property()
    sessionCountTotal?: Number

    @Property()
    sessionTimeTotal?: Number

    @Property()
    online?: Boolean

    @Property()
    metaData?: Metadata
}

