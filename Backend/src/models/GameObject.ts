import { Indexed, ObjectID, Ref, Model, DynamicRef } from "@tsed/mongoose";
import { Required, Default, Property, Enum } from "@tsed/common";
import { EntityModels } from "../interfaces/EntityModels";
import { Dumb } from "./Dumb";

@Model({
    collection: 'objects',
    schemaOptions: {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    }
})
export class GameObject {
    @ObjectID()
    _id: string

    @DynamicRef('type')
    entity: Ref<Dumb>
    //entity: Ref<Character | Spirit | Item | PlaceOfPower | Illusion>

    @Property()
    @Enum(EntityModels)
    @Required()
    type: EntityModels
}