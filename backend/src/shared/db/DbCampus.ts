import { Location } from '../models/Location'
import { DbBaseEntity } from './DbBaseEntity'

export interface DbCampus extends DbBaseEntity {
    name: string;
    location: Location;
}
