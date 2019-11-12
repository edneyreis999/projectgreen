import { Model, ObjectID, VirtualRef, Unique, Ref } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';
import { City } from './City';
import { Home } from './Home';

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
    _id: string

    @Ref('Home')
    home: Ref<Home>;

    @Ref('City')
    city: Ref<City>;
    
    @Property()
    size: string;

    @Property()
    price: number;

    @Property()
    index: number;
}