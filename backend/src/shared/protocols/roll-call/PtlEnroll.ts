import { ObjectId } from 'mongodb'

import { Location } from '../../models/Location'
import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqEnroll extends BaseRequest {
    enrollment_id: ObjectId;
    location: Location;
}

export interface ResEnroll extends BaseResponse {
    message: string;
}

export const conf: BaseConf = {

}
