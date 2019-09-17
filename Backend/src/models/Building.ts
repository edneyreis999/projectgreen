import { Model, ObjectID, VirtualRef, Unique, Ref } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';
import { EBuildingType } from './StaticData/StaticBuilding';
import { Home } from './Home';

@Model({
    collection: 'building',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class Building {
    @ObjectID()
    _id?: string;

    @Ref('Home')
    home: Ref<Home>;

    @Property()
    @Enum(EBuildingType)
    @Default(EBuildingType.FACTORY)
    type: EBuildingType;

    @Property()
    @Default(0)
    level: number;
}