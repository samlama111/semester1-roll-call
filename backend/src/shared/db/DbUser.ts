import { DbBaseEntity } from "./DbBaseEntity";

export interface DbUser extends DbBaseEntity {
    uid: string;
    firstname: string;
    lastname: string;
    email: string;
}