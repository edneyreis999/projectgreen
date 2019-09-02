import { Model, ObjectID, VirtualRef, Unique } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';

export enum EBuildingType {
    STORE = 'Store',
    WAREHOUSE = 'Warehouse',
    FACTORY = 'Factory',
}

export interface IStoreProgress {
    level: number;
    cost: number;
    secondsToLevelUp: number;
    slot: number;
    size: number;
    costToSell: number;
}

export interface IWarehouseProgress {
    level: number;
    cost: number;
    secondsToLevelUp: number;
    storageSpace: number;
}

export interface IFactoryProgress {
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
    
    @Property()
    type: EBuildingType;
    
    @Property()
    progress: IStoreProgress[] | IFactoryProgress[] | IWarehouseProgress;
}

