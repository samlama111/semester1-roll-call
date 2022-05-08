import { DbBaseEntity } from "./DbBaseEntity";

export interface DbCampus extends DbBaseEntity {
    name: string;
    location: {
        latitude: number;
        longitude: number;
    }
}