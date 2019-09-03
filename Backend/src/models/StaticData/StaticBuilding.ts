import { Model, ObjectID, VirtualRef, Unique } from '@tsed/mongoose'
import { Property, Required, Default, Enum, PropertyType } from '@tsed/common';

export enum EBuildingType {
    STORE = 'Store',
    WAREHOUSE = 'Warehouse',
    FACTORY = 'Factory',
}

export class IStoreProgress {
    level: number;
    cost: number;
    secondsToLevelUp: number;
    slot: number;
    size: number;
    costToSell: number;
}

export class IWarehouseProgress {
    level: number;
    cost: number;
    secondsToLevelUp: number;
    storageSpace: number;
}

export class IFactoryProgress {
    level: number;
    cost: number;
    secondsToLevelUp: number;
    speedMultiply: number;
    maxCapacity: number;
    elegibleProduct: string[];
}

@Model({
    collection: 'static-data',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class StaticBuilding {
    @ObjectID()
    _id: string;

    @Property()
    searchCode: string;
    
    @Property()
    name: string;
    
    @Property()
    description: string;
    
    @Enum(EBuildingType)
    type: EBuildingType;
    
    @PropertyType(IStoreProgress || IStoreProgress || IWarehouseProgress)
    progress: IStoreProgress[] | IFactoryProgress[] | IWarehouseProgress[];

    @PropertyType(String)
    scopes: String[];
}

