import { Model, ObjectID, VirtualRef, Unique, Ref } from '@tsed/mongoose'
import { Property, Required, Default, Enum } from '@tsed/common';
import { Account } from './Account';

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

    
}