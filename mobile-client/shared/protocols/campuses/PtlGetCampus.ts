import { ObjectId } from 'mongodb'

import { DbCampus } from '../../db/DbCampus'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqGetCampus extends BaseRequest {
    campus_id: ObjectId;
}

export interface ResGetCampus extends BaseResponse {
    campus: DbCampus;
}
