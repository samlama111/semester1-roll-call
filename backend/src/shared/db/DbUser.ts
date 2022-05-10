import { DbBaseEntity } from "./DbBaseEntity";

export interface DbUser extends DbBaseEntity {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
}