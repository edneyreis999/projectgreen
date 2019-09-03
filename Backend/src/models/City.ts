import { Model, ObjectID, VirtualRef, Unique, Ref } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';
import { Account } from './Account';
import { Tile } from './Tile';

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
    _id?: string

    @Property()
    displayName: string

    @Property()
    population: number

    @Property()
    @Default(1)
    multiplayer: number
    
    @Ref(Tile)
    tiles: Ref<Tile>[]
}