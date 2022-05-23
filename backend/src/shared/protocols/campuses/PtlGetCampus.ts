import { ObjectId } from 'mongodb'

import { DbCampus } from '../../db/DbCampus'
import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqGetCampus extends BaseRequest {
    campus_id: ObjectId;
}

export interface ResGetCampus extends BaseResponse {
    campus: DbCampus;
}

export const conf: BaseConf = {
    
}
