import { Model, ObjectID, VirtualRef, Unique, Ref } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';
import { TowerCenter } from '../TowerCenter';
import { Tile } from '../Tile';
import { EBuildingType } from '../StaticData/StaticBuilding';

@Model({
    collection: 'building',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class Warehouse {
    @ObjectID()
    _id?: string

    @Ref('TowerCenter')
    towerCenter: Ref<TowerCenter>

    @Ref(Tile)
    tile: Ref<Tile>

    @Property()
    @Enum(EBuildingType)
    @Default(EBuildingType.WAREHOUSE)
    type: EBuildingType

    @Property()
    @Default(0)
    level: number

    @Property()
    @Default(0)
    storageSpace: number
}