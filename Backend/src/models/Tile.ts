import { Model, ObjectID, VirtualRef, Unique, Ref } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';
import { Account } from './Account';
import { City } from './City';
import { TowerCenter } from './TowerCenter';

@Model({
    collection: 'tile',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class Tile {
    @ObjectID()
    _id?: string

    @Ref(TowerCenter)
    towerCenter?: Ref<TowerCenter>;

    @Ref(City)
    city: Ref<City>;
    
    @Property()
    size: string;

    @Property()
    price: number;

    @Property()
    index: number;
}