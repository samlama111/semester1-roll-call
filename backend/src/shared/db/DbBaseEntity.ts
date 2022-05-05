import { ObjectId } from "mongodb";

export interface DbBaseEntity {
    _id: ObjectId;
    create: {
        time: string,
        uid: ObjectId
    },
    update?: {
        time: string,
        uid: ObjectId
    }
}