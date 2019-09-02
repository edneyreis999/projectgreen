import { Model, ObjectID, VirtualRef, Unique } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';

export interface IStoreProgress {
    level: number;
    cost: number;
    slot: number;
    size: number;
    costToSell: number;
    secondsToLevelUp: number;
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
export class StaticStore {
    @ObjectID()
    _id: string;
    @Property()
    shortCode: string;
    @Property()
    name: string;
    @Property()
    description: string;
    @Property()
    type: string;
    @Property()
    progress: IStoreProgress[];
}

