import { Model, ObjectID, VirtualRef, Unique, Ref } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';
import { Account } from './Account';
import { Factory } from './Buildings/Factory';
import { Store } from './Buildings/Store';
import { Warehouse } from './Buildings/Warehouse';

@Model({
    collection: 'tower-center',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class TowerCenter {
    @ObjectID()
    _id?: string

    @Ref(Account)
    account: Ref<Account>;

    @Ref(Factory)
    factory: Ref<Factory>;
    
    @Ref(Store)
    store: Ref<Store>;

    @Ref(Warehouse)
    warehouse: Ref<Warehouse>;
}